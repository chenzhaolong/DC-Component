import React, {Component, PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import './loading.css';
import {Icon} from '../Icon/index';
import {IconLib} from '../Icon/IconLib'

export class Loading extends PureComponent {
    _chooseLoadingIcon() {
        switch (this.props.type) {
            case 'flexible':
                return FlexibleLoading;
            case 'jump':
                return JumpLoading;
            default:
                return DefaultLoading;
        }
    }

    _renderLoadingNativeContent() {
        let content;
        if (this.props.component) {
            content = this.props.component;
        } else {
            const LoadingIcon = this._chooseLoadingIcon();
            content = <LoadingIcon {...this.props}/>
        }
        let _style = this._renderLoadingFitStyle();
        return (
            <div className='dc-loading-musk' style={_style}>
                <div className='dc-loading-body'>
                    {content}
                </div>
            </div>
        )
    }

    _renderLoadingFitStyle() {
        let style = {};
        if (this.props.children) {
            if (this._componentHasLocalId(this.props.children)) {
                style = {
                    width: `${document.getElementById('loading').offsetWidth}px` ,
                    height: `${document.getElementById('loading').offsetHeight}px`  ,
                    position: 'absolute',
                }
            }
        }
        return style;
    }

    _componentHasLocalId(ele) {
        if (ele.props.id && ele.props.id === 'loading') {
            return true;
        } else {
            throw new Error("the children of Loading component must has property of id called 'loading'");
            return false;
        }
    }

    shouldComponentUpdate(newProps) {
        return newProps.show !== this.props.show;
    }

    componentWillUpdate() {
        this.props.beforeLoading && this.props.beforeLoading();
    }

    componentDidUpdate() {
        this.props.afterLoading && this.props.afterLoading();
    }

    componentDidMount() {}

    render() {
        return (
            <div style={{position: 'relative'}}>
                {
                    this.props.show && this._renderLoadingNativeContent()
                }
                {
                    this.props.children
                }
            </div>
        )
    }
}

function DefaultLoading(props) {
    let {icon, txt} = props;
    if (!IconLib[icon]) {
        icon = 'loading-one';
    }
    return (
        <div>
            <article className='dc-loading-default'>
                <Icon type={icon} width='50px' height='50px'/>
            </article>
            <article className='dc-loading-txt'>
                {txt || '加载中，请稍后！'}
            </article>
        </div>
    )
}

function JumpLoading(props) {
    const _bollStyle = (props) => {
        const {bollColor, speed} = props;
        let _style = {};
        if (bollColor) {
            _style.backgroundColor = bollColor;
        }
        if (speed) {
            _style.animation = `jumpUpAndDown ${speed}s linear infinite`
        }
        return _style;
    };
    return (
        <div className='dc-loading-jump'>
            <div className='dc-loading-item dc-loading-jump_animation' style={_bollStyle(props)}></div>
        </div>
    )
}

function FlexibleLoading(props) {
    const _computedWaH = (radius, obj) => {
        if (!radius) return obj;
        let size = Math.round(1.414 * radius);
        obj.width = `${size}px`;
        obj.height = `${size}px`;
    };

    const _bollStyle = (props, type) => {
        const {outerRadius, innerRadius, speed} = props;
        let _style = {};
        if (type === 'outer') {
            _computedWaH(outerRadius, _style);
        } else {
            _computedWaH(innerRadius, _style);
        }
        if (speed) {
            _style.animation = `${type === 'outer' ? 'flexibleOuter' : 'flexibleInner'} ${speed}s linear infinite`;
        }
        return _style;
    };
    return (
        <div>
            <div className='dc-loading_outer dc-loading_outer_animation' style={_bollStyle(props, 'outer')}>
                <div className='dc-loading_inner dc-loading_inner_animation' style={_bollStyle(props, 'inner')}></div>
            </div>
        </div>
    )
}