
import classNames from "classnames/bind";
import styles from './Toolbar.module.scss';
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Toolbar() {

    useEffect(() => {
        const infoMusicImg = document.querySelector('#player-controls-left img');
        infoMusicImg.animate([
                {transform: 'rotate(360deg)'}
            ], {
                duration: 30000,
                iterations: Infinity
            });
    }, [])

    function handlerAction(event) {
        const toolSource = document.querySelector('#tool-source');
        while(!event.getAttribute('action')) {
            event = event.parentElement;
        }
        if(event.getAttribute('action') === 'play') {
            event.setAttribute('action', 'pause');
            event.innerHTML = `<i style="font-size: 2.4rem;" class='fa-solid fa-pause'></i>`;
            toolSource.play();
            const toolbar = document.querySelector('#tool-bar-wrapper');
            toolbar.style.bottom = '0';
            toolbar.style.opacity = '1';
            const loading = document.querySelector('#loading');
            loading.style.display = 'none';
        }
        else if(event.getAttribute('action') === 'pause') {
            event.setAttribute('action', 'play');
            event.innerHTML = `<i class='fa-solid fa-play ${cx('btn-center')}'></i>`;
            toolSource.pause();
        }
    }

    function handlerDirectMusic(event) {
        while(event && !event.getAttribute('indexmusic'))
            event = event.parentElement;
        if(event) {
            const index = event.getAttribute('indexmusic');
            const music = document.querySelector(`#list-music li[indexmusic='${index}']`);
            if(music)
                music.click();
            else {
                const btnPlayMusic = document.querySelector('#btn-handler-action');
                btnPlayMusic.click();
            }
        }
    }

    function handleLineUpdate(event) {
        if (event.duration) {
            const myRange = document.querySelector('#player-controls-range');
            const current = document.querySelector('#player-controls-current');
            current.innerText = `${Math.floor(event.currentTime / 60)}:${(event.currentTime % 60).toFixed(0)}`;
            const currentAudio = Math.floor(event.currentTime / event.duration * 100);
            myRange.value = currentAudio;
            if(currentAudio === 100) 
                document.querySelector('#btn-handler-nextMusic').click();
        }
    }

    function setTimeDuration(event) {
        const duration = document.querySelector('#player-controls-duration');
        duration.innerText = `${Math.floor(event.duration / 60)}:${(event.duration % 60).toFixed(0)}`;
    }

    function handlerChangCurrent (event) {
        const toolSource = document.querySelector('#tool-source');
        toolSource.currentTime = Math.ceil(event.value / 100 * toolSource.duration);
    }

    return (
        <div id="tool-bar-wrapper" className={cx('wrapper')}>
            { console.log('Tool-bar') }
            <audio id='tool-source' className={cx('tool-source')} src='' controls autoPlay
                onTimeUpdate = {(e) => handleLineUpdate(e.target)}
                onLoadedMetadata={(e) => setTimeDuration(e.target)}
            />  
            <nav className={cx('player-controls')}>
                <div id="player-controls-left" className={cx('player-controls-left')}>
                    <div className={cx('tool-info')}>
                        <img src='' 
                            alt=''
                            className={cx('tool-info-img')}
                        />    
                        <div className={cx('tool-info-music')}>
                            <h4 id="tool-info-music-music" className={cx('tool-info-music-music')}>.</h4>
                            <h4 id="tool-info-music-singer" className={cx('tool-info-music-singer')}>.</h4>
                        </div>
                    </div> 
                </div>
                <div className={cx('player-controls-center')}>
                    <div className={cx('player-controls-center-action')}>
                        <ul className={cx('player-controls-center-action-list')}>
                            <li id='btn-handler-backMusic' indexmusic="" 
                                className={cx('player-controls-center-action-item')}
                                onClick={(e) => handlerDirectMusic(e.target)}
                            >
                                <i className={"fa-solid fa-backward-step " + cx('btn-left')}></i>
                            </li>
                            <li className={cx('player-controls-center-action-item', 'center')}
                                id='btn-handler-action' action="play" onClick={(e) => handlerAction(e.target)}
                            >
                                <i className={"fa-solid fa-play " + cx('btn-center')}></i>
                            </li>
                            <li id='btn-handler-nextMusic' indexmusic=""
                                className={cx('player-controls-center-action-item')}
                                onClick={(e) => handlerDirectMusic(e.target)}
                            > 
                                <i className={"fa-solid fa-backward-step " + cx('btn-right')}></i>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('player-controls-center-line')}>
                        <span id="player-controls-current"></span>
                        <input id="player-controls-range" type="range" 
                        step={1} min={0} max={100} placeholder="" 
                        onChange={(e) => handlerChangCurrent(e.target)}
                        />
                        <span id="player-controls-duration"></span>
                    </div>
                </div>
                <div className={cx('player-controls-right')}></div>
            </nav>
        </div>
    )
}

export default Toolbar;
