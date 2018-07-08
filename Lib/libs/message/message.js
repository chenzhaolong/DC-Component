import React, {Component} from 'react';
import './message.css';
import {_renderComponent, removeRootElement} from '../modal/tool';

export function Message(spec) {
    const messageId = () => {
        return 'dc-message-' + Math.round(Math.random()*100);
    };
    spec.id = messageId();
    const renderMessage = _renderComponent('div', spec.id);
    return renderMessage(BaseMessage, spec);
}

class BaseMessage extends Component {
    constructor(props) {
        super(props);
        this._remove = this._remove.bind(this);
    }

    _iconLib() {
        return {
            // success: require('../../../src/images/message/success.png'),
            // error: require('../../../src/images/message/error.png'),
            // info: require('../../../src/images/message/info.png'),
            // warning: require('../../../src/images/message/warning.png')
        }
    }

    _iconType() {
        const { type = 'info' } = this.props;
        return this._iconLib()[type];
    }

    _remove() {
        const message = this.refs.dcMessage;
        message.classList.remove('dc-message_appear');
        message.classList.add('dc-message_disappear');
        this.props.onClose && this.props.onClose();
        setTimeout(() => {
            removeRootElement(this.props.id);
        }, 100);
    }

    componentDidMount() {
        const {durling = 3000} = this.props;
        setTimeout(this._remove, durling);
    }

    componentWillUnmount() {
        clearTimeout(this._remove);
    }

    render() {
        const typeSrc = this._iconType();
        return (
            <div className='dc-message_position dc-message_appear' ref='dcMessage'>
                <div className='dc-message_size'>
                    <span>
                        <img src={typeSrc} className='dc-message-img'/>
                    </span>
                    <span className='dc-message-content'>{this.props.message}</span>
                </div>
            </div>
        )
    }
}