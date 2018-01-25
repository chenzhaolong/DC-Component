import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import "./modal.css";
import {Icon} from '../../libs/Icon/index';

export class Modal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible
        }
    }

    _closeModal(e) {
        this.setState({visible: false})
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

    _renderModal() {
        const {content, title, children} = this.props;
        const modalContent = children || content;
        return (
            <div>
                <div className="dc-modal-musk"></div>
                <div className="dc-modal-content">
                    {
                        title ? this._renderHeader(title): ''
                    }
                    <article className="dc-modal-body">
                        {modalContent}
                    </article>
                    <footer className="dc-modal-footer">
                        <span className="dc-modal-btn">关闭</span>
                        <span className="dc-modal-btn dc-modal-sure">确定</span>
                    </footer>
                </div>
            </div>
        )
    }

    render() {
        const {visible} = this.state;
        return (
            <div>
                {
                    visible ? this._renderModal() : ''
                }
            </div>
        )
    }
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired
}
