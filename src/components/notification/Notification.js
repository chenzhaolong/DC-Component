import React from 'react';
import './notification.scss';
import {FaIcon} from "../fa-icon/Fa-Icon";
import {_renderComponent, removeRootElement, createHoc, createRootElement, renderChild} from "../../../libs/tool";
import PS from '../../../libs/ps';

export class Notification extends React.Component {
    computedHight() {

    }

    closeNotifity() {
    }

    render() {
        const {title, message} = this.props;

        const rightTop = {top: '10px', right: '10px'};

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
        const style = 'position: fixed; width: 330px; height: 100%; top: 0; right: 0';
        const rootId = 'dc-notification';
        if (!document.getElementById(rootId)) {
            createRootElement('div', rootId, '', style);
        }
        const Hoc = createHoc(Notification, spec);
        renderChild(rootId, Hoc);
    }
}