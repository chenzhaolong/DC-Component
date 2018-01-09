/**
 *  Button Component
 * */
import React, {Component} from 'react';
import scss from './style/button.scss';

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: {
                default: 'default',
                primary: 'primary',
                dashed: 'dashed',
                danger: 'danger'
            }
        }
    }
    render() {
        const defaultClass = this.state.type[this.props.type] ? `dc-btn-${this.props.type}` : '';
        return(
            <div className={scss.style}>
                <button
                    className={'dc-btn' + ' ' + defaultClass}
                >
                    {
                        this.props.children
                    }
                </button>
            </div>
        )
    }
}
