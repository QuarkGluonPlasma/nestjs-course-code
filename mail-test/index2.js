const { MailParser } =require('mailparser');
const fs = require('fs');
const path = require('path');
const Imap = require('imap');

var imap = new Imap({
    user: 'xx@qq.com',
    password: '你的授权码',
    host: 'imap.qq.com',
    port: 993,
    tls: true
});

imap.once('ready', () => {
    imap.openBox('INBOX', true, (err) => {
        imap.search([['SEEN'], ['SINCE', new Date('2023-07-10 19:00:00').toLocaleString()]], (err, results) => {
            if (!err) {
                handleResults(results);
            } else {
                throw err;
            }
        });
    });
});


function handleResults(results) {
    imap.fetch(results, { 
        bodies: '',
    }).on('message', (msg) => {
        const mailparser = new MailParser();

        msg.on('body', (stream) => {

            const info = {};
            stream.pipe(mailparser);
            mailparser.on("headers", (headers) => {
                info.theme = headers.get('subject');
                info.form = headers.get('from').value[0].address;
                info.mailName = headers.get('from').value[0].name;
                info.to = headers.get('to').value[0].address;
                info.datatime = headers.get('date').toLocaleString();
            });

            mailparser.on("data", (data) => {
                if (data.type === 'text') {
                    info.html = data.html;
                    info.text = data.text;

                    const filePath = path.join(__dirname, 'mails', info.theme + '.html');
                    fs.writeFileSync(filePath, info.html || info.text)

                    console.log(info);
                }
                if (data.type === 'attachment') {
                    const filePath = path.join(__dirname, 'files', data.filename);
                    const ws = fs.createWriteStream(filePath);
                    data.content.pipe(ws);
                }
            });
        });
    });
}

imap.connect();
