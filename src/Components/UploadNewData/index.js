import classNames from "classnames/bind";
import style from './UploadNewData.module.scss';
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import URLAPI from '../../config/URLAPI';

const cx = classNames.bind(style);

function UploadNewData() {

    const [option, setOption] = useState('music');
    const isTabletOrMobile = useMediaQuery({
        query: "(max-width: 1023px) and (min-width: 740px)",
    });
    const isMobile = useMediaQuery({ query: "(max-width: 740px)" });

    function selectFileMusic(event) {
        const nameFileUpload = document.querySelector('#name-file-upload');
        nameFileUpload.innerText = event.value;
        nameFileUpload.style.color = 'var(--black-color)';
    }

    function uploadMusic(event) {
        event.preventDefault();
        const formInput = event.target;
        const listInputs = document.querySelectorAll('input');
        let checkInput = 0;
        for(const listInput of listInputs) {
            if(!listInput.value) {
                if(listInput.type === 'file') {
                    document.querySelector('#name-file-upload').style.color = 'red';
                } else {
                    validatorInput(listInput);
                }
                checkInput = checkInput + 1;
            }
        }
        if(checkInput === 0) {
            axios.post(URLAPI + '/listMusic/post', formInput, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then(res => res.data)
                .then(res =>  {
                    if(res.error)
                        messageUpload(res.error, 'var(--message-upload-false)', false);
                    else {
                        const inputs = document.querySelectorAll('input');
                        for(const input of inputs)
                            input.value = '';
                        messageUpload(res.message, 'var(--message-upload-done)', true);
                    }
                })
                .catch(() =>  messageUpload('Đăng bài hát thành công', 'rgb(236, 71, 71)', false))
        }
    }

    function uploadDocument(event) {
        event.preventDefault();
        const formInput = event.target;
        const listInputs = document.querySelectorAll('input');
        let checkInput = 0;
        for(const listInput of listInputs) {
            if(!listInput.value) {
                validatorInput(listInput);
                checkInput = checkInput + 1;
            }
        }
        if(checkInput === 0) {
            axios.post(URLAPI + event.target.id, formInput, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
                .then(res => res.data)
                .then(res =>  {
                    if(res.error)
                        messageUpload(res.error, 'var(--message-upload-false)', false);
                    else {
                        const inputs = document.querySelectorAll('input');
                        for(const input of inputs)
                            input.value = '';
                        messageUpload(res.message, 'var(--message-upload-done)', true);
                    }
                })
                .catch(() =>  messageUpload('Đăng thất bại', 'var(--message-upload-false)', false))
        }
    }

    function validatorInput(input) {
        if(!input.value) {
            input.style.borderColor = 'red';
            if(input.placeholder.search('Vui lòng nhập:')) {
                console.log(input.placeholder.search('Vui lòng nhập:'))
                input.placeholder = "Vui lòng nhập: " + input.placeholder;
            }
            input.style.setProperty('--placeholder-color', 'red');
        }
    }

    function unValidatorInput(input) {
        input.style.borderColor = 'var(--black-color)';
        input.style.setProperty('--placeholder-color', '#555');
    }

    function messageUpload(string, color, status) {
        const messageContent = document.querySelector('#message-upload-new-content');
        messageContent.innerHTML = `
            <p>
                ${status ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-xmark"></i>' }    
                ${string}
            </p>
        `
        messageContent.style.backgroundColor = color;
        messageContent.style.display = 'block';
        setTimeout(() => {
            messageContent.style.display = 'none';
        }, 3000);   
    }

    return (
        <main id="uploads" className={cx('wrapper')}>
            {console.log('Upload-New-Data')}
            <div className={cx('content')}>
                <h1 className={cx('content-heading')}>
                    Dashboard Upload New Content
                </h1>
                <nav className={cx('nav')}>
                    <ul className={cx('nav-list')}>
                        <li className={cx('nav-item-back', 'back')}>
                            <Link className={cx('nav-item-back-link')} to='/'>
                                <i className="fa-solid fa-arrow-left"></i>
                                Quay lại
                            </Link>
                        </li>
                        {
                            !isTabletOrMobile && !isMobile  &&
                            <Fragment>
                                <li id='music' onClick={(e) => setOption(e.target.id)} className={cx('nav-item', option === 'music' && 'active')}>Đăng bài hát</li>
                                <li id='singer' onClick={(e) => setOption(e.target.id)} className={cx('nav-item', option === 'singer' && 'active')}>Thêm nghệ sĩ</li>
                                <li id='genre' onClick={(e) => setOption(e.target.id)} className={cx('nav-item', option === 'genre' && 'active')}>Thêm thể loại</li>
                                <li id='national' onClick={(e) => setOption(e.target.id)} className={cx('nav-item', option === 'national' && 'active')}>Thêm quốc gia</li>
                            </Fragment>
                        }
                        {
                            (isTabletOrMobile || isMobile) && 
                            <div className={cx('nav-menu-list')}>
                                <button className={cx('nav-item-btn-show-list')}>
                                    <i className="fa-solid fa-bars"></i>
                                </button>
                            </div>
                        }
                    </ul>
                </nav>
                {
                    option === 'music' && 
                    <div className={cx('form-content')}>
                        <h3 className={cx('form-heading')}>Upload {option}</h3>
                        <form className={cx('form-upload')} id="form-upload" method='POST' 
                            action='/uploads' encType='multipart/form-data'
                            onSubmit={(e) => uploadMusic(e)}
                        >
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="musicName" placeholder="Tên bài hát"
                            />

                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="musicImg" placeholder="Link ảnh bài hát"
                            />

                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="singerName" placeholder="Tên ca sĩ"
                            />

                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="genre" placeholder="Thể loại"
                            />

                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="country" placeholder="Quốc gia"
                            />

                            <div className={cx('select-file-upload')}>
                                <label htmlFor="file-upload-music">
                                    Chọn tệp MP3
                                </label>
                                <span id="name-file-upload" className={cx('name-file-upload')}>
                                    Vui lòng chọn tệp
                                </span>
                            </div>
                            <input spellCheck={false} 
                                id="file-upload-music" name="file" 
                                type="file" placeholder="file"
                                onChange={(e) => selectFileMusic(e.target)} 
                            />
                            <button type="submit">
                                Tải lên
                            </button>
                        </form>
                    </div>
                }
                {
                    option === 'singer' && 
                    <div className={cx('form-content')}>
                        <h3 className={cx('form-heading')}>Upload {option}</h3>
                        <form className={cx('form-upload')} id='/singer/post' method='POST' 
                            action='/uploads' encType='multipart/form-data' 
                            onSubmit={(e) => uploadDocument(e)}
                        >
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="singer" placeholder="Tên nghệ sĩ"
                            />
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="singerImg" placeholder="Link ảnh nghệ sĩ"
                            />
                            <button type="submit">
                                Tải lên
                            </button>
                        </form>
                    </div>
                }
                {
                    option === 'genre' && 
                    <div className={cx('form-content')}>
                        <h3 className={cx('form-heading')}>Upload {option}</h3>
                        <form className={cx('form-upload')} id='/genre/post' method='POST' 
                            action='/uploads' encType='multipart/form-data' 
                            onSubmit={(e) => uploadDocument(e)}
                        >
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="genre" placeholder="Tên thể loại"
                            />
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="genreImg" placeholder="Link ảnh thể loại"
                            />
                            <button type="submit">
                                Tải lên
                            </button>
                        </form>
                    </div>
                }
                {
                    option === 'national' &&
                    <div className={cx('form-content')}>
                        <h3 className={cx('form-heading')}>Upload {option}</h3>
                        <form className={cx('form-upload')} id='/national/post' method='POST' 
                            action='/uploads' encType='multipart/form-data' 
                            onSubmit={(e) => uploadDocument(e)}
                        >
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="national" placeholder='Tên quốc gia'
                            />
                            <input spellCheck={false} 
                                onFocus={(e) => unValidatorInput(e.target)}
                                onBlur={(e) => validatorInput(e.target)}
                                name="nationalImg" placeholder='Link ảnh quốc kỳ'
                            />
                            <button type="submit">
                                Tải lên
                            </button>
                        </form>
                    </div>
                }
            </div>
            <div id="message-upload-new-content" className={cx('message-upload')}>
            </div>
        </main>
    )
}

export default  UploadNewData;
