import React, {Component, PureComponent} from 'react';

export const IconLib = {
    'search': require('./images/search.png'),
    'position': require('./images/position.png'),
    'house': require('./images/house.png'),
    'arrow-down': require('./images/arrow-down.png'),
    'download': require('./images/download.png'),
    'favorite': require('./images/favorite.png'),
    'good': require('./images/good.png'),
    'phone': require('./images/iconfont-phone.png'),
    'star': require('./images/iconfont-xingxing.png'),
    'refresh': require('./images/refresh.png'),
    'tool': require('./images/tool.png'),
    'loading': require('./images/loading.png'),
    "close": require('./images/close.png'),
    "circle-loading": require('./images/circle-loading.png'),
    "warning": require('./images/warning.png'),
    "error": require('./images/error.png'),
    "question": require('./images/question.png'),
    "success": require('./images/success.png'),
    "info": require('./images/info.png'),
}

export class Icon extends Component {
    defaultClass() {
        let defalutClass = ['dc-icon-img'];
        if (this.props.type == 'circle-loading' && this.props.circle) defalutClass.push('dc-icon-loading');
        return defalutClass.join(" ");
    }
    render() {
        const {type, width, height} = this.props;
        return (
            <div className={this.defaultClass()} style={{width, height}}>
                <img src={IconLib[type]}/>
            </div>
        )
    }
}