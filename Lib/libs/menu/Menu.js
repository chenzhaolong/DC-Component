import React, {Component, PureComponent} from 'react';

import {Icon} from "../Icon";
import './menu.css';
import PropTypes from "prop-types";

let _parentProperty = {};

export class Menu extends Component{
    constructor(props) {
        super(props);
        _parentProperty = Object.assign({}, props);
        this.state = {
            _activeOrder : this.props.defaultOrder || '',
        };
    }

    static createItem() {
        return MenuItem;
    }

    static createSubGroup() {
        return SubGroup;
    }

    // 路由跳转
    _changeRoute(ele) {
        const {href} = ele.dataset;
        const {origin} = location;
        if (this.props.openRoute && href) {
            let withoutHost = ['http', 'https'].every(item => {
                return href.indexOf(item) === -1;
            });
            window.location.href = withoutHost ? `${origin}${href}` : href;
        }
    }

    // 集中监听子组件点击事件
    _focusListenItemClick() {
        let collection = document.getElementsByClassName('dc-menu-item');
        let childArr = [];
        for (let i = 0; i < collection.length; i++) {
            childArr.push(collection[i]);
        }
        const handleItemForClick = (e, arr) => {
            this._setItemStyle(e);
            this._removeItemStyle(e.dataset.key, arr);
        };
        childArr.forEach((child, index, arr) => {
            child.addEventListener('click', (e) => {
                handleItemForClick(e.currentTarget, arr);
            })
        })
    }

    // 设置item点击时的样式
    _setItemStyle(e) {
        if (e.dataset.key === this.state._activeOrder) {
            return false;
        }
        if (e.dataset.disabled === 'true') {
            return false;
        }
        const {activeClass, activeColor = '#fff', activeTxtColor = '#fff'} = this.props;
        this.props.onChange(e.dataset.key);
        this._changeRoute(e);
        this.setState({_activeOrder: e.dataset.key}, () => {
            if (activeClass) {
                e.classList.add(activeClass);
            } else {
                e.style.backgroundColor = activeColor;
                e.style.color = activeTxtColor;
            }
        });
    }

    // 删除样式
    _removeItemStyle(index, arr) {
        const {bgColor = '#fff', activeClass} = this.props;
        let i = this._changeIndex(index);
        if (arr[i - 1].dataset.disabled === 'true') {
            return false;
        }
        let removeArr = arr.filter(item => {
            return item.dataset.key !== index + '';
        });
        removeArr.forEach(item => {
            if (activeClass) {
                item.classList.remove(activeClass);
            } else {
                item.style.backgroundColor = bgColor;
                item.style.color = '#000';
            }
        });
    }

    // 转换index
    _changeIndex(num) {
        let units = ['.', '-'], key;
        let hasUnits = units.some((val, index) => {
            if (num.indexOf(val) !== -1) {
                key = index;
                return true;
            } else {
                return false;
            }
        });
        if (hasUnits) {
            let val = units[key];
            let unit = num.split(val);
            return unit.reduce((sum, next) => {return sum + parseFloat(next)}, 0);
        } else {
            return num;
        }
    }

    // 设置Menu宽度
    _setMenuWidth() {
        const {width} = this.props;
        if (width) {
            this.refs.menu.style.width = width.indexOf('px') !== -1 ? width : width + 'px';
        }
    }

    componentDidMount() {
        this._focusListenItemClick();
        this._setMenuWidth();
    }

    componentWillUpdate(nextProps, nextState) {
        _parentProperty = Object.assign({}, _parentProperty, {defaultOrder: nextState._activeOrder});
    }

    componentWillReceiveProps(nextProps, oldProps) {
        _parentProperty = Object.assign({}, nextProps);
    }

    render() {
        const {className, bgColor = '#fff'} = this.props;
        const rootClass = ['dc-menu', className];
        return (
            <div className={rootClass.join(' ')} style={{backgroundColor: bgColor}} ref='menu'>
                {this.props.children}
            </div>
        )
    }
}

class MenuItem extends Component{
    constructor(props) {
        super(props);
        this._ItemMouseEnterEvent = this._ItemMouseEnterEvent.bind(this);
        this._ItemMouseLeaveEvent = this._ItemMouseLeaveEvent.bind(this);
    }

    // 添加Item的样式
    _setItemStyle(ele) {
        const {activeColor = '#fff', activeClass, activeTxtColor = '#fff'} = _parentProperty;
        if (activeClass) {
            ele.classList.add(activeClass);
        } else {
            ele.style.backgroundColor = activeColor;
            ele.style.color = activeTxtColor;
        }
    }

    // 删除Item样式
    _removeItemStyle(ele) {
        const {bgColor = '#fff', activeClass} = _parentProperty;
        if (activeClass) {
            ele.classList.remove(activeClass);
        } else {
            ele.style.backgroundColor = bgColor;
            ele.style.color = '#000';
        }
    }

    // 匹配order值
    _matchOrder() {
        const {defaultOrder} = _parentProperty;
        if (defaultOrder === this.props.order) {
            this._setItemStyle(this.refs.item);
        }
    }

    // Item的鼠标事件
    _ItemMouseEnterEvent(e) {
        const {trigger = 'hover', defaultOrder} = _parentProperty;
        if (this.props.disabled) {
            return false;
        }
        if (this.props.order === defaultOrder || trigger === 'click') {
            return false;
        }
        this._setItemStyle(e.currentTarget);
    }

    _ItemMouseLeaveEvent(e) {
        const {trigger = 'hover', defaultOrder, bgColor = '#fff', activeClass} = _parentProperty;
        if (this.props.disabled) {
            return false;
        }
        if (this.props.order === defaultOrder || trigger === 'click') {
            return false;
        }
        this._removeItemStyle(e.currentTarget);
    }

    // 禁止样式
    _disableStyle() {
        if (this.props.disabled) {
            this.refs.item.classList.add('dc-menu-item_disabled');
        }
    }

    // 计算subItem时的marginLeft
    _computedSubItemMargin() {
        let order = this.props.order;
        let units = ['.', '-'], key;
        let hasUnits = units.some((val, index) => {
            if (order.indexOf(val) !== -1) {
                key = index;
                return true;
            } else {
                return false;
            }
        });
        if (hasUnits) {
            let val = units[key];
            const l = order.split(val).length;
            this.refs.item.style.paddingLeft = `${40 + (l - 1) * 20}px`;
        }
    }

    componentDidMount() {
        this._matchOrder();
        this._disableStyle();
        this._computedSubItemMargin();
    }

    render() {
        const {children, order, className, disabled, route, icon} = this.props;
        const rootClass = ['dc-menu-item', className];
        return (
            <div
                data-key={order}
                data-disabled={disabled}
                data-href={route}
                className={rootClass.join(' ')}
                ref='item'
                onMouseLeave={this._ItemMouseLeaveEvent}
                onMouseEnter={this._ItemMouseEnterEvent}
            >
                {children}
            </div>
        )
    }
}

class SubGroup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isClick: false
        };
        this._hideSubItem = this._hideSubItem.bind(this);
    }

    // 计算subItem时的marginLeft
    _computedSubItemMargin() {
        let order = this.props.order;
        let units = ['.', '-'], key;
        let hasUnits = units.some((val, index) => {
            if (order.indexOf(val) !== -1) {
                key = index;
                return true;
            } else {
                return false;
            }
        });
        if (hasUnits) {
            let val = units[key];
            const l = order.split(val).length;
            this.refs.group.style.paddingLeft = `${40 + (l - 1) * 20}px`;
        }
    }

    _hideSubItem(e) {
        let isClick = this.state.isClick;
        this.setState({isClick: !isClick}, () => {
            if (this.state.isClick) {
                this.refs.groupItems.classList.remove('dc-menu-group_hide');
                this.refs.groupItems.classList.add('dc-menu-group_show');
                this.refs.arrow.style.transform = 'rotate(180deg)'
            } else {
                this.refs.groupItems.classList.add('dc-menu-group_hide');
                this.refs.groupItems.classList.remove('dc-menu-group_show');
                this.refs.arrow.style.transform = 'rotate(0deg)'
            }
        })
    }

    componentDidMount() {
        this._computedSubItemMargin();
    }

    render() {
        const {children, label, className, order} = this.props;
        const rootClass = ['dc-menu-item', 'dc-menu-group', className];
        return (
            <div>
                <div
                    className={rootClass.join(" ")}
                    data-key={order}
                    ref='group'
                    onClick={this._hideSubItem}
                >
                    {label}
                   <div  ref='arrow' className='de-menu-arrow'>
                       <Icon type='down' width='20px' height='20px'/>
                   </div>
                </div>
                <div ref='groupItems' className='dc-menu-group_hide'>
                    {children}
                </div>
            </div>
        )
    }
}