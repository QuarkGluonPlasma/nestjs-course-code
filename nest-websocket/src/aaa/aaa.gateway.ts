import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AaaGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly aaaService: AaaService) {}

  handleDisconnect(server: Server) {
  }

  handleConnection(server: Server, ...args: any[]) {
    console.log(...args);
  }
    
  afterInit(server: Server) {
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createAaa')
  create(@MessageBody() createAaaDto: CreateAaaDto) {

    this.server.emit('guang', 777);
    return this.aaaService.create(createAaaDto);
  }

  @SubscribeMessage('findAllAaa')
  findAll() {
    // return {
    //   event: 'guang',
    //   data: this.aaaService.findAll()
    // }

    return new Observable((observer) => {
      observer.next({ event: 'guang', data: { msg: 'aaa'} });

      setTimeout(() => {
        observer.next({ event: 'guang', data: { msg: 'bbb'} });
      }, 2000);

      setTimeout(() => {
        observer.next({ event: 'guang', data: { msg: 'ccc'} });
      }, 5000);
    });
  }

  @SubscribeMessage('findOneAaa')
  findOne(@MessageBody() id: number, @ConnectedSocket() server: Server) {

    server.emit('guang', 666);
    return this.aaaService.findOne(id);
  }

  @SubscribeMessage('updateAaa')
  update(@MessageBody() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(updateAaaDto.id, updateAaaDto);
  }

  @SubscribeMessage('removeAaa')
  remove(@MessageBody() id: number) {
    return this.aaaService.remove(id);
  }
}
