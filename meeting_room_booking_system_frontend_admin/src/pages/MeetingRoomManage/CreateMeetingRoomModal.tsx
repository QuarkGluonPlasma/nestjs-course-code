import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback } from "react";
import { createMeetingRoom } from "../../interfaces/interfaces";

interface CreateMeetingRoomModalProps {
    isOpen: boolean;
    handleClose: Function
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export interface CreateMeetingRoom {
    name: string;
    capacity: number;
    location: string;
    equipment: string;
    description: string;
}

export function CreateMeetingRoomModal(props: CreateMeetingRoomModalProps) {

    const [form] = useForm<CreateMeetingRoom>();

    const handleOk = useCallback(async function() {
        const values = form.getFieldsValue();

        values.description = values.description || '';
        values.equipment = values.equipment || '';

        const res = await createMeetingRoom(values);

        if(res.status === 201 || res.status === 200) {
            message.success('创建成功');
            form.resetFields();
            props.handleClose();
        } else {
            message.error(res.data.data);
        }
    }, []);

    return <Modal title="创建会议室" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()} okText={'创建'}>
        <Form
            form={form}
            colon={false}
            {...layout}
        >
            <Form.Item
                label="会议室名称"
                name="name"
                rules={[
                    { required: true, message: '请输入会议室名称!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="位置"
                name="location"
                rules={[
                    { required: true, message: '请输入会议室位置!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="容纳人数"
                name="capacity"
                rules={[
                    { required: true, message: '请输入会议室容量!' },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="设备"
                name="equipment"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="描述"
                name="description"
            >
                <TextArea/>
            </Form.Item>
        </Form>
    </Modal>
}