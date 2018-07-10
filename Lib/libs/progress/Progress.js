/**
 * @file 进度条
 */
import React, {Component} from 'react';
import './progress.css';
import {get} from 'lodash';

export class Progress extends React.Component {
    constructor(props) {
        super(props)
    }

    computedOuterStyle() {
        let {width, height} = this.props;
        return {
            width,
            height,
        }
    }

    computedInnerStyle() {
        let {precent, colors = {}} = this.props;
        return {
            width: `${precent}%`,
            backgroundColor: colors.progress
        }
    }

    render() {
        let {type = 'line'} = this.props;
        let state = {
            outerStyle: this.computedOuterStyle(),
            innerStyle: this.computedInnerStyle()
        };
        if (type === 'line') {
            return LineProgress(null, state);
        } else {
            return CycleProgress(null, state);
        }
    }
}

/**
 * 线装进度条
 */
function LineProgress(props, state) {
    let {outerStyle, innerStyle} = state;
    return (
        <div>
            <section className='dc-progress-line_outer' style={outerStyle}>
                <article className='dc-progress-line_inner' style={innerStyle}></article>
            </section>
        </div>
    )
}

/**
 * 圆形进度条
 */
function CycleProgress(props, state) {
    return (
        <div>

        </div>
    )
}