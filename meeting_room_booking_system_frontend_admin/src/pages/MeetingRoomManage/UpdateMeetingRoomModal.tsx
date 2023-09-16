import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect } from "react";
import { findMeetingRoom, updateMeetingRoom } from "../../interfaces/interfaces";

interface UpdateMeetingRoomModalProps {
    id: number;
    isOpen: boolean;
    handleClose: Function
}
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export interface UpdateMeetingRoom {
    id: number;
    name: string;
    capacity: number;
    location: string;
    equipment: string;
    description: string;
}

export function UpdateMeetingRoomModal(props: UpdateMeetingRoomModalProps) {

    const [form] = useForm<UpdateMeetingRoom>();

    const handleOk = useCallback(async function() {
        const values = form.getFieldsValue();

        values.description = values.description || '';
        values.equipment = values.equipment || '';

        const res = await updateMeetingRoom({
            ...values,
            id: form.getFieldValue('id')
        });

        if(res.status === 201 || res.status === 200) {
            message.success('更新成功');
            props.handleClose();
        } else {
            message.error(res.data.data);
        }
    }, []);

    useEffect(() => {
        async function query() {
            if(!props.id) {
                return;
            }
            const res = await findMeetingRoom(props.id);
            
            const { data } = res;
            if(res.status === 200 || res.status === 201) {
                form.setFieldValue('id', data.data.id);
                form.setFieldValue('name', data.data.name);
                form.setFieldValue('location', data.data.location);
                form.setFieldValue('capacity', data.data.capacity);
                form.setFieldValue('equipment', data.data.equipment);
                form.setFieldValue('description', data.data.description);
            } else {
                message.error(res.data.data);
            }
        }
        
        query();
    }, [props.id]);

    return <Modal title="更新会议室" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()} okText={'更新'}>
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