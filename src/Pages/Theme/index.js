import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from './Theme.module.scss';
import axios from "axios";
import URLAPI from '../../config/URLAPI';

const cx = classNames.bind(style);

function Theme() {

    const [listGenre, setListGenre] = useState();
    const [listNational, setListNational] = useState();

    useEffect(() => {
        const listPageBtn = document.querySelectorAll('#list-page-btn-link li');
        for(const pageBtn of listPageBtn) {
            if(pageBtn.style.color === 'var(--btn-link-page-color)')
                pageBtn.style.color = 'var(--black-color)';
            if(pageBtn.id === 'Theme-page-btn-link')
                pageBtn.style.color = 'var(--btn-link-page-color)';
        }
        axios.get(URLAPI + '/genre')
            .then(res => res.data)
            .then(res => {
                setListGenre(res);
                axios.get(URLAPI + '/national')
                    .then(res => res.data)
                    .then(res => setListNational(res))
                    .catch(() => console.log('ERROR'))
            })
            .catch(() => console.log('ERROR'))
    }, []);

    function nextList(nameList) {
        const list = document.querySelector(`#${nameList}-list`);
        const withList = list.clientWidth;
        const withChild = list.firstChild.clientWidth;
        list.scrollLeft +=  withChild;
        if(list.scrollLeft + withList >= (list.scrollWidth - 1)) {
            list.scrollLeft = 0;
        }
    }

    function backList(nameList) {
        const list = document.querySelector(`#${nameList}-list`);
        const withList = list.clientWidth;
        const withChild = list.firstChild.clientWidth;
        list.scrollLeft -=  withChild;
        if(list.scrollLeft === 0) {
            list.scrollLeft = withList;
        } 
    }

    function listenTheme(event) {
        while(!event.id) {
            event = event.parentElement;
        }
        if(event)
            axios.put(URLAPI + `/${event.id}/put` , { name: event.getAttribute('dataname')})
    }

    return (
        <main className="Theme-page">
            { console.log('Theme-page') }
            <div className={cx('content')}>
                <div className={cx('genre-wrapper')}>
                    <h2 className={cx('genre-heading')}>Thể loại</h2>
                    <ul id='genre-list' className={cx('genre-list')}>
                        {
                            listGenre && listGenre.map((genreItem, index) => {
                                return (
                                    <li id='genre' dataname={genreItem.name}
                                        className={cx('genre-item')} key={index}
                                        onClick={(e) => listenTheme(e.target)}
                                    >
                                        <Link to={'/theme/chart?q=' + genreItem.name } className={cx('genre-item-link')} >
                                            <img src={genreItem.linkImg} alt=''/>
                                            <p>{genreItem.name}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className={cx('genre-item-btn', 'left')} onClick={() => backList('genre')}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    <button className={cx('genre-item-btn')} onClick={() => nextList('genre')}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <div className={cx('national-wrapper')}>
                    <h2 className={cx('national-heading')}>Quốc gia</h2>
                    <ul id='national-list' className={cx('national-list')}>
                        {
                            listNational && listNational.map((nationalItem, index) => {
                                return (
                                    <li id='national' dataname={nationalItem.name} 
                                        className={cx('national-item')} key={index}
                                        onClick={(e) => listenTheme(e.target)}
                                    >
                                        <Link to={'/theme/chart?q=' + nationalItem.name } className={cx('national-item-link')} >
                                            <img src={nationalItem.linkImg} alt=''/>
                                            <p>{nationalItem.name}</p>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button className={cx('national-item-btn', 'left')} onClick={() => backList('national')}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                    <button className={cx('national-item-btn')} onClick={() => nextList('national')}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Theme;
