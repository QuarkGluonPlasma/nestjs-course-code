import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { answerFind, examFind } from "../../interfaces";
import { Button, Checkbox, Input, message, Radio } from "antd";
import { Question } from "../Edit";
import './index.scss';

export function Res() {

    let { id } = useParams();

    const [score, setScore] = useState();
    const [json, setJson] = useState<Question[]>([]);

    async function query() {
        if(!id) {
            return;
        }
        try {
            const res = await answerFind(+id);

            if(res.status === 201 || res.status === 200) {
                setScore(res.data.score);

                await queryExam(res.data.examId)
            } 
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    async function queryExam(examId: number) {
        try {
            const res = await examFind(+examId);

            if(res.status === 201 || res.status === 200) {
                try{
                    const questions = JSON.parse(res.data.content);

                    setJson(questions);
                } catch(e) {}
            } 
        } catch(e: any){
            message.error(e.response?.data?.message || '系统繁忙，请稍后再试');
        }
    }

    useEffect(() => {
        query();        
    }, [])

    function renderComponents(arr: Array<Question>) {
        return arr.map(item => {
            let formComponent;
            if(item.type === 'radio') {
                formComponent = <Radio.Group value={item.answer}>
                    {
                        item.options?.map(option => <Radio value={option}>{option}</Radio>)
                    }
                </Radio.Group>
            } else if(item.type === 'checkbox') {
                formComponent = <Checkbox.Group options={item.options} value={item.answer.split(',')}/>
            } else if(item.type === 'input'){
                formComponent =  <Input value={item.answer}/>
            }

            return <div className="component-item" key={item.id}>
                <p className="question">{item.question}</p>
                <div className="options">
                    {formComponent}
                </div>
                <p className="score">
                    分值：{item.score}
                </p>
                <p className="answerAnalyse">
                    答案解析：{item.answerAnalyse}
                </p>
            </div>
        })
    }

    return <div id="res-container">
        <div className="score-container">
            得分: <span>{score}</span>
        </div>
        <div className="answer-list">
            正确答案：{renderComponents(json)}
        </div>
        <Button type="primary"><Link to="/">返回试卷列表</Link></Button>
    </div>
}
