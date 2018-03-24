import React, {Component} from 'react';
import {MenuItem} from "./MenuItem";
import {SubGroup} from "./SubGroup";
import './menu.css';

export class Menu extends Component{
    static createItem() {
        return MenuItem;
    }

    static createSubGroup() {
        return SubGroup;
    }

    render() {
        const {className, bgColor} = this.props;
        const rootClass = ['dc-menu', className];
        const rootBgColor = bgColor && {backgroundColor: bgColor};
        return (
            <div className={rootClass.join(' ')} style={rootBgColor} >
                {this.props.children}
            </div>
        )
    }
}

