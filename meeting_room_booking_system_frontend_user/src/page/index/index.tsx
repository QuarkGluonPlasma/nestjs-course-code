import { UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import './index.css';
import { useEffect, useState } from "react";
import cookies from 'js-cookie';

export function Index() {

    const [headPic, setHeadPic] = useState();

    useEffect(() => {
        const userInfo = cookies.get('userInfo');
        const accessToken = cookies.get('accessToken');
        const refreshToken = cookies.get('refreshToken');

        if(userInfo && accessToken && refreshToken) {
            localStorage.setItem('user_info', userInfo);
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);

            cookies.remove('userInfo');
            cookies.remove('accessToken');
            cookies.remove('refreshToken');
        }
    }, []);

    useEffect(() => {
        const userInfo = localStorage.getItem('user_info');
        if(userInfo) {
            const info = JSON.parse(userInfo);
            setHeadPic(info.headPic);
        } else {
            window.location.href = "/login";
        }
    }, []);

    return <div id="index-container">
        <div className="header">
            <h1><Link to={'/'}>会议室预定系统</Link></h1>
            <Link to={'/update_info'} >
                {
                    headPic ? <img src={headPic} width={40} height={40} className="icon"/> : <UserOutlined className="icon"/>
                }                
            </Link>
        </div>
        <div className="body">
            <Outlet></Outlet>
        </div>
    </div>
}