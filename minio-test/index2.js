var Minio = require('minio')

var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'WZcFknA170cXNaPdWv3z',
  secretKey: 'maasr7XMlP0dpza1JHLBhbHASwhdtMSBL2mundNX',
})

function put() {
    minioClient.fPutObject('aaa', 'hello.png', './smile.png', function (err, etag) {
        if (err) return console.log(err)
        console.log('上传成功');
    });
}

// put();

const fs = require('fs');

function get() {
    minioClient.getObject('aaa', 'hello.png', (err, stream) => {
        if (err) return console.log(err)
        stream.pipe(fs.createWriteStream('./xxx.png'));
    });
}

get();


