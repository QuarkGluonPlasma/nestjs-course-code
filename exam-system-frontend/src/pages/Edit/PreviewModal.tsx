import { Checkbox, Form, Input, Modal, Radio, message } from "antd";
import { Question } from ".";

interface PreviewModalProps {
    isOpen: boolean;
    handleClose: Function;
    json: Question[]
}

export function PreviewModal(props: PreviewModalProps) {

    function renderPreviewComponents(arr: Array<Question>) {
        return arr.map(item => {
            let formComponent;
            if(item.type === 'radio') {
                formComponent = <Radio.Group>
                    {
                        item.options?.map(option => <Radio value={option}>{option}</Radio>)
                    }
                </Radio.Group>
            } else if(item.type === 'checkbox') {
                formComponent = <Checkbox.Group options={item.options} />
            } else if(item.type === 'input'){
                formComponent =  <Input/>
            }

            return <div className="component-item" key={item.id}>
                <p className="question">{item.question}</p>
                <div className="options">
                    {formComponent}
                </div>
            </div>
        })
    }

    return <Modal 
        title="预览"
        className="preview"
        open={props.isOpen}
        onOk={() => props.handleClose()}
        onCancel={() => props.handleClose()}
        okText={'确认'}
        cancelText={'取消'}    
    >
        {renderPreviewComponents(props.json)}
    </Modal>
}