import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useEffect } from 'react';
import NavLink from '../CustomNavLink';

const cx = classNames.bind(styles);

function Sidebar() {

    const optionList = [
        {
            id: 1,
            name: 'Danh sách bạn bè',
            path: `/list-friends`,
        },
        {
            id: 2,
            name: 'Danh sách lời mời',
            path: `/list-invites`,

        },
        {
            id: 3,
            name: 'Tìm bạn bè',
            path: '/search-friend',
        },
        {
            id: 4,
            name: 'Xếp hạng bạn bè',
            path: '/rank-friends',
        },
        {
            id: 5,
            name: 'Thoát',
            path: '/',
        },
    ];

    useEffect(() => {
        console.log('render sidebar');
    }, []);

    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-option')}>
                {
                    optionList.map((item) => (
                        <NavLink
                            key={item.id}
                            className={
                                cx('sidebar-option-item')
                            }
                            to={item.path}
                        >
                            <span>{item.name}</span>
                        </NavLink>
                    ))

                }
            </div>

        </div>
    );
}

export default Sidebar;
