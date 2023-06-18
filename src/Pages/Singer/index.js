import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import URLAPI from '../../config/URLAPI';
import axios from 'axios';
import styles from './Singer.module.scss';

const cx = classNames.bind(styles)

function Singer() {
    const [singerList, setSingerList] = useState();

    useEffect(() => {
        const loading = document.querySelector('#loading');
        loading.style.display = 'unset';
        const listPageBtn = document.querySelectorAll('#list-page-btn-link li');
        for(const pageBtn of listPageBtn) {
            if(pageBtn.style.color === 'var(--btn-link-page-color)')
                pageBtn.style.color = 'var(--black-color)';
            if(pageBtn.id === 'Singer-page-btn-link')
                pageBtn.style.color = 'var(--btn-link-page-color)';
        }
        axios.get(URLAPI + '/singer')
            .then(res => res.data)
            .then(res => {
                loading.style.display = 'none';
                setSingerList(res)
            })
            .catch(() => console.log('ERROR'))
    }, []);

    function listenSinger(event) {
        while(!event.id) {
            event = event.parentElement;
        }
        if(event)
            axios.put(URLAPI + `/${event.id}/put` , { name: event.getAttribute('dataname')})
    }

    return (
        <main className='Singer-page'>
            {console.log('Singer-page')}
            <div className={cx('content')}>
                <div className={cx('singer-wrapper')}>
                    <h2 className={cx('singer-heading')}>Nghệ sĩ</h2>
                    <ul className={cx('singer-list')}>
                        {
                            singerList && singerList.map((singerItem, index) => {

                                return (
                                    <li id='singer' dataname={singerItem.name}
                                        className={cx('singer-item')} key={index}
                                        onClick={(e) => listenSinger(e.target)}
                                    >
                                        <Link to={'/singer/chart?q=' + singerItem.name } className={cx('singer-item-link')} >
                                            <img src={singerItem.linkImg} alt=''/>
                                            <p>{singerItem.name}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </main>
    )

}

export default Singer;
