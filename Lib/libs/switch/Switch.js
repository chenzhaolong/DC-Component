import React, {Component} from 'react';
import './switch.css';
import PropTypes from 'prop-types';

export class Switch extends Component{
    constructor(props) {
        super(props);
        const {defaultChecked} = this.props;
        this.state = {
            defaultClass: ['dc-switch-circle'],
            checkValue: defaultChecked,
            first: true,
        }
    }

    _swimBetween(e) {
        let {defaultClass, checkValue} = this.state;
        if (checkValue) {
            checkValue = false;
            if (defaultClass.indexOf('dc-switch-true')) defaultClass.splice(1, 1);
            defaultClass.push('dc-switch-false');
            this.refs.span.style.left = '0px';
        } else {
            checkValue = true;
            if (defaultClass.indexOf('dc-switch-false')) defaultClass.splice(1, 1);
            defaultClass.push('dc-switch-true');
            this.refs.span.style.left = '21px';
        }
        this.setState({defaultClass, checkValue}, () => {
            this.props.onChange(this.state.checkValue);
        });
    }

    _switchBg(checkValue) {
        let classes = ['dc-switch'];
        if (checkValue) {
            classes.push('dc-switch-checked');
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
                    checkValue && checkTxt && <span className="dc-switch-checktxt">
                        {checkTxt}
                    </span>
                }
                <span
                    className={defaultClass.join(' ')}
                    ref="span"
                    title="right"
                />
                {
                    !checkValue && unCheckTxt && <span className="dc-switch-unchecktxt">
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