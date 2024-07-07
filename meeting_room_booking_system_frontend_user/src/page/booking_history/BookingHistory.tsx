import { Button, DatePicker, Form, Input, Popconfirm, Table, TimePicker, message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import './booking_history.css';
import { bookingList, unbind } from "../../interface/interfaces";
import { MeetingRoomSearchResult } from "../meeting_room_list/MeetingRoomList";
import { ColumnsType } from "antd/es/table";
import dayjs from 'dayjs';

export interface SearchBooking {
    username: string;
    meetingRoomName: string;
    meetingRoomPosition: string;
    rangeStartDate: Date;
    rangeStartTime: Date;
    rangeEndDate: Date;
    rangeEndTime: Date;
}

interface BookingSearchResult {
    id: number;
    startTime: string;
    endTime: string;
    status: string;
    note: string;
    createTime: string;
    updateTime: string;
    room: MeetingRoomSearchResult
}

function getUserInfo() {
    const userInfoStr = localStorage.getItem('user_info');

    if(userInfoStr) {
        return JSON.parse(userInfoStr);
    }
}

export function BookingHistory() {
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [bookingSearchResult, setBookingSearchResult] = useState<Array<BookingSearchResult>>([]);
    const [num, setNum] = useState(0);

    const searchBooking = async (values: SearchBooking) => {
        const res = await bookingList({
            ...values,
            username: getUserInfo().username
        }, pageNo, pageSize);

        const { data } = res.data;
        if(res.status === 201 || res.status === 200) {
            setBookingSearchResult(data.bookings.map((item: BookingSearchResult) => {
                return {
                    key: item.id,
                    ...item
                }
            }))
        } else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }

    const [form ]  = useForm();

    const changePage = function(pageNo: number, pageSize: number) {
        setPageNo(pageNo);
        setPageSize(pageSize);
    }

    useEffect(() => {
        searchBooking({
            username: getUserInfo().username,
            meetingRoomName: form.getFieldValue('meetingRoomName'),
            meetingRoomPosition: form.getFieldValue('meetingRoomPosition'),
            rangeStartDate: form.getFieldValue('rangeStartDate'),
            rangeStartTime: form.getFieldValue('rangeStartTime'),
            rangeEndDate: form.getFieldValue('rangeEndDate'),
            rangeEndTime: form.getFieldValue('rangeEndTime')
        });
    }, [pageNo, pageSize, num]);

    async function changeStatus(id: number) {

        const res = await unbind(id);

        if(res.status === 201 || res.status === 200) {
            message.success('状态更新成功');
            setNum(Math.random());
        } else {
            message.error(res.data.data);
        }
    }

    const columns: ColumnsType<BookingSearchResult> = [
        {
            title: '会议室名称',
            dataIndex: 'room',
            render(_, record) {
                return record.room.name
            }
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            render(_, record) {
                return  dayjs(new Date(record.startTime)).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            render(_, record) {
                return dayjs(new Date(record.endTime)).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        {
            title: '审批状态',
            dataIndex: 'status',
            onFilter: (value, record) => record.status.startsWith(value as string),
            filters: [
                {
                  text: '审批通过',
                  value: '审批通过',
                },
                {
                  text: '审批驳回',
                  value: '审批驳回',
                },
                {
                    text: '申请中',
                    value: '申请中',
                },
                {
                    text: '已解除',
                    value: '已解除'
                },
              ],
        },
        {
            title: '预定时间',
            dataIndex: 'createTime',
            render(_, record) {
                return dayjs(new Date(record.createTime)).format('YYYY-MM-DD hh:mm:ss')
            }
        },
        {
            title: '备注',
            dataIndex: 'note'
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '操作',
            render: (_, record) => (
                record.status === '申请中' ? <div>
                    <Popconfirm
                        title="解除申请"
                        description="确认解除吗？"
                        onConfirm={() => changeStatus(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >  
                        <a href="#">解除预定</a>
                    </Popconfirm>
                </div> : null
            )
        }
    ];

    return <div id="bookingHistory-container">
        <div className="bookingHistory-form">
            <Form
                form={form}
                onFinish={searchBooking}
                name="search"
                layout='inline'
                colon={false}
            >
                <Form.Item label="会议室名称" name="meetingRoomName">
                    <Input />
                </Form.Item>

                <Form.Item label="预定开始日期" name="rangeStartDate">
                    <DatePicker/>
                </Form.Item>

                <Form.Item label="预定开始时间" name="rangeStartTime">
                    <TimePicker/>
                </Form.Item>

                <Form.Item label="预定结束日期" name="rangeEndDate">
                    <DatePicker/>
                </Form.Item>

                <Form.Item label="预定结束时间" name="rangeEndTime">
                    <TimePicker/>
                </Form.Item>

                <Form.Item label="位置" name="meetingRoomPosition">
                    <Input />
                </Form.Item>

                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit">
                        搜索预定历史
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="bookingHistory-table">
            <Table columns={columns} dataSource={bookingSearchResult} pagination={ {
                current: pageNo,
                pageSize: pageSize,
                onChange: changePage
            }}/>
        </div>
    </div>
}