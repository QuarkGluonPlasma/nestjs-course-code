import { MessageBody,SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatroomGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, payload: any): void {
    console.log(payload.roomName);
    client.join(payload.roomName);
    this.server.to(payload.roomName).emit('message', {
      nickName: payload.roomName,
      message: `${payload.nickName} 加入了 ${payload.roomName} 房间`
    });
  }

  // @SubscribeMessage('sendMessage2')
  // sendMessage2(client: Socket, payload: any): void {
  //   console.log(payload);
  //   this.server.to(payload.room).emit('message', payload.message);
  // }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() payload: any): void {
    console.log(payload);
    this.server.to(payload.room).emit('message', { nickName: payload.nickName, message: payload.message});
  }
}