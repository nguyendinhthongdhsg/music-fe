import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import axios from "axios";
import URLAPI from "../../../../config/URLAPI";
import { Fragment, useState } from "react";
import { callMusicAPI, downloadMusic } from "../../../../utils/callMusicAPI";

const cx = classNames.bind(styles);

function Header() {
    const [listMusic, setListMusic] = useState();
    const isTabletOrMobile = useMediaQuery({
        query: "(max-width: 1023px) and (min-width: 740px)",
    });
    const isMobile = useMediaQuery({ query: "(max-width: 739px)" });

    function search(event) {
        event.preventDefault();
        const form = event.target;
        if (form.search.value) {
            axios
                .get(URLAPI + "/listMusic/search?q=" + form.search.value)
                .then((res) => res.data)
                .then((res) => {
                    if (res[0]) setListMusic(res);
                    else {
                        setListMusic({
                            error: `Không có bài hát nào tên '${form.search.value}'`,
                        });
                    }
                })
                .catch(() => console.log("ERROR"));
        }
    }

    function onSearch() {
        document.onclick = () => {
            setListMusic([]);
            document.onclick = "";
        };
    }

    function playMusicSearch(event, itemMusic) {
        while (!event.id) event = event.parentElement;
        if (
            event &&
            event.id !== "item-music-option" &&
            event.parentElement.parentElement.id !== "item-music-option"
        ) {
            axios.put(URLAPI + "/listMusic/put", {
                musicId: event.getAttribute("id"),
            });
            document.querySelector("#loading").style.display = "unset";
            const infoMusic = document.querySelector("#player-controls-left>div");
            const infoMusicImg = document.querySelector("#player-controls-left img");
            const infoMusicNameMusic = document.querySelector(
                "#player-controls-left #tool-info-music-music"
            );
            const infoMusicNameSinger = document.querySelector(
                "#player-controls-left #tool-info-music-singer"
            );

            infoMusicImg.src = itemMusic.musicImg;
            infoMusicNameMusic.innerText = itemMusic.musicName;
            infoMusicNameSinger.innerText = itemMusic.singerName;
            infoMusic.style.display = "flex";

            callMusicAPI(event);
        }
    }

    function addLibrary(event) {
        while (!event.id) event = event.parentElement;
        event.style.display = "none";
        if (localStorage.getItem("listMusic")) {
            const listMusicLocalHost = JSON.parse(localStorage.getItem("listMusic"));
            listMusicLocalHost.push(event.id);
            localStorage.setItem("listMusic", JSON.stringify(listMusicLocalHost));
        } else {
            const listMusicLocalHost = [event.id];
            localStorage.setItem("listMusic", JSON.stringify(listMusicLocalHost));
        }
    }

    function checkAddLibrary(musicId) {
        let check = true;
        const listMusicLocalHost = JSON.parse(localStorage.getItem("listMusic"));
        if (listMusicLocalHost)
            listMusicLocalHost.map((musicItem) => {
                if (musicItem === musicId) {
                    check = false;
                    return "";
                }
            });
        if (check)
            return (
                <li
                    className={cx("item-music-option-item")}
                    id={musicId}
                    onClick={(e) => addLibrary(e.target)}
                >
                    <i className="fa-solid fa-book-medical"></i>
                    Thêm vào thư viện
                </li>
            );
    }

    function mouthSearchBtn(event) {
        while(!event.getAttribute('data'))
            event = event.parentElement;
        if(event) {
            if(event.getAttribute('data') === 'open') {
                document.querySelector('#nav-mouth-search-btn-mobile').style.display = 'flex';
                event.setAttribute('data', 'close');
            }
            else if(event.getAttribute('data') === 'close') {
                document.querySelector('#nav-mouth-search-btn-mobile').style.display = 'none';
                event.setAttribute('data', 'open');
            }
        }
    }

    return (
        <header className={cx("wrapper")}>
            {console.log("Header")}
            <nav className={cx("nav")}>
                <a className={cx("nav-logo")} href="/">
                    <i className="fa-solid fa-music"></i>
                    <h1 className={cx("nav-heading")}>Music</h1>
                </a>
                {!isTabletOrMobile && !isMobile && (
                    <Fragment>
                        <ul id="list-page-btn-link" className={cx("nav-list")}>
                            <li id="Home-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/">
                                    BXH
                                </Link>
                            </li>
                            <li id="Theme-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/theme">
                                    Chủ đề
                                </Link>
                            </li>
                            <li id="Singer-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/singer">
                                    Nghệ sĩ
                                </Link>
                            </li>
                            <li id="Library-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/library">
                                    Thư viện
                                </Link>
                            </li>
                        </ul>
                        <div className={cx("nav-search")}>
                            <form
                                className={cx("nav-search-form")}
                                onSubmit={(e) => search(e)}
                                action="/"
                                method="GET"
                            >
                                <button
                                    title="nav-search-btn"
                                    className={cx("nav-search-btn")}
                                    type="submit"
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <input
                                    type="search"
                                    name="search"
                                    className={cx("nav-search-input")}
                                    placeholder="Tìm kiếm"
                                    spellCheck={false}
                                />
                            </form>
                            {listMusic && (
                                <ul className={cx("nav-listMusic")} id="nav-listMusic">
                                    {!listMusic.error &&
                                        listMusic.map((itemMusic, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={cx("nav-itemMusic")}
                                                    onClick={(e) => playMusicSearch(e.target, itemMusic)}
                                                    id={itemMusic.musicId}
                                                >
                                                    <img src={itemMusic.musicImg} alt="" />
                                                    <div className={cx("item-music-info")}>
                                                        <h4 className={cx("item-music-name")}>
                                                            {itemMusic.musicName}
                                                        </h4>
                                                        <h4 className={cx("item-music-singer")}>
                                                            {itemMusic.singerName}
                                                        </h4>
                                                    </div>
                                                    <div
                                                        id="item-music-option"
                                                        className={cx("item-music-option")}
                                                    >
                                                        <button
                                                            title="btn-option-file"
                                                            className={cx("item-music-option-btn")}
                                                        >
                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                        </button>
                                                        <ul className={cx("item-music-option-list")}>
                                                            <li
                                                                id={itemMusic.musicId}
                                                                className={cx("item-music-option-item")}
                                                                onClick={(e) => downloadMusic(e.target)}
                                                            >
                                                                <i className="fa-solid fa-download"></i>
                                                                Tải về máy
                                                            </li>
                                                            {checkAddLibrary(itemMusic.musicId)}
                                                        </ul>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    {listMusic.error && (
                                        <li className={cx("nav-itemMusic")}>
                                            <p className={cx("nav-itemMusic-error")}>
                                                {listMusic.error}
                                            </p>
                                        </li>
                                    )}
                                    {onSearch()}
                                </ul>
                            )}
                        </div>
                        <div className={cx("nav-admin")}>
                            <Link title="uploads" to="/uploads">
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                            </Link>
                        </div>
                        <div className={cx("nav-user")}>
                            <button className={cx("nav-user-login")}>Đăng nhập</button>
                        </div>
                    </Fragment>
                )}
                {isTabletOrMobile && (
                    <Fragment>
                        <ul id="list-page-btn-link" className={cx("nav-list")}>
                            <li id="Home-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/">
                                    BXH
                                </Link>
                            </li>
                            <li id="Theme-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/theme">
                                    Chủ đề
                                </Link>
                            </li>
                            <li id="Singer-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/singer">
                                    Nghệ sĩ
                                </Link>
                            </li>
                            <li id="Library-page-btn-link" className={cx("nav-item")}>
                                <Link className={cx("nav-link")} to="/library">
                                    Thư viện
                                </Link>
                            </li>
                        </ul>
                        <div className={cx("nav-search-btn-1023")}>
                            <div className={cx("nav-search")}>
                                <form
                                    className={cx("nav-search-form")}
                                    onSubmit={(e) => search(e)}
                                    action="/"
                                    method="GET"
                                >
                                    <button
                                        title="nav-search-btn"
                                        className={cx("nav-search-btn")}
                                        type="submit"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                    <input
                                        type="search"
                                        name="search"
                                        className={cx("nav-search-input")}
                                        placeholder="Tìm kiếm"
                                        spellCheck={false}
                                    />
                                </form>
                                {listMusic && (
                                    <ul className={cx("nav-listMusic")} id="nav-listMusic">
                                        {!listMusic.error &&
                                            listMusic.map((itemMusic, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={cx("nav-itemMusic")}
                                                        onClick={(e) =>
                                                            playMusicSearch(e.target, itemMusic)
                                                        }
                                                        id={itemMusic.musicId}
                                                    >
                                                        <img src={itemMusic.musicImg} alt="" />
                                                        <div className={cx("item-music-info")}>
                                                            <h4 className={cx("item-music-name")}>
                                                                {itemMusic.musicName}
                                                            </h4>
                                                            <h4 className={cx("item-music-singer")}>
                                                                {itemMusic.singerName}
                                                            </h4>
                                                        </div>
                                                        <div
                                                            id="item-music-option"
                                                            className={cx("item-music-option")}
                                                        >
                                                            <button
                                                                title="btn-option-file"
                                                                className={cx("item-music-option-btn")}
                                                            >
                                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                                            </button>
                                                            <ul className={cx("item-music-option-list")}>
                                                                <li
                                                                    id={itemMusic.musicId}
                                                                    className={cx("item-music-option-item")}
                                                                    onClick={(e) => downloadMusic(e.target)}
                                                                >
                                                                    <i className="fa-solid fa-download"></i>
                                                                    Tải về máy
                                                                </li>
                                                                {checkAddLibrary(itemMusic.musicId)}
                                                            </ul>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        {listMusic.error && (
                                            <li className={cx("nav-itemMusic")}>
                                                <p className={cx("nav-itemMusic-error")}>
                                                    {listMusic.error}
                                                </p>
                                            </li>
                                        )}
                                        {onSearch()}
                                    </ul>
                                )}
                            </div>
                            <div className={cx("nav-admin")}>
                                <Link title="uploads" to="/uploads">
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                </Link>
                            </div>
                            <div className={cx("nav-user")}>
                                <button className={cx("nav-user-login")}>Đăng nhập</button>
                            </div>
                        </div>
                    </Fragment>
                )}
                {
                    isMobile && (
                    <Fragment>
                        <div className={cx("nav-mouth-search")}>
                            <button className={cx("nav-mouth-search-btn")}
                                data='open'
                                onClick={(e) => mouthSearchBtn(e.target)}
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </div>
                        <div id="nav-mouth-search-btn-mobile" className={cx('nav-mouth-search-btn-mobile')}>
                            <ul id="list-page-btn-link" className={cx("nav-list")}>
                                <li id="Home-page-btn-link" className={cx("nav-item")}>
                                    <Link className={cx("nav-link")} to="/">
                                        BXH
                                    </Link>
                                </li>
                                <li id="Theme-page-btn-link" className={cx("nav-item")}>
                                    <Link className={cx("nav-link")} to="/theme">
                                        Chủ đề
                                    </Link>
                                </li>
                                <li id="Singer-page-btn-link" className={cx("nav-item")}>
                                    <Link className={cx("nav-link")} to="/singer">
                                        Nghệ sĩ
                                    </Link>
                                </li>
                                <li id="Library-page-btn-link" className={cx("nav-item")}>
                                    <Link className={cx("nav-link")} to="/library">
                                        Thư viện
                                    </Link>
                                </li>
                            </ul>
                            <div className={cx("nav-search-btn-1023")}>
                                <div className={cx("nav-search")}>
                                    <form
                                        className={cx("nav-search-form")}
                                        onSubmit={(e) => search(e)}
                                        action="/"
                                        method="GET"
                                    >
                                        <button
                                            title="nav-search-btn"
                                            className={cx("nav-search-btn")}
                                            type="submit"
                                        >
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </button>
                                        <input
                                            type="search"
                                            name="search"
                                            className={cx("nav-search-input")}
                                            placeholder="Tìm kiếm"
                                            spellCheck={false}
                                        />
                                    </form>
                                    {listMusic && (
                                        <ul className={cx("nav-listMusic")} id="nav-listMusic">
                                            {!listMusic.error &&
                                                listMusic.map((itemMusic, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            className={cx("nav-itemMusic")}
                                                            onClick={(e) =>
                                                                playMusicSearch(e.target, itemMusic)
                                                            }
                                                            id={itemMusic.musicId}
                                                        >
                                                            <img src={itemMusic.musicImg} alt="" />
                                                            <div className={cx("item-music-info")}>
                                                                <h4 className={cx("item-music-name")}>
                                                                    {itemMusic.musicName}
                                                                </h4>
                                                                <h4 className={cx("item-music-singer")}>
                                                                    {itemMusic.singerName}
                                                                </h4>
                                                            </div>
                                                            <div
                                                                id="item-music-option"
                                                                className={cx("item-music-option")}
                                                            >
                                                                <button
                                                                    title="btn-option-file"
                                                                    className={cx("item-music-option-btn")}
                                                                >
                                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                                </button>
                                                                <ul className={cx("item-music-option-list")}>
                                                                    <li
                                                                        id={itemMusic.musicId}
                                                                        className={cx("item-music-option-item")}
                                                                        onClick={(e) => downloadMusic(e.target)}
                                                                    >
                                                                        <i className="fa-solid fa-download"></i>
                                                                        Tải về máy
                                                                    </li>
                                                                    {checkAddLibrary(itemMusic.musicId)}
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            {listMusic.error && (
                                                <li className={cx("nav-itemMusic")}>
                                                    <p className={cx("nav-itemMusic-error")}>
                                                        {listMusic.error}
                                                    </p>
                                                </li>
                                            )}
                                            {onSearch()}
                                        </ul>
                                    )}
                                </div>
                                <div className={cx('nav-mobile-btn')}>
                                    <div className={cx("nav-admin")}>
                                        <Link title="uploads" to="/uploads">
                                            <i className="fa-solid fa-cloud-arrow-up"></i>
                                        </Link>
                                    </div>
                                    <div className={cx("nav-user")}>
                                        <button className={cx("nav-user-login")}>Đăng nhập</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </nav>
        </header>
    );
}

export default Header;
