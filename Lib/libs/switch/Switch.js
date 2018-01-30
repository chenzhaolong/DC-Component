import React, {Component} from 'react';
import './switch.css';

export class Switch extends Component{
    constructor(props) {
        super(props);
        const {defaultChecked} = this.props;
        this.state = {
            defaultClass: ['dc-switch-circle'],
            status: {Right: defaultChecked, Left: !defaultChecked}
        }
    }

    _switchBetween(e) {
        let {defaultClass, status} = this.state;
        if (status.Left) {
            status = {Right: true, Left: false};
            if (defaultClass.indexOf('dc-switch-false')) defaultClass.splice(1, 1);
            defaultClass.push('dc-switch-true')
        } else {
            status = {Right: false, Left: true};
            if (defaultClass.indexOf('dc-switch-true')) defaultClass.splice(1, 1);
            defaultClass.push('dc-switch-false')
        }
        this.setState({defaultClass, status});
    }

    _switchBg(status) {
        let classes = ['dc-switch'];
        if (status.Right) {
            classes.push('dc-switch-checked');
        } else {
            classes.splice(1,1);
        }
        return classes.join(' ');
    }

    render() {
        const {defaultClass, status} = this.state;
        const _classes = this._switchBg(status);
        return (
            <div className={_classes} onClick={this._switchBetween.bind(this)}>
                <span
                    className={defaultClass.join(' ')}
                />
            </div>
        )
    }
}