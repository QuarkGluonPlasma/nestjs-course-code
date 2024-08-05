import { Modal } from "antd";
import { FileUpload } from "./FileUpload";
import { useState } from "react";

interface UploadModalProps {
    isOpen: boolean;
    handleClose: (fileUrl?: string) => void
    type: 'image' | 'file'
}

export function UploadModal(props: UploadModalProps) {
    const [fileUrl, setFileUrl] = useState<string>('');

    return <Modal 
        title={`上传${props.type === 'image' ? '图片' : '文件'}`}
        open={props.isOpen}
        onOk={() => {
            props.handleClose(fileUrl)
            setFileUrl('')
        }}
        onCancel={() => props.handleClose()}
        okText={'确认'}
        cancelText={'取消'}    
    >
        <FileUpload value={fileUrl} type={props.type} onChange={(value: string) => {
            setFileUrl(value)
        }}/>
    </Modal>
}
