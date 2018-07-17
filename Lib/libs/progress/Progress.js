/**
 * @file 进度条
 */
import React, {Component} from 'react';
import {Icon} from "../Icon";
import './progress.css';
import {get, omit} from 'lodash';

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
        if (Object.keys(colors).length === 0) {
            return false;
        }
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

    render() {
        let {type = 'line'} = this.props;
        let state = {
            outerStyle: this.computedOuterStyle(),
            innerStyle: this.computedInnerStyle(),
            status: this.curStatus()
        };
        if (state.status === 'success') {
            this.props.onSuccess && this.props.onSuccess();
        }
        if (type === 'line') {
            return LineProgress(this.props, state);
        } else {
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
                        textInside && _progress.indexOf(status) !== -1 ?
                            (<span className='dc-progress_inside_text' style={{lineHeight: outerStyle.height || ''}}>
                                {props.precent}%
                            </span>)
                            : null
                    }
                </article>
            </section>
            {
                !textInside && _progress.indexOf(status) !== -1
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
function StatusLogo(status) {
    return (
        <div className='dc-progress-logo'>
            <Icon type={status} width='20px' height='20px'/>
        </div>
    )
}

/**
 * 圆形进度条
 */
function CircleProgress(props, state) {
    return (
        <div>
            <section className='dc-progress-circle_outer'>
                <section className='dc-progress-circle_inner'>

                </section>
            </section>
        </div>
    )
}