import * as WebSocket from 'ws';

const appWs = (server: any): void => {
  const wss = new WebSocket.Server({ server });

//  wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data, isBinary) {
//      wss.clients.forEach(function each() {
//          ws.send(JSON.stringify({ reload: true }));
//      })
//    })
//  })


  setInterval(() => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ reload: true }))
    })
  }, 1000)


  console.log('App Web Socket Server is running');

}

export default appWs;