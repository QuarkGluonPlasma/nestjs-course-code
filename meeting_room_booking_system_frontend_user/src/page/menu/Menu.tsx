import { Outlet, useLocation } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from 'antd';
import './menu.css';
import { MenuClickEventHandler } from "rc-menu/lib/interface";
import { router } from "../..";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: "会议室列表"
    },
    {
        key: '2',
        label: "预定历史"
    }
];

const handleMenuItemClick: MenuClickEventHandler = (info) => {
    let path = '';
    switch(info.key) {
        case '1':
            path = '/meeting_room_list';
            break;
        case '2':
            path = '/booking_history';
            break;              
    }
    router.navigate(path);
}


export function Menu() {

    const location = useLocation();

    function getSelectedKeys() {
        if(location.pathname === '/meeting_room_list') {
            return ['1']
        } else if(location.pathname === '/booking_history') {
            return ['2']
        } else {
            return ['1']
        }
    }

    return <div id="menu-container">
        <div className="menu-area">
            <AntdMenu
                defaultSelectedKeys={getSelectedKeys()}
                items={items}
                onClick={handleMenuItemClick}
            />
        </div>
        <div className="content-area">
            <Outlet></Outlet>
        </div>
    </div>
}