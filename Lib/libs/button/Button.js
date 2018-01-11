/**
 *  Button Component
 * */
import React, {Component, PropTypes} from 'react';
import './button.css'

export class Button extends Component {
    static propTypes:  {
        type: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            type: ['default', 'primary', 'dashed', 'danger']
        }
    }
    _clickEventHandle(e) {
        this.props.onClick();
    }
    render() {
        const typeStyle = this.state.type.indexOf(this.props.type) != -1 ? `dc-btn-${this.props.type}` : '';
        return(
                <button
                    className={typeStyle + ' ' + 'dc-btn' + ' ' + this.props.className}
                    onClick={this._clickEventHandle.bind(this)}
                >
                    {
                        this.props.children
                    }
                </button>
        )
    }
}