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

    render() {
        return (
            <div>
                {this._renderChildren()}
            </div>
        )
    }
}

class Step extends Component {

    // 计算step当前状态的颜色
    _itemDefaultColor() {
        const _className = new Set(['dc-step-item_icon']);
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

    _computeCurStatus() {
        const {curStatus, statusMap} = this.props;
        const {success, progress, error} = statusMap;
        const _status = (target, status) => {
            return target === status || target.indexOf(status) !== -1;
        };
        if (_status(success, curStatus)) {
            return 'dc-step-item_success';
        } else if (_status(error, curStatus)) {
            return 'dc-step-item_error';
        } else {
            return 'dc-step-item_process'
        }
    }

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


    render() {
        const itemClass = this._itemDefaultColor().join(' ');
        const type = this._defaultType(itemClass);
        return (
            <div className='dc-step-item'>
                <section>
                    <div className={itemClass}>
                        <Icon type={type} width='20px' height='20px'/>
                    </div>

                    <div></div>
                </section>

                <section>
                    <div>{this.props.title}</div>

                    <div>{this.props.description}</div>
                </section>
            </div>
        )
    }
}