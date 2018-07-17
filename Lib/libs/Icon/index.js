import React, {Component, PureComponent} from 'react';
import {IconLib} from "./IconLib";

export class Icon extends Component {
    defaultClass() {
        let defalutClass = ['dc-icon__img'];
        if (this.props.type == 'circle-loading' && this.props.circle) defalutClass.push('dc-icon_loading');
        if (this.props.className) {
            defalutClass.push(this.props.className);
        }
        return defalutClass.join(" ");
    }

    render() {
        const {type, width, height} = this.props;
        return (
            <div className={this.defaultClass()} style={{width, height}}>
                <img src={IconLib[type]}/>
            </div>
        )
    }
}