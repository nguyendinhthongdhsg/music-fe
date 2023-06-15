
import classNames from "classnames/bind";
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            {console.log('Footer')}
            <div className={cx('content')}>
                <div className={cx('contact')}>
                    <div className={cx('phone')}>
                        <a href="tel:0123456789">
                            <i className="fa-solid fa-phone communication__icon"></i>
                            : 0123456789
                        </a>
                    </div>
                    <div className={cx('email')}>
                        <a href="mailto:nguyendinhthongdhsg@gmail.com">
                        <i className="fa-solid fa-envelope communication__icon"></i>
                            : nguyendinhthong@gmail.com
                        </a>
                    </div>
                </div>
                <div className={cx('heading')}>
                    <p>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        Warning: Sản phẩm được tạo ra với mục đích học tập. Không sử dụng vào mục đích kiếm tiền, lừa đảo...
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
