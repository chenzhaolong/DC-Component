/**
 * @file 进度条
 */
import React, {Component} from 'react';
import './progress.scss';
import {get, omit} from 'lodash';
import {FaIcon} from '../fa-icon/Fa-Icon';

export class Progress extends React.Component {
    constructor(props) {
        super(props)
    }

    // 计算外层样式
    computedOuterStyle() {
        let {width, height} = this.props;
        return {
            width,
            height,
        }
    }

    // 计算里层样式
    computedInnerStyle() {
        let {precent} = this.props;
        let style = {width: `${precent}%`};
        let backgroundColor = this.curStyle();
        if (backgroundColor && backgroundColor.indexOf('dc-progress') === -1) {
            style.backgroundColor = backgroundColor;
        }
        return {
            style,
            className: style.backgroundColor ? '' : backgroundColor
        };
    }

    // 当前颜色值
    curStyle() {
        let {colors = {}} = this.props;
        // if (Object.keys(colors).length === 0) {
        //     return false;
        // }
        let result = this.curStatus();
        switch (result) {
            case 'success':
                return colors.success || 'dc-progress_success';
            case 'error':
                return colors.fail || 'dc-progress_fail';
            case 'dangerous':
                return colors.dangerous || 'dc-progress_dangerous';
            default:
                return colors.progress || 'dc-progress_progress';
        }
    }

    // 当前状态
    curStatus() {
        let {precent, isError = false} = this.props;
        let _precent = parseFloat(precent);
        if (isError) {
            return 'error';
        } else if (_precent + '' === '100') {
            return 'success';
        } else if (_precent < 10) {
            return 'dangerous'
        } else {
            return 'progress';
        }
    }

    // 计算circle时进度长度
    computedCircleLength(radius) {
        let precent = parseFloat(this.props.precent) / 100;
        let interval = Math.round(2 * 3.14 * radius);
        let length = Math.round(interval * precent);
        return `${length} ${interval - length}`;
    }

    // 计算circle的属性值
    computedCoord() {
        let {width = 100, strokeWidth = 10} = this.props;
        let c = Math.round(width / 2);
        let radius = c - strokeWidth;
        let color = () => {
            switch (this.curStatus()) {
                case 'success':
                    return '#32f83e';
                case 'progress':
                    return '#2ca2fc';
                default:
                    return '#d62119';
            }
        };
        return {
            width: width,
            viewBox: `0 0 ${width} ${width}`,
            circle: [c, c],
            strokeWidth: strokeWidth,
            r: radius,
            color: color(),
            rotate: `rotate(-90, ${c} ${c})`,
            strokeDasharray: this.computedCircleLength(radius, strokeWidth),
            status: this.curStatus()
        }
    }

    render() {
        let {type = 'line'} = this.props;
        let state;
        if (type === 'line') {
            state = {
                outerStyle: this.computedOuterStyle(),
                innerStyle: this.computedInnerStyle(),
                status: this.curStatus()
            };
            if (state.status === 'success') {
                this.props.onSuccess && this.props.onSuccess();
            }
            return LineProgress(this.props, state);
        } else {
            state = this.computedCoord();
            return CircleProgress(this.props, state);
        }
    }
}

/**
 * 线装进度条
 */
function LineProgress(props, state) {
    let {outerStyle, innerStyle, status} = state;
    let {textInside = false} = props;
    let innerClass = ['dc-progress-line_inner', innerStyle.className].join(' ');
    let _progress = ['progress', 'dangerous'];
    return (
        <div>
            <section className='dc-progress-line_outer' style={outerStyle}>
                <article className={innerClass} style={innerStyle.style}>
                    {
                        textInside ?
                            (<span className='dc-progress_inside_text' style={{lineHeight: outerStyle.height || ''}}>
                                {props.precent}%
                            </span>)
                            : null
                    }
                </article>
            </section>
            {
                !textInside
                    ?
                    (<span className='dc-progress_outside_text'>
                     {props.precent}%
                     </span>)
                    : null
            }
            {
                _progress.indexOf(status) === -1 ? StatusLogo(status) : null
            }
        </div>
    )
}

/**
 * 状态logo
 */
function StatusLogo(status, spec = {}) {
    const mapList = {
        success: ['check-circle', '#6ac044'],
        error: ['times-circle', '#f36d6e'],
    };
    return (
        <div className='dc-progress-logo' style={{marginLeft: spec.left}}>
            <FaIcon icon={mapList[status][0]} color={mapList[status][1]} fontSize='16px'/>
        </div>
    )
}

/**
 * 圆形进度条
 */
function CircleProgress(props, state) {
    const {width, viewBox, circle, strokeWidth, r, strokeDasharray, color, rotate, status} = state;
    const size = props.iconSize || '30px';
    return (
        <div>
            <section className='dc-progress-circle'>
                <svg width={width} height={width} viewBox={viewBox}>
                    <circle cx={circle[0]} cy={circle[1]} r={r} stroke='#e5e9f2' strokeWidth={strokeWidth} fill='none'/>
                    <circle cx={circle[0]} cy={circle[1]} r={r} stroke={color} strokeWidth={strokeWidth} fill='none'
                            strokeDasharray={strokeDasharray} transform={rotate}/>
                </svg>

                <div className='dc-progress-circle_txt'>
                    {
                        ['success', 'error'].indexOf(status) !== -1
                            ? StatusLogo(status === 'success' ? 'circle-success' : 'circle-error',
                            {width: size, height: size, left: '0'})
                            : `${props.precent}%`
                    }
                </div>
            </section>
        </div>
    )
}