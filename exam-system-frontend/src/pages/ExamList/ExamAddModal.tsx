import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { examAdd } from "../../interfaces";

interface ExamAddModalProps {
    isOpen: boolean;
    handleClose: Function
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export interface ExamAdd {
    name: string;
}

export function ExamAddModal(props: ExamAddModalProps) {

    const [form] = useForm<ExamAdd>();

    const handleOk = async function() {
        await form.validateFields();

        const values = form.getFieldsValue();

        try{
            const res = await examAdd(values);

            if(res.status === 201 || res.status === 200) {
                message.success('创建成功');
                form.resetFields();
                props.handleClose();
            }
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    return <Modal 
        title="新增试卷"
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
                label="试卷名"
                name="name"
                rules={[
                    { required: true, message: '请输入试卷名!' },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}