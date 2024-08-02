import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";
import axios from "axios";
import { presignedUrl } from "../../interfaces";

interface HeadPicUploadProps {
    value?: string;
    onChange?: Function
}

let onChange: Function;

const props: DraggerProps = {
    name: 'file',
    action: async (file) => {
        const res = await presignedUrl(file.name);
        return res.data;
    },
    async customRequest(options) {
        const { onSuccess, file, action } = options;

        const res = await axios.put(action, file);

        onSuccess!(res.data);
    },
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            onChange('http://localhost:9000/chat-room/' + info.file.name);
            message.success(`${info.file.name} 文件上传成功`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
};

const dragger = <Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
</Dragger>

export function HeadPicUpload(props: HeadPicUploadProps) {

    onChange = props.onChange!

    return props?.value ? <div>
        <img src={props.value} alt="头像" width="100" height="100"/>
        {dragger}
    </div>: <div>
        {dragger}
    </div>
}