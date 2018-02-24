/**
 *  Button Component
 * */
import React, {Component} from 'react';
import {IconLib} from '../Icon/index';
import './button.css';
import '../Icon/icon.css';
import PropTypes from 'prop-types';

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: ['default', 'primary', 'dashed', 'danger']
        }
    }

    _clickEventHandle(e) {
        this.props.onClick();
    }

    _defaultClass() {
        const defaultClassList = ['dc-btn-hover', 'dc-btn'];
        if (this.state.type.indexOf(this.props.type) != -1) defaultClassList.push(`dc-btn-${this.props.type}`);
        if (this.props.className) defaultClassList.push(this.props.className);
        if (this.props.disabled) {
            defaultClassList.shift();
            defaultClassList.push('dc-btn-disabled');
        }
        return defaultClassList.join(" ");
    }

    _defaultIconClass() {
        const defaultIconClassList = ['dc-icon'];
        if (this.props.icon == 'loading') {
            defaultIconClassList.push('dc-btn-breadcrumb');
        }
        return defaultIconClassList.join(" ");
    }

    _defaultBtnContent() {
        if (this.props.children) {
            return this.props.children;
        } else if (this.props.loading) {
            return <img
                src={IconLib['loading']}
                className="dc-btn-loading dc-btn_loading"/>
        } else {
            return ;
        }
    }

    _processPendingOuterProps(outerProperty) {
        if (outerProperty.length <= 0) return;
        let btn = this.refs.btn;
        outerProperty.forEach(key => {
            btn.setAttribute(key, this.props[key]);
        })
    }

    _processPendingOuterFunc(outerFunc) {
        if (outerFunc.length <= 0) return;
        outerFunc.forEach(func => {
            this.props[func]();
        })
    }

    _outerPropertyComeComponent() {
        let outerProperty = [];
        let outerFunc = [];
        const whiteList = ['type', 'className', 'onClick', 'disabled', 'icon', 'children'];
        Object.keys(this.props).forEach(key => {
            if (whiteList.indexOf(key) == -1) {
                if (typeof this.props[key] == 'function') {
                    outerFunc.push(key);
                } else {
                    outerProperty.push(key);
                }
            }
        });
        this._processPendingOuterProps(outerProperty);
        this._processPendingOuterFunc(outerFunc);
    }

    componentDidMount() {
        this._outerPropertyComeComponent();
    }

    render() {
        return(
                <button
                    className={this._defaultClass()}
                    onClick={this._clickEventHandle.bind(this)}
                    disabled={this.props.disabled}
                    ref="btn"
                >
                    {
                        this.props.icon && !this.props.loading ?
                            <img
                            src={IconLib[this.props.icon]}
                            className={this._defaultIconClass()}/> : ''
                    }
                    <span>
                        {
                            this._defaultBtnContent()
                        }
                    </span>
                </button>
        )
    }
}

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
}