import { Badge, Button, Form, Input, Popconfirm, Table, message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import './index.css';
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
import { chatroomList } from "../../interfaces";
import { MembersModal } from "./MembersModal";
import { useNavigate } from "react-router-dom";
import { AddMemberModal } from "./AddMemberModal";
import { CreateGroupModal } from "./CreateGroupModal";

interface SearchGroup {
    name: string;
}

interface GroupSearchResult {
    id: number;
    name: string;
    type: boolean;
    userCount: number;
    userIds: Array<number>;
    createTime: Date;
}

export function Group() {
    const [groupResult, setGroupResult] = useState<Array<GroupSearchResult>>([]);

    const [isMembersModalOpen, setMembersModalOpen] = useState(false);
    const [isMemberAddModalOpen, setMemberAddModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);

    const [chatroomId, setChatroomId] = useState<number>(-1);

    const navigate = useNavigate();

    const columns: ColumnsType<GroupSearchResult> = [
        {
            title: '名称',
            dataIndex: 'name'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: (_, record) => {
                return new Date(record.createTime).toLocaleString()
            }
        },
        {
            title: '人数',
            dataIndex: 'userCount'
        },
        {
            title: '操作',
            render: (_, record) => (
                <div>
                    <a href="" onClick={() => {
                        navigate('/chat', {
                            state: {
                                chatroomId: record.id
                            }
                        });
                    }}>聊天</a>&nbsp;
                    <a href="#" onClick={() => {
                        setChatroomId(record.id);
                        setMembersModalOpen(true);
                    }}>详情</a>&nbsp;
                    <a href="#" onClick={() => {
                        setChatroomId(record.id);
                        setMemberAddModalOpen(true);
                    }}>添加成员</a>
                </div>
            )
        }
    ]

    const searchGroup = async (values: SearchGroup) => {
        try{
            const res = await chatroomList(values.name || '');

            if(res.status === 201 || res.status === 200) {
                setGroupResult(res.data.filter((item: GroupSearchResult) => {
                    return item.type === true
                }).map((item: GroupSearchResult) => {
                    return {
                        ...item,
                        key: item.id
                    }
                }));
            }
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    };

    const [form ]  = useForm();

    useEffect(() => {
        searchGroup({
            name: form.getFieldValue('name')
        });
    }, []);

    const [queryKey, setQueryKey] = useState<string>('');
    return <div id="group-container">
        <div className="group-form">
            <Form
                form={form}
                onFinish={searchGroup}
                name="search"
                layout='inline'
                colon={false}
            >
                <Form.Item label="名称" name="name">
                    <Input />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" style={{background: 'green'}} onClick={() => setCreateGroupModalOpen(true)}>
                        创建群聊
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="group-table">
            <Table columns={columns} dataSource={groupResult} style={{width: '1000px'}}/>
        </div>
        <MembersModal isOpen={isMembersModalOpen} handleClose={() => {
            setMembersModalOpen(false)
        }} chatroomId={chatroomId} queryKey={queryKey}/>
        <AddMemberModal isOpen={isMemberAddModalOpen} handleClose={() => {
            setMemberAddModalOpen(false)

            setQueryKey(Math.random().toString().slice(2, 10))
            searchGroup({
                name: form.getFieldValue('name')
            });
        }} chatroomId={chatroomId}/>
        <CreateGroupModal isOpen={isCreateGroupModalOpen} handleClose={() => {
            setCreateGroupModalOpen(false)

            searchGroup({
                name: form.getFieldValue('name')
            });
        }}/>
    </div>
}