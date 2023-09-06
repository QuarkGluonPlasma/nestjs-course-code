import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import './index.css';

export function Index() {
    return <div id="index-container">
        <div className="header">
            <h1>会议室预定系统-后台管理</h1>
            <UserOutlined className="icon"/>
        </div>
        <div className="body">
            <Outlet></Outlet>
        </div>
    </div>
}