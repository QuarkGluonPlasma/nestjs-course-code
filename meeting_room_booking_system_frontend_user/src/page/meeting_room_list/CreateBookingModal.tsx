import { DatePicker, Form, Input, InputNumber, Modal, Select, TimePicker, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { bookingAdd } from "../../interface/interfaces";
import { MeetingRoomSearchResult } from "./MeetingRoomList";

interface CreateBookingModalProps {
    isOpen: boolean;
    handleClose: Function;
    meetingRoom: MeetingRoomSearchResult;
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

export interface CreateBooking {
    meetingRoomId: number;
    rangeStartDate: Date;
    rangeStartTime: Date;
    rangeEndDate: Date;
    rangeEndTime: Date;
    note: string;
}

export function CreateBookingModal(props: CreateBookingModalProps) {

    const [form] = useForm<CreateBooking>();

    const handleOk = async function() {
        const values = form.getFieldsValue();
        values.meetingRoomId = props.meetingRoom.id;

        const res = await bookingAdd(values);

        if(res.status === 201 || res.status === 200) {
            message.success('预定成功');
            form.resetFields();
            props.handleClose();
        } else {
            message.error(res.data.data);
        }
    }

    return <Modal title="创建会议室" open={props.isOpen} onOk={handleOk} onCancel={() => props.handleClose()} okText={'创建'}>
        <Form
            form={form}
            colon={false}
            {...layout}
        >
            <Form.Item
                label="会议室名称"
                name="meetingRoomId"
            >
                {props.meetingRoom.name}
            </Form.Item>
            <Form.Item
                label="预定开始日期"
                name="rangeStartDate"
                rules={[
                    { required: true, message: '请输入预定开始日期!' },
                ]}
            >
                <DatePicker/>
            </Form.Item>
            <Form.Item
                label="预定开始时间"
                name="rangeStartTime"
                rules={[
                    { required: true, message: '请输入预定开始日期!' },
                ]}
            >
                <TimePicker/>
            </Form.Item>
            <Form.Item
                label="预定结束日期"
                name="rangeEndDate"
                rules={[
                    { required: true, message: '请输入预定结束日期!' },
                ]}
            >
                <DatePicker/>
            </Form.Item>
            <Form.Item
                label="预定结束时间"
                name="rangeEndTime"
                rules={[
                    { required: true, message: '请输入预定结束日期!' },
                ]}
            >
                <TimePicker/>
            </Form.Item>
            <Form.Item
                label="备注"
                name="note"
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}