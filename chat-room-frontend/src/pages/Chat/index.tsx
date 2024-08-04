import { Button, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import './index.scss';
import { chatHistoryList, chatroomList } from "../../interfaces";
import { UserInfo } from "../UpdateInfo";
import TextArea from "antd/es/input/TextArea";

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
    message: ChatHistory
} | {
    type: 'joinRoom'
    userId: number
}


interface Chatroom {
    id: number;
    name: string;
    createTime: Date;
}

interface ChatHistory {
    id: number
    content: string
    type: number
    chatroomId: number
    senderId: number
    createTime: Date,
    sender: UserInfo
}

interface User {
    id: number;
    email: string;
    headPic: string;
    nickName: string;
    username: string;
    createTime: Date;
}

export function getUserInfo(): User {
    return JSON.parse(localStorage.getItem('userInfo')!);
}

export function Chat() {
    const socketRef = useRef<Socket>();
    const [roomId, setChatroomId] = useState<number>();
    const userInfo = getUserInfo();

    useEffect(() => {
        if(!roomId) {
            return;
        }
        const socket = socketRef.current = io('http://localhost:3005');
        socket.on('connect', function() {
    
            const payload: JoinRoomPayload = {
                chatroomId: roomId,
                userId: userInfo.id
            }
    
            socket.emit('joinRoom', payload);
    
            socket.on('message', (reply: Reply) => {
                if(reply.type === 'sendMessage') {
                    setChatHistory((chatHistory) => [...chatHistory!, reply.message]);   
                    setTimeout(() => {
                        document.getElementById('bottom-bar')?.scrollIntoView({block: 'end'});
                    }, 300);
                }
            });
    
        });
    }, [roomId]);

    function sendMessage(value: string) {
        if(!value) {
            return;
        }
        if(!roomId) {
            return;
        }

        const payload: SendMessagePayload = {
            sendUserId: userInfo.id,
            chatroomId: roomId,
            message: {
                type: 'text',
                content: value
            }
        }

        socketRef.current?.emit('sendMessage', payload);
    }

    const [roomList, setRoomList] = useState<Array<Chatroom>>();

    async function queryChatroomList() {
        try{
            const res = await chatroomList();

            if(res.status === 201 || res.status === 200) {
                setRoomList(res.data.map((item: Chatroom) => {
                    return {
                        ...item,
                        key: item.id
                    }
                }));
            }
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    useEffect(() => {
        queryChatroomList();
    }, []);

    const [chatHistory, setChatHistory] = useState<Array<ChatHistory>>();

    async function queryChatHistoryList(chatroomId: number) {
        try{
            const res = await chatHistoryList(chatroomId);

            if(res.status === 201 || res.status === 200) {
                setChatHistory(res.data.map((item: Chatroom) => {
                    return {
                        ...item,
                        key: item.id
                    }
                }));
            }
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }
    const [inputText, setInputText] = useState('');

    return <div id="chat-container">
        <div className="chat-room-list">
            {
                roomList?.map(item => {
                    return <div className="chat-room-item" key={item.id} data-id={item.id} onClick={() => {
                        queryChatHistoryList(item.id);
                        setChatroomId(item.id);
                    }}>{item.name}</div>
                })
            }
        </div>
        <div className="message-list">
            {chatHistory?.map(item => {
                return <div className={`message-item ${item.senderId === userInfo.id ? 'from-me' : ''}`} key={item.id} data-id={item.id}>
                    <div className="message-sender">
                        <img src={item.sender.headPic} />
                        <span className="sender-nickname">{item.sender.nickName}</span>
                    </div>
                    <div className="message-content">
                        {item.content}
                    </div>
                </div>
            })}
            <div id="bottom-bar" key='bottom-bar'></div>
        </div>
        <div className="message-input">
            <div className="message-type">
                <div className="message-type-item" key={1}>表情</div>
                <div className="message-type-item" key={2}>图片</div>
                <div className="message-type-item" key={3}>文件</div>
            </div>
            <div className="message-input-area">
                <TextArea className="message-input-box" value={inputText} onChange={(e) => {
                    setInputText(e.target.value)
                }}/>
                <Button className="message-send-btn" type="primary" onClick={() => {
                    sendMessage(inputText)
                    setInputText('');
                }}>发送</Button>
            </div>
        </div>
    </div>
}