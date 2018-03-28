import React, {Component} from 'react';
import {MenuItem} from "./MenuItem";
import {SubGroup} from "./SubGroup";
import './menu.css';

export class Menu extends Component{
    constructor(props) {
        super(props);
        this._ItemClickEvent = this._ItemClickEvent.bind(this);
        this._ItemMouseEnterEvent = this._ItemMouseEnterEvent.bind(this);
        this._ItemMouseLeaveEvent = this._ItemMouseLeaveEvent.bind(this);
    }

    static createItem() {
        return MenuItem;
    }

    static createSubGroup() {
        return SubGroup;
    }

    // 渲染组件
    _renderMenuItemList() {
        return React.Children.map(this.props.children, child => {
            return (
                <div
                    onClick={this._ItemClickEvent}
                    onMouseEnter={this._ItemMouseEnterEvent}
                    onMouseLeave={this._ItemMouseLeaveEvent}
                >
                    {child}
                </div>
            )
        })
    }

    // Item的点击事件
    _ItemClickEvent(e) {
        console.log(e);
    }

    // Item的鼠标事件
    _ItemMouseEnterEvent(e) {
       const {activeColor = '#e7f7ff', activeClass} = this.props;
       const _ele = e.target;
       if (activeClass) {
           if (!_ele.classList.contains(activeClass)) {
               _ele.classList.add(activeClass);
           }
       } else {
           _ele.style.backgroundColor = activeColor;
       }
    }

    _ItemMouseLeaveEvent(e) {
        const {bgColor = '#fff', activeClass} = this.props;
        const _ele = e.target;
        if (activeClass) {
            _ele.classList.remove(activeClass);
        } else {
            _ele.style.backgroundColor = bgColor;
        }
    }

    // 匹配order值
    _matchOrder() {
        const {activeClass, activeColor, defaultOrder} = this.props;
        const ItemCollection = document.getElementsByClassName('dc-menu-item');
        let key;
        for (let i = 0; i < ItemCollection.length; i++) {
            key = ItemCollection[i].dataset.key;
            if (key === defaultOrder) {
                if (activeClass) {
                    ItemCollection[i].classList.add(activeClass);
                } else {
                    ItemCollection[i].style.backgroundColor = activeColor;
                }
            }
        }
    }

    componentDidMount() {
        this._matchOrder();
    }

    render() {
        const {className, bgColor = '#fff'} = this.props;
        const rootClass = ['dc-menu', className];
        return (
            <div className={rootClass.join(' ')} style={{backgroundColor: bgColor}} >
                {this._renderMenuItemList()}
            </div>
        )
    }
}

