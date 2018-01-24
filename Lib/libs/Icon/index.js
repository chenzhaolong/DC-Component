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
    "close": require('./images/close.png')
}

export class Icon extends Component {
    render() {
        const {type, width, height} = this.props;
        return (
            <div className="dc-icon-img">
                <img src={IconLib[type]}/>
            </div>
        )
    }
}