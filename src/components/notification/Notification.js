import React from 'react';
import './notification.scss';
import {FaIcon} from "../fa-icon/Fa-Icon";
import {_renderComponent, removeRootElement, createHoc, createRootElement, renderChild} from "../../../libs/tool";
import PS from '../../../libs/ps';

const classNameForNofity = 'dc-notification';

export class Notification extends React.Component {
    constructor(props) {
        super(props);
    }

    computedHight() {
        const eleArr = document.getElementsByClassName(classNameForNofity);
        if (eleArr.length === 1) {
            return 10;
        } else {
            const index = eleArr.length - 2;
            const ele = eleArr[index].firstElementChild.firstElementChild;
            return ele.clientHeight + ele.offsetTop + 10;
        }
    }

    closeNotifity() {

    }

    render() {
        const {title, message} = this.props;

        const top = this.computedHight();

        const rightTop = {top: `${top}px`, right: '10px'};

        return (
            <div className='dc-notify' style={rightTop}  ref='notify'>

                <section className='dc-notify-body'>
                    <article className='dc-notify-head'>
                        <span className='dc-notify-title'>{title}</span>

                        <span className='dc-notify-close' onClick={this.closeNotifity.bind(this)}>
                                <FaIcon icon='times'/>
                            </span>
                    </article>

                    <article className='dc-notify-message'>
                        {message}
                    </article>
                </section>
            </div>
        )
    }

    /**
     *  生命周期
     */
    componentWillMount() {
    }

    componentDidMount() {
    }



    /**
     * 静态方法
     */
    static notify(spec) {
        _renderComponent('div', '', classNameForNofity)(Notification, spec);
    }
}