import React, {Component, PureComponent} from 'react';
import {FaIcon} from "../fa-icon/Fa-Icon";
import "./modal.scss";

const mapList = {
    success: ['check-circle', '#6ac044'],
    error: ['times-circle', '#f36d6e'],
    info: ['info-circle', '#46a0fc'],
    warn: ['exclamation-circle', '#e5a146']
};

export class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _show: false,
        }
    }

    _renderHead(title, type) {
        return (
            <header>
                <div style={{display: 'inline-block'}}>
                    <FaIcon icon={mapList[type][0]} color={mapList[type][1]} fontSize='18px'/>
                </div>
                <span style={{verticalAlign: 'top', marginLeft: '14px'}}>{title}</span>
            </header>
        )
    }

    _clickHandle(e) {
        const target = e.target;
        if (target.title == 'cancel') {
            this.props.onCancel();
        } else {
            this.props.onSure();
        }
        this.props.removeRootElement('confirm');
    }

    render() {
        const {title, content, type = 'question', musk = true} = this.props;
        return (
            <div>
                {musk ? <div className="dc-modal_musk"></div> : ''}
                <article className="dc-modal__content dc-confirm_content">
                    {title ? this._renderHead(title, type) : ''}
                    <div className="dc-confirm__text">
                        {content}
                    </div>
                    <footer className="dc-modal__footer" onClick={this._clickHandle.bind(this)}>
                        {type == "question" ? <span className="dc-modal-btn" title="cancel">关闭</span> : ''}
                        <span className="dc-modal-btn dc-modal_sure" title="sure">确定</span>
                    </footer>
                </article>
            </div>
        )
    }
}

