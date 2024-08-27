import { Button, Form, Input, Modal, Table, TableColumnsType, message } from "antd";
import { useEffect, useState } from "react";
import { ranking } from "../../interfaces";


interface RankingModalProps {
    isOpen: boolean;
    handleClose: Function
    examId?: number
}

export function RankingModal(props: RankingModalProps) {

    const [list, setList] = useState([]);

    useEffect(() => {
        query();
    }, [props.examId]);

    async function query(){
        if(!props.examId) {
            return;
        }
        try{
            const res = await ranking(props.examId);

            if(res.status === 201 || res.status === 200) {
                setList(res.data);
            }
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    const columns: TableColumnsType = [
        {
            title: '名字',
            key: 'name',
            render: (_, record) => (
                <div>
                    {record.answerer.username}
                </div>
            )
          },
          {
            title: '分数',
            dataIndex: 'score',
            key: 'score',
          }
    ]

    return <Modal 
        title="排行榜"
        open={props.isOpen}
        onOk={() => props.handleClose()}
        onCancel={() => props.handleClose()}
        okText={'确认'}
        cancelText={'取消'}    
    >

        <Table dataSource={list} columns={columns} />;

    </Modal>
}