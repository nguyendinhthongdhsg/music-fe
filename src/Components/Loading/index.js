import classNames from "classnames/bind";
import style from './Loading.module.scss';

const cx = classNames.bind(style);

function Loading() {

    return(
        <div id="loading" className={cx('wrapper')}>
            {console.log('Loading')}
            <div className={cx('content')}>
                <div className={cx('loader')}></div>
            </div>
        </div>
    )
}

export default Loading;

