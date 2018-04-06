import React, {Component} from 'react';
import {MenuItem} from "./MenuItem";
import {SubGroup} from "./SubGroup";
import './menu.css';

export class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _activeOrder : this.props.defaultOrder || ''
        };
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
                    data-parent="parent"
                >
                    {child}
                </div>
            )
        })
    }

    // Item的点击事件
    _ItemClickEvent(e) {
        const {bgColor = '#fff', activeColor = '#fff', activeClass} = this.props;
        const _ele = e.currentTarget;
        // item 或者subGroup组件
        const _targetEle = this._findChildrenNode(_ele);
        if (this._judgeCurrentItemDisabled(_targetEle)) {
            return false;
        }
        // 添加样式
        if (activeClass) {
            _ele.classList.add(activeClass);
        } else {
            _ele.style.backgroundColor = activeColor;
        }
        // 路由跳转;
        this._changeRoute(_targetEle);
        // 删除其他元素激活样式
        const order = _targetEle.dataset.key;
        const children = _ele.parentNode.children;
        let itemNode;
        for (let i = 0; i < children.length; i++) {
            itemNode = this._findChildrenNode(children[i]);
            if (itemNode.dataset.key !== order) {
                if (activeClass) {
                    children[i].classList.remove(activeClass);
                } else {
                    children[i].style.backgroundColor = bgColor;
                }
            }
        }
        this.setState({_activeOrder: order}, () => {
            this.props.onchange(this.state._activeOrder);
        });
    }

    // Item的鼠标事件
    _ItemMouseEnterEvent(e) {
        const {activeColor = '#fff', activeClass, trigger = 'hover'} = this.props;
        const _ele = e.currentTarget;
        const _targetEle = this._findChildrenNode(_ele);
        if (this._judgeCurrentItemDisabled(_targetEle)) {
            return false;
        }
        if (_targetEle.dataset.key === this.state._activeOrder || trigger === 'click') {
            return false;
        }
        if (activeClass) {
            if (!_ele.classList.contains(activeClass)) {
                _ele.classList.add(activeClass);
            }
        } else {
            _ele.style.backgroundColor = activeColor;
        }
    }

    _ItemMouseLeaveEvent(e) {
        const {bgColor = '#fff', activeClass, trigger = 'hover'} = this.props;
        const _ele = e.currentTarget;
        const _targetEle = this._findChildrenNode(_ele);
        if (this._judgeCurrentItemDisabled(_targetEle)) {
            return false;
        }
        if (_targetEle.dataset.key === this.state._activeOrder || trigger === 'click') {
            return false;
        }
        if (activeClass) {
            _ele.classList.remove(activeClass);
        } else {
            _ele.style.backgroundColor = bgColor;
        }
    }

    // 寻找父组件中指定组件
    _findChildrenNode(parent, className = 'dc-menu-item') {
       let target = parent.firstChild;
       while(!target.classList.contains(className)) {
           target = target.firstChild;
       }
       return target;
    }

    // 寻找子元素的指定父元素
    _findParentNode(child, key = 'parent') {
        let target = child.parentNode;
        let arr = Object.keys(target.dataset);
        while(arr.indexOf(key) === -1) {
            target = target.parentNode;
            arr = Object.keys(target.dataset);
        }
        return target;
    }

    // 路由跳转
    _changeRoute(ele) {
        const {href} = ele.dataset;
        if (href) {
            window.location.href = href;
        }
    }

    // 是否改item是否被禁止
    _judgeCurrentItemDisabled(ele) {
        const {disabled} = ele.dataset;
        return disabled === 'true';
    }

    // 匹配order值
    _matchOrder() {
        const {activeClass, activeColor} = this.props;
        const ItemCollection = document.getElementsByClassName('dc-menu-item');
        let key, target;
        for (let i = 0; i < ItemCollection.length; i++) {
            key = ItemCollection[i].dataset.key;
            if (key === this.state._activeOrder) {
                target = this._findParentNode(ItemCollection[i]);
                if (activeClass) {
                    target.classList.add(activeClass);
                } else {
                    target.style.backgroundColor = activeColor;
                }
            }
        }
    }

    // 禁止样式
    _disableStyle() {
        const ItemCollection = document.getElementsByClassName('dc-menu-item');
        let target;
        for (let i = 0; i < ItemCollection.length; i++) {
            if (this._judgeCurrentItemDisabled(ItemCollection[i])) {
                target = this._findParentNode(ItemCollection[i]);
                target.classList.add('dc-menu-item_disabled');
            }
        }
    }

    componentDidMount() {
        this._matchOrder();
        this._disableStyle();
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

