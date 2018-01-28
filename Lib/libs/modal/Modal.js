import React, {Component, PureComponent} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import "./modal.css";
import {Icon} from '../../libs/Icon/index';
import {Confirm} from './confirm';
import {_renderComponent} from './tool';

export class Modal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _visible: false
        }
    }

    _closeModal(e) {
        this.setState({_visible: false})
    }

    _clickHandle(e) {
        const target = e.target;
        if (target.title == 'cancel') {
             this.props.onCancel();
        } else {
             this.props.onSure();
        }
    }

    _renderHeader(title) {
        return (
            <header
                className="dc-modal-header"
            >
                <div>{title}</div>
                <div className="dc-modal-icon" onClick={this._closeModal.bind(this)}>
                    <Icon type="close"/>
                </div>
            </header>
        )
    }

    _renderLoading() {
        return (
           <div>
                <span className="dc-modal-loading">
                <Icon type="circle-loading" circle width="14px" height="14px"/>
            </span>
               请等待
           </div>
        )
    }

    _renderModal() {
        const {content, title, children, text, musk = true} = this.props;
        const modalContent = children || content;
        return (
            <div>
                {musk ? <div className="dc-modal-musk"></div> : ''}
                <div className="dc-modal-content">
                    {
                        title ? this._renderHeader(title): ''
                    }
                    <article className="dc-modal-body">
                        {modalContent}
                    </article>
                    <footer className="dc-modal-footer" onClick={this._clickHandle.bind(this)}>
                        <span className="dc-modal-btn" title="cancel">
                            {text && text.cancel ? text.cancel : '关闭'}
                            </span>
                        <span className="dc-modal-btn dc-modal-sure" title="sure">
                            {this.props.confirmLoading ? this._renderLoading() : (text && text.sure ? text.sure : '确定')}
                        </span>
                    </footer>
                </div>
            </div>
        )
    }

    componentWillReceiveProps(newProps) {
        this.setState({_visible: newProps.visible});
    }

    render() {
        const {_visible} = this.state;
        return (
            <div>
                {
                    _visible ? this._renderModal() : ''
                }
            </div>
        )
    }

    static confirm(spec) {
        _renderComponent("div", "confirm")(Confirm, spec);
    }
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    content: function(props, propName, componentName) {
        if (!props[propName]) {
            throw new Error(
                `content is require in ${componentName}`
            );
        }
    },
    onCancel: PropTypes.func.isRequired,
    onSure: PropTypes.func.isRequired,
}