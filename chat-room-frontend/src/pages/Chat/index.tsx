import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface JoinRoomPayload {
    chatroomId: number
    userId: number
}

interface SendMessagePayload {
    sendUserId: number;
    chatroomId: number;
    message: Message
}

interface Message {
    type: 'text' | 'image'
    content: string
}

type Reply  = {
    type: 'sendMessage'
    userId: number
    message: Message
} | {
    type: 'joinRoom'
    userId: number
}

export function Chat() {

    const [messageList, setMessageList] = useState<Array<Message>>([]);
    const socketRef = useRef<Socket>();

    useEffect(() => {
        const socket = socketRef.current = io('http://localhost:3005');
        socket.on('connect', function() {
    
            const payload: JoinRoomPayload = {
                chatroomId: 1,
                userId: 1
            }
    
            socket.emit('joinRoom', payload);
    
            socket.on('message', (reply: Reply) => {
                if(reply.type === 'joinRoom') {
                    setMessageList(messageList => [...messageList, {
                        type: 'text',
                        content: '用户 ' + reply.userId + '加入聊天室'
                    }])
                } else {
                    setMessageList(messageList => [...messageList, reply.message])    
                }
            });
    
        });
    }, []);

    function sendMessage(value: string) {
        const payload2: SendMessagePayload = {
            sendUserId: 1,
            chatroomId: 1,
            message: {
                type: 'text',
                content: value
            }
        }

        socketRef.current?.emit('sendMessage', payload2);
    }

    return <div>
        <Input onBlur={(e) => {
            sendMessage(e.target.value);
        }}/>
        <div>
            {messageList.map(item => {
                return <div>
                    {item.type === 'image' ? <img src={item.content}/> : item.content }
                </div>
            })}
        </div>
    </div>
}