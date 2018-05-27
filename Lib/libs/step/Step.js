import React, {Component} from 'react';
import {Icon} from '../Icon';
import './step.css';

export class Steps extends Component {
    constructor(props) {
        super(props);
    }

    static createStep() {
        return Step;
    }

    _renderChildren() {
        const {children} = this.props;
        let _nodeNameList = React.Children.map(children, child => child.props.nodeName);
        return React.Children.map(children, child => {
            const props = {...child.props, ...this.props, nodeList: _nodeNameList};
            return <Step {...props}/>
        });
    }

    _complete(open = true) {
        const {curStatus, curNodeName, statusMap = {success: []}, onComplete, children} = this.props;
        let _nodeNameList = React.Children.map(children, child => child.props.nodeName);
        let index = _nodeNameList.indexOf(curNodeName) + 1;
        if (index === _nodeNameList.length && statusMap.success.indexOf(curStatus) !== -1) {
            open && onComplete();
            return true;
        } else {
            return false;
        }
    }

    _stepEffect() {
        const {
            curStatus,
            curNodeName,
            arriveSomeStep = {nodeName: '', effect: ''}
        } = this.props;
        if (curNodeName === arriveSomeStep.nodeName && !this._complete(false)) {
            arriveSomeStep.effect && arriveSomeStep.effect(curStatus);
        }
    }

    _changeStep() {
        const {curStatus, curNodeName, changeStep} = this.props;
        changeStep && !this._complete(false) && changeStep(curStatus, curNodeName);
    }

    componentDidMount() {
        this._complete();
        this._stepEffect();
        // this._changeStep();
    }

    componentDidUpdate() {
        this._complete();
        this._stepEffect();
        this._changeStep();
    }

    // shouldComponentUpdate(newProps) {
    //     let keys = Object.keys(this.props);
    //     debugger
    //     return !keys.every(key => {
    //         if (typeof this.props[key] === 'function') {
    //             return true;
    //         } else {
    //             return this.props[key] === newProps[key];
    //         }
    //     })
    // }

    render() {
        const {direction = 'horizon'} = this.props;
        const _className = direction === 'vertical' ? 'dc-step_vertical' : '';
        return (
            <div className={_className}>
                {this._renderChildren()}
            </div>
        )
    }
}


class Step extends Component {

    // 计算step当前状态的颜色
    _itemDefaultColor(defaultClass) {
        const _className = new Set([defaultClass]);
        switch (this._currentStatus()) {
            case 'prev':
                _className.add('dc-step-item_success');
                break;
            case 'next':
                _className.add('dc-step-item_wait');
                break;
            default:
                let res = this._computeCurStatus();
                _className.add(res);
                break;
        }
        return Array.from(_className);
    }

    // 当该节点是否为当前节点
    _currentStatus() {
        const {curNodeName, nodeList, nodeName} = this.props;
        const curNodeIndex = nodeList.indexOf(curNodeName);
        const nodeIndex = nodeList.indexOf(nodeName);
        if (nodeIndex > curNodeIndex) {
            return 'next'
        } else if (nodeIndex < curNodeIndex) {
            return 'prev'
        } else {
            return 'cur'
        }
    }

    // 计算该节点状态
    _computeCurStatus() {
        const {curStatus, statusMap = {}} = this.props;
        const {success = [], error = []} = statusMap;
        const _status = (target, status) => {
            let _arr = typeof target === 'string' ? [target] : target;
            return _arr.indexOf(status) !== -1;
        };
        if (_status(success, curStatus)) {
            return 'dc-step-item_success';
        } else if (_status(error, curStatus)) {
            return 'dc-step-item_error';
        } else {
            return 'dc-step-item_process'
        }
    }

    // 垂直样式
    _verticalStyle(type) {
        const {direction = 'horizon'} = this.props;
        if (direction === 'horizon') {
            return false;
        }
        switch (type) {
            case 'root-item':
                return 'dc-step-item_vertical';
            case 'item-icon':
                return 'dc-step-icon_vertical';
            case 'item-line':
                return 'dc-step-line_vertical';
            case 'line-default':
                return 'dc-step-line_default_vertical';
            default:
                return true;
        }
    }

    // 默认类型
    _defaultType(className) {
        if (className.indexOf('dc-step-item_success') !== -1) {
            return 'step-success';
        } else if (className.indexOf('dc-step-item_error') !== -1) {
            return 'step-fail';
        } else if (className.indexOf('dc-step-item_process') !== -1) {
            return 'step-progress';
        } else {
            return 'step-wait'
        }
    }

    // 下一个节点状态
    _nextItemStatus(defaultClass) {
        const _className = new Set([defaultClass]);
        const {nodeName, nodeList, curNodeName} = this.props;
        let position = this._currentStatus();
        if (['cur', 'next'].indexOf(position) !== -1) {
            _className.add('dc-step-item_wait');
        } else {
            let nextIndex = nodeList.indexOf(nodeName) + 1;
            let curIndex = nodeList.indexOf(curNodeName);
            if (nextIndex !== curIndex) {
                _className.add('dc-step-item_success');
            } else {
                let _statusClass = this._computeCurStatus();
                _className.add(_statusClass);
            }
        }
        return Array.from(_className);
    }

    // 距离
    _distance() {
        let _style = {};
        let {distance = '', direction = 'horizon'} = this.props;
        if (distance) {
            const dist = distance.indexOf('px') !== -1 ? distance : distance + 'px';
            if (direction === 'horizon') {
                _style.width = dist;
            } else {
                _style.height = dist;
            }
        }
        return _style;
    }

    // 是否是最后一个节点
    _isTheLastItem() {
        const {nodeName, nodeList} = this.props;
        let c1, c2;
        if (this._verticalStyle()) {
            c1 = this._verticalStyle('item-line');
            c2 = this._verticalStyle('line-default');
        } else {
            [c1, c2] = ['dc-step-item_line', 'dc-step-item_default'];
        }
        const lineClass = this._nextItemStatus(c2).join(' ');
        const _lastIndex = nodeList.length - 1;
        if (nodeName !== nodeList[_lastIndex]) {
            return (
                <div className={c1}>
                    <span className={lineClass} style={this._distance()}/>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {
        const itemClass = this._itemDefaultColor('dc-step-item_icon').join(' ');
        const type = this._defaultType(itemClass);
        let _rootClass, _itenIconClass, _txtStyle;
        if (this._verticalStyle()) {
            _rootClass = this._verticalStyle('root-item');
            _itenIconClass = this._verticalStyle('item-icon');
            _txtStyle = {'marginLeft': '10px'};
        } else {
            _rootClass = 'dc-step-item';
        }
        return (
            <div className={_rootClass}>
                <section className={_itenIconClass}>
                    <div className={itemClass}>
                        <Icon type={type} width='20px' height='20px'/>
                    </div>
                    {this._isTheLastItem()}
                </section>

                <section style={_txtStyle}>
                    <div className='dc-step-item_title'>{this.props.title}</div>

                    <div className='dc-step-item_desc'>{this.props.description}</div>
                </section>
            </div>
        )
    }
}