/**
 *  Button Component
 * */
import React, {Component} from 'react';
import {factoryStyle} from "../../sass/index";
import {btnStyle} from '../../sass/button';

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: {
                default: 'default',
                primary: 'primary',
                dashed: 'dashed',
                danger: 'danger'
            },
            defaultBtnStyle: btnStyle
        }
    }
    render() {
        const defaultStyle = factoryStyle({style: this.state.defaultBtnStyle});
        return(
            <div>
                <button

                >
                    {
                        this.props.children
                    }
                </button>
            </div>
        )
    }
}
