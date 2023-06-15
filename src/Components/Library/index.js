import classNames from "classnames/bind";
import styles from './Library.module.scss';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import URLAPI from '../../config/URLAPI';
import { callMusicAPI, downloadMusic } from "../../utils/callMusicAPI";


const cx = classNames.bind(styles);

function Library() {
    const listMusicJSON = JSON.parse(localStorage.getItem('listMusic'));
    const [listMusic, setListMusic] = useState([]);

    useEffect(() => {
        axios.get(URLAPI + '/listMusic/item', { params: {listMusicJSON} })
            .then(res => res.data)
            .then(res => setListMusic(res))
            .catch(() => console.log('ERROR'))
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

    function removeItem(event) {
        while(!event.id)
            event = event.parentElement;
        if(event) {
            const listFake = [...listMusic];
            const listLocal = JSON.parse(localStorage.getItem('listMusic'));
            listFake.splice(event.id, 1);
            setListMusic(listFake);
            listLocal.splice(event.id, 1);
            localStorage.setItem('listMusic', JSON.stringify(listLocal));
        }
    }

    return (
        <main className={cx('wrapper')}>
            {console.log('library-local')}
            <div className={cx('content')}>
                <h2 className={cx('heading')}>Danh sách yêu thích</h2>
                <div className={cx('music-local')}>
                    <ul className={cx('list-music')} id="list-music">
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
                                            <li
                                                className={cx('item-music-option-item')}
                                                id={index}
                                                onClick={(e) => removeItem(e.target)}
                                            >
                                               <i className="fa-sharp fa-solid fa-trash"></i>
                                                Xóa khỏi danh sách
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                )
                            })
                        }
                        {
                            listMusic && !listMusic[0] &&
                            <p className={cx('item-music-null')}>
                                Không có bài hát nào được thêm vào mục yêu thích
                            </p>
                        }
                    </ul>
                </div>
            </div>
        </main>
    )

}

export default Library;
