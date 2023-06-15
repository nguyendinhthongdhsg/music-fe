import classNames from "classnames/bind";
import styles from './Charts.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import URLAPI from '../../config/URLAPI';
import { callMusicAPI, downloadMusic } from "../../utils/callMusicAPI";

const cx = classNames.bind(styles);

function Charts({ slug, string }) {

    const [listMusic, setListMusic] = useState();

    useEffect(() => {
        axios.get(URLAPI + '/' + slug, { headers: { 'Content-Type': 'application/json' } })
            .then(res => res.data)
            .then(res => {
                setListMusic(res);
            })
            .catch(() => console.log('Call API listMusic fail!'))
    }, []);

    function handlerCallAPIMusic(event, itemMusic) {
        while (!event.id) {
            event = event.parentElement;
        }
        if (event && event.id !== 'item-music-option' && event.parentElement.parentElement.id !== 'item-music-option') {
            axios.put(URLAPI + '/listMusic/put', { musicId: event.getAttribute('id') })
            document.querySelector('#loading').style.display = 'unset';
            const lengthListMusic = listMusic.length;
            const indexCenter = Number(event.getAttribute('indexmusic'));
            const indexNext = (indexCenter + 1) > (lengthListMusic - 1) ? '0' : (indexCenter + 1).toString(10);
            const indexBack = (indexCenter - 1) < 0 ? (lengthListMusic - 1).toString(10) : (indexCenter - 1).toString(10);
            const next = document.querySelector('#btn-handler-nextMusic');
            const back = document.querySelector('#btn-handler-backMusic');
            next.setAttribute('indexMusic', indexNext);
            back.setAttribute('indexMusic', indexBack);

            const infoMusic = document.querySelector('#player-controls-left>div');
            const infoMusicImg = document.querySelector('#player-controls-left img');
            const infoMusicNameMusic = document.querySelector('#player-controls-left #tool-info-music-music');
            const infoMusicNameSinger = document.querySelector('#player-controls-left #tool-info-music-singer');

            infoMusicImg.src = itemMusic.musicImg;
            infoMusicNameMusic.innerText = itemMusic.musicName;
            infoMusicNameSinger.innerText = itemMusic.singerName;
            infoMusic.style.display = 'flex';

            callMusicAPI(event);
        }
    }

    function addLibrary(event) {
        while (!event.id)
            event = event.parentElement;
        event.style.display = 'none';
        if (localStorage.getItem('listMusic')) {
            const listMusicLocalHost = JSON.parse(localStorage.getItem('listMusic'));
            listMusicLocalHost.push(event.id);
            localStorage.setItem('listMusic', JSON.stringify(listMusicLocalHost));
        }
        else {
            const listMusicLocalHost = [event.id];
            localStorage.setItem('listMusic', JSON.stringify(listMusicLocalHost));
        }
    }

    function checkAddLibrary(musicId) {
        let check = true;
        const listMusicLocalHost = JSON.parse(localStorage.getItem('listMusic'));
        if(listMusicLocalHost)
            listMusicLocalHost.map((musicItem) => {
                if(musicItem === musicId) {
                    check = false;
                    return '';
                }
            });
        if(check)
            return (
                <li className={cx('item-music-option-item')}
                    id={musicId}
                    onClick={(e) => addLibrary(e.target)}
                >
                    <i className="fa-solid fa-book-medical"></i>
                    Thêm vào thư viện
                </li>
            );
    }

    return (
        <div className={cx('wrapper')}>
            {console.log('Charts')}
            <div className={cx('content')}>
                <header className={cx('header')}>
                    <h2 className={cx('heading')}>Bảng xếp hạng</h2>
                    <h2 className={cx('heading-sub')}>Top 100 <span>{string}</span></h2>
                </header>
                <ul className={cx('list-music')}
                    id="list-music"
                >
                    {
                        listMusic && listMusic.map((itemMusic, index) => {
                            return (
                                <li
                                    indexmusic={index}
                                    id={itemMusic.musicId}
                                    key={index} className={cx('item-music', index === 0 && 'music-top-1')}
                                    onClick={(e) => {
                                        handlerCallAPIMusic(e.target, itemMusic);
                                    }}
                                >
                                    <h3 className={cx('item-music-index', 'index-' + index)}>{index + 1}</h3>
                                    <img
                                        className={cx('item-music-img')}
                                        src={itemMusic.musicImg} alt=""
                                    />
                                    <div className={cx('item-music-info')}>
                                        <h4 className={cx('item-music-name')}>{itemMusic.musicName}</h4>
                                        <h4 className={cx('item-music-singer')}>{itemMusic.singerName}</h4>
                                    </div>
                                    <div className={cx('item-music-listen')}>
                                        <p>
                                            {
                                                itemMusic.listens >= 1000000 ?
                                                    (itemMusic.listens / 1000000).toFixed(1) + 'M ' :
                                                    itemMusic.listens >= 1000 ?
                                                        (itemMusic.listens / 1000).toFixed(1) + 'K ' :
                                                        itemMusic.listens + ' '
                                            }
                                            Lượt nghe
                                        </p>
                                    </div>
                                    <div id="item-music-option" className={cx('item-music-option')}>
                                        <button title="btn-option-file" className={cx('item-music-option-btn')}><i className="fa-solid fa-ellipsis-vertical"></i></button>
                                        <ul className={cx('item-music-option-list')}>
                                            <li
                                                id={itemMusic.musicId}
                                                className={cx('item-music-option-item')}
                                                onClick={(e) => downloadMusic(e.target)}
                                            >
                                                <i className="fa-solid fa-download"></i>
                                                Tải về máy
                                            </li>
                                            {
                                                checkAddLibrary(itemMusic.musicId)
                                            }
                                        </ul>
                                    </div>
                                </li>
                            )
                        })
                    }
                    {
                        listMusic && !listMusic[0] &&
                        <p className={cx('item-music-null')}>
                            Không có bài hát nào thuộc danh mục
                            <span> {string} </span>
                            được đăng!
                        </p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Charts;
