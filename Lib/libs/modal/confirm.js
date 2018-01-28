import React, {Component, PureComponent} from 'react';
import {Icon} from '../../libs/Icon/index';
import "./modal.css";

export class Confirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _show: false,
        }
    }
    _renderHead(title, type) {
        return (
            <header>
                <Icon type={type} width="26px" height="26px"/>
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
                {musk ? <div className="dc-modal-musk"></div> : ''}
                <article className="dc-modal-content dc-confirm-content">
                    {title ? this._renderHead(title, type) : ''}
                    <div className="dc-confirm-text">
                        {content}
                    </div>
                    <footer className="dc-modal-footer" onClick={this._clickHandle.bind(this)}>
                        {type == "question" ? <span className="dc-modal-btn" title="cancel">关闭</span> : ''}
                        <span className="dc-modal-btn dc-modal-sure" title="sure">确定</span>
                    </footer>
                </article>
            </div>
        )
    }
}

