const MyWebSocket = require('./ws');
const ws = new MyWebSocket({ port: 8080 });

ws.on('data', (data) => {
  console.log('receive data:' + data);
  setInterval(() => {
    ws.send(data + ' ' + Date.now());
  }, 2000)
});

ws.on('close', (code, reason) => {
  console.log('close:', code, reason);
});
