import { Button, Form, Image, Input, Table, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import './UserManage.css';
import { ColumnsType } from "antd/es/table";
import { userSearch } from "../../interfaces/interfaces";

interface SearchUser {
    username: string;
    nickName: string;
    email: string;
}

interface UserSearchResult {
    username: string;
    nickName: string;
    email: string;
    headPic: string;
    createTime: Date;
}
const columns: ColumnsType<UserSearchResult> = [
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: '头像',
        dataIndex: 'headPic',
        render: value => {
            return value ? <Image
                    width={50}
                    src={`http://localhost:3005/${value}`}
            /> : '';
        }
    },
    {
        title: '昵称',
        dataIndex: 'nickName'
    },
    {
        title: '邮箱',
        dataIndex: 'email'
    },
    {
        title: '注册时间',
        dataIndex: 'createTime'
    }   
];

export function UserManage() {
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [userResult, setUserResult] = useState<UserSearchResult[]>();

    const searchUser = useCallback(async (values: SearchUser) => {
        const res = await userSearch(values.username,values.nickName, values.email, pageNo, pageSize);

        const { data } = res.data;
        if(res.status === 201 || res.status === 200) {
            setUserResult(data.users.map((item: UserSearchResult) => {
                return {
                    key: item.username,
                    ...item
                }
            }))
        } else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }, []);

    useEffect(() => {
        searchUser({
            username: '',
            email: '',
            nickName: ''
        });
    }, [pageNo, pageSize]);

    const changePage = useCallback(function(pageNo: number, pageSize: number) {
        setPageNo(pageNo);
        setPageSize(pageSize);
    }, []);

    return <div id="userManage-container">
        <div className="userManage-form">
            <Form
                onFinish={searchUser}
                name="search"
                layout='inline'
                colon={false}
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="昵称" name="nickName">
                    <Input />
                </Form.Item>

                <Form.Item label="邮箱" name="email" rules={[
                    { type: "email", message: '请输入合法邮箱地址!'}
                ]}>
                    <Input/>
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        搜索用户
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="userManage-table">
            <Table columns={columns} dataSource={userResult} pagination={ {
                current: pageNo,
                pageSize: pageSize,
                onChange: changePage
            }}/>
        </div>
    </div>
}