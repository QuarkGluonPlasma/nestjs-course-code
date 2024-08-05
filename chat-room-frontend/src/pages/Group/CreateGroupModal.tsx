import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { createGroup } from "../../interfaces";

interface CreateGroupModalProps {
    isOpen: boolean;
    handleClose: Function
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export interface GroupGroup {
    name: string;
}

export function CreateGroupModal(props: CreateGroupModalProps) {

    const [form] = useForm<GroupGroup>();

    const handleOk = async function() {
        await form.validateFields();

        const values = form.getFieldsValue();

        try{
            const res = await createGroup(values.name);

            if(res.status === 201 || res.status === 200) {
                message.success('群聊创建成功过');
                form.resetFields();
                props.handleClose();
            }
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    return <Modal 
        title="创建群聊"
        open={props.isOpen}
        onOk={handleOk}
        onCancel={() => props.handleClose()}
        okText={'创建'}
        cancelText={'取消'}    
    >
        <Form
            form={form}
            colon={false}
            {...layout}
        >
            <Form.Item
                label="群聊名称"
                name="name"
                rules={[
                    { required: true, message: '请输入群聊名称!' },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}