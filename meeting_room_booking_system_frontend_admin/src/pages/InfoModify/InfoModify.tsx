import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useCallback, useEffect, useState } from 'react';
import './info_modify.css';
import { useNavigate } from 'react-router-dom';
import { HeadPicUpload } from './HeadPicUpload';
import { getUserInfo, updateInfo, updateUserInfoCaptcha } from '../../interfaces/interfaces';

export interface UserInfo {
    headPic: string;
    nickName: string;
    email: string;
    captcha: string;
}

const layout1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export function InfoModify() {
    const [form] = useForm();
    const navigate = useNavigate();

    const onFinish = useCallback(async (values: UserInfo) => {
        const res = await updateInfo(values);
    
        if(res.status === 201 || res.status === 200) {
            const { message: msg, data} = res.data;
            if(msg === 'success') {
                message.success('用户信息更新成功');
            } else {
                message.error(data);
            }
        } else {
            message.error('系统繁忙，请稍后再试');
        }
    }, []);

    const sendCaptcha = useCallback(async function () {
        const res = await updateUserInfoCaptcha();
        if(res.status === 201 || res.status === 200) {
            message.success(res.data.data);
        } else {
            message.error('系统繁忙，请稍后再试');
        }
    }, []);

    useEffect(() => {
        async function query() {
            const res = await getUserInfo();

            const { data } = res.data;

            if(res.status === 201 || res.status === 200) {
                
                form.setFieldValue('headPic', data.headPic);
                form.setFieldValue('nickName', data.nickName);
                form.setFieldValue('email', data.email);
            }
        }
        query();
    }, []);

    return <div id="updateInfo-container">
        <Form
            form={form}
            {...layout1}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
        >
            <Form.Item
                label="头像"
                name="headPic"
                rules={[
                    { required: true, message: '请输入头像!' },
                ]}
                shouldUpdate
            >
                <HeadPicUpload></HeadPicUpload>
            </Form.Item>

            <Form.Item
                label="昵称"
                name="nickName"
                rules={[
                    { required: true, message: '请输入昵称!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="邮箱"
                name="email"
                rules={[
                    { required: true, message: '请输入邮箱!' },
                    { type: "email", message: '请输入合法邮箱地址!'}
                ]}
            >
                <Input disabled/>
            </Form.Item>

            <div className='captcha-wrapper'>
                <Form.Item
                    label="验证码"
                    name="captcha"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" onClick={sendCaptcha}>发送验证码</Button>
            </div>

            <Form.Item
                {...layout1}
                label=" "
            >
                <Button className='btn' type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    </div>   
}