import React, {Component} from 'react';
import './switch.scss';
import PropTypes from 'prop-types';

export class Switch extends Component{
    constructor(props) {
        super(props);
        const {defaultChecked} = this.props;
        this.state = {
            defaultClass: ['dc-switch_circle'],
            checkValue: defaultChecked,
            first: true,
        }
    }

    _swimBetween(e) {
        let {defaultClass, checkValue} = this.state;
        if (checkValue) {
            checkValue = false;
            if (defaultClass.indexOf('dc-switch_true')) defaultClass.splice(1, 1);
            defaultClass.push('dc-switch_false');
            this.refs.span.style.left = '0px';
        } else {
            checkValue = true;
            if (defaultClass.indexOf('dc-switch_false')) defaultClass.splice(1, 1);
            defaultClass.push('dc-switch_true');
            this.refs.span.style.left = '21px';
        }
        this.setState({defaultClass, checkValue}, () => {
            this.props.onChange(this.state.checkValue);
        });
    }

    _switchBg(checkValue) {
        let classes = ['dc-switch'];
        if (checkValue) {
            classes.push('dc-switch_checked');
        } else {
            classes.splice(1,1);
        }
        return classes.join(' ');
    }

    _defaultStyle() {
        if (this.props.defaultChecked && this.state.first) {
            this.refs.span.style.left = '21px';
        }
        this.setState({first: false});
    }

    componentDidMount() {
        this._defaultStyle();
    }

    render() {
        const {defaultClass, checkValue} = this.state;
        const {checkTxt, unCheckTxt} = this.props;
        const _classes = this._switchBg(checkValue);
        return (
            <div className={_classes} onClick={this._swimBetween.bind(this)}>
                {
                    checkValue && checkTxt && <span className="dc-switch_checktxt">
                        {checkTxt}
                    </span>
                }
                <span
                    className={defaultClass.join(' ')}
                    ref="span"
                    title="right"
                />
                {
                    !checkValue && unCheckTxt && <span className="dc-switch_unchecktxt">
                        {unCheckTxt}
                    </span>
                }
            </div>
        )
    }
}

Switch.propTypes = {
    defaultChecked: PropTypes.bool.isRequired,
}