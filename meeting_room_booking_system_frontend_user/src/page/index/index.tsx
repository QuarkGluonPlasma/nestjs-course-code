import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import './index.css';

export function Index() {
    return <div id="index-container">
        <div className="header">
            <h1>会议室预定系统</h1>
            <Link to={'/update_info'} ><UserOutlined className="icon"/></Link>
        </div>
        <div className="body">
            <Outlet></Outlet>
        </div>
    </div>
}