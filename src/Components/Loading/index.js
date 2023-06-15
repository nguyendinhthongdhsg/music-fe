import classNames from "classnames/bind";
import style from './Loading.module.scss';

const cx = classNames.bind(style);

function Loading() {

    return(
        <div id="loading" className={cx('wrapper')}>
            {console.log('Loading')}
            <div className={cx('content')}>
                <div className={cx("loading")}>
                    <div className={cx("loading-text")}>
                        <span className={cx("loading-text-words")}>L</span>
                        <span className={cx("loading-text-words")}>O</span>
                        <span className={cx("loading-text-words")}>A</span>
                        <span className={cx("loading-text-words")}>D</span>
                        <span className={cx("loading-text-words")}>I</span>
                        <span className={cx("loading-text-words")}>N</span>
                        <span className={cx("loading-text-words")}>G</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading;

