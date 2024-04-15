const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

function randomData() {
  return {
    type: Math.random() > 0.5 ? 'temperature' : 'humidity',
    value: Math.floor(Math.random() * 100 + 1)
  };
}

wss.on('connection', function connection(ws) {
  setInterval(() => {
    ws.send(JSON.stringify(randomData()));
  }, 1000);
});

console.log('WebSocket server started on ws://localhost:8080');
