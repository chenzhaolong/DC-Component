/**
 *  Button Component
 * */
import React, {Component} from 'react';
import Icon from '../Icon/index';
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
        const defaultClassList = ['dc-btn'];
        if (this.state.type.indexOf(this.props.type) != -1) defaultClassList.push(`dc-btn-${this.props.type}`);
        if (this.props.className) defaultClassList.push(this.props.className);
        if (this.props.disabled) defaultClassList.push('dc-btn-disabled');
        return defaultClassList.join(" ");
    }

    _defaultIconClass() {
        const defaultIconClassList = ['dc-icon'];
        if (this.props.icon == 'loading') {
            defaultIconClassList.push('dc-btn-loading');
        }
        return defaultIconClassList.join(" ");
    }

    _defaultBtnContent() {
        if (this.props.children) {
            return this.props.children;
        } else if (this.props.loading) {
            return <img
                src={Icon['loading']}
                className="dc-btn-loading dc-btn_loading"/>
        } else {
            return ;
        }
    }

    render() {
        return(
                <button
                    className={this._defaultClass()}
                    onClick={this._clickEventHandle.bind(this)}
                    disabled={this.props.disabled}
                >
                    {
                        this.props.icon && !this.props.loading ?
                            <img
                            src={Icon[this.props.icon]}
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