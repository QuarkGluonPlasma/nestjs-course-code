import { Button, message, Popconfirm, Popover, Space } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { answerExport, examDelete, examList, examPublish, examUnpublish } from "../../interfaces";
import { ExamAddModal } from "./ExamAddModal";
import { Link } from "react-router-dom";
import { RankingModal } from "./RankingModal";

interface Exam {
    id: number
    name: string
    isPublish: boolean
    isDelete: boolean
    content: string
}

export function ExamList() {

    const [list, setList] = useState<Array<Exam>>();
    const [isExamAddModalOpen, setIsExamAddModalOpen] = useState(false);
    const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
    const [curExamId, setCurExamId] = useState<number>();

    async function query() {
        try {
            const res = await examList();
            if(res.status === 201 || res.status === 200) {
                setList(res.data)
            } 
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    async function changePublishState(id: number, publish: boolean) {
        try {
            const res = publish ? await examUnpublish(id) : await examPublish(id);
            if(res.status === 201 || res.status === 200) {
                message.success(publish ? '已取消发布' : '已发布');
                query();
            } 
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    async function deleteExam(id: number) {
        try {
            const res = await examDelete(id);
            if(res.status === 201 || res.status === 200) {
                message.success('已删除');
                query();
            } 
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    async function downloadExcel(examId: number) {
        try {
            const res = await answerExport(examId);
            if(res.status === 201 || res.status === 200) {
                message.success('导出成功');
            } 
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    useEffect(() => {
        query()
    }, []);

    const [bin, setBin] = useState(false);

    return <div id="ExamList-container">
        <div className="header">
            <h1>考试系统</h1>
        </div>
        <div className="body">
            <div className="operate">
                <Space>
                    <Button type="primary" onClick={() => {
                        setIsExamAddModalOpen(true);
                    }}>新建试卷</Button>
                    <Button onClick={() => {
                        setBin(bin => !bin)
                    }}>{bin ? '退出回收站' : '打开回收站'}</Button>
                </Space>
            </div>
            <div className="list">
                {
                    list?.filter(item => {
                        return bin ? item.isDelete === true : item.isDelete === false
                    }).map(item => {
                        return <div className="item">
                            <p>{item.name}</p>
                            <div className="btns">
                                <Button className="btn" type="primary" style={{background: 'darkblue'}} onClick={()=> {
                                    changePublishState(item.id, item.isPublish);
                                }}>{item.isPublish ?  '停止' : '发布' }</Button>
                                <Button className="btn" type="primary" style={{background: 'green'}}>
                                    <Link to={`/edit/${item.id}`}>编辑</Link>
                                </Button>
                                <Popover content={window.location.origin + '/exam/' + item.id} trigger="click">
                                    <Button type="default">
                                        考试链接
                                    </Button>
                                </Popover>
                                <Button className="btn" type="primary" style={{background: 'orange'}} onClick={() => {
                                    setIsRankingModalOpen(true)
                                    setCurExamId(item.id);
                                }}>
                                    排行榜
                                </Button>
                                <a href={"http://localhost:3003/answer/export?examId=" + item.id} download>
                                    导出所有答卷
                                </a>
                                <Popconfirm
                                    title="试卷删除"
                                    description="确认放入回收站吗？"
                                    onConfirm={() => deleteExam(item.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >                                  
                                    <Button className="btn" type="primary" style={{background: 'darkred'}}>删除</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <ExamAddModal isOpen={isExamAddModalOpen} handleClose={() => {
            setIsExamAddModalOpen(false);
            query();
        }}/>
        <RankingModal isOpen={isRankingModalOpen} handleClose={() => {
            setIsRankingModalOpen(false);
        }} examId={curExamId}/>
    </div>
}
