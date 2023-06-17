import { useMediaQuery } from "react-responsive";
import classNames from "classnames/bind";
import styles from './Footer.module.scss';
import { Fragment } from "react";

const cx = classNames.bind(styles);

function Footer() {

    const isMobile = useMediaQuery({ query: "(max-width: 739px)" });

    return (
        <footer className={cx('wrapper')}>
            {console.log('Footer')}
            <div className={cx('content')}>
                {
                    !isMobile &&
                    <Fragment>
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
                    </Fragment>
                }
                {
                    isMobile &&
                    <Fragment>
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
                            <div className={cx('heading')}>
                                <p>
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                    Warning: Sản phẩm được tạo ra với mục đích học tập. Không sử dụng vào mục đích kiếm tiền, lừa đảo...
                                </p>
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        </footer>
    )
}

export default Footer;
