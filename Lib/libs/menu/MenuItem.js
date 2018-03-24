import React, {Component} from 'react';
import './menu.css';

export class MenuItem extends Component{
    render() {
        const {className} = this.props;
        const rootItemClass = ['dc-menu-item', className].join(' ');
        return (
            <div className={rootItemClass}>
                {this.props.children}
            </div>
        )
    }
}