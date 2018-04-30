import React, {Component} from 'react';
import './loading.css';
import {Icon, IconLib} from '../Icon';

export class Loading extends Component{
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

    render() {
        const LoadingIcon = this._chooseLoadingIcon();
        return (
            <div>
                <div className='dc-loading-musk'>
                    <div className='dc-loading-body'>
                        <LoadingIcon icon='loading-five'/>
                    </div>
                </div>
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
    return (
        <div className='dc-loading-jump'>
            <div className='dc-loading-item dc-loading-jump_animation'></div>
        </div>
    )
}

function FlexibleLoading(props) {
    return (
        <div>

        </div>
    )
}