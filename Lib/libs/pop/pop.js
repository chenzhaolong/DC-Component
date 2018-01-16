import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './pop.css';

export class Pop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showContent: true,
        }
    }

    _handleOnMouseEnter(e) {
        this.setState({showContent: true})
        console.log(e.type);
    }

    _handleOnMouseLeave(e) {
        this.setState({showContent: false})
        console.log(e.type);
    }

    _handleOnClick(e) {

    }

    _showOuterComponent() {

        return (
            <div
                className="dc-pop-open"
            >
                {this.props.content}
            </div>
        )
    }

    componentDidMount() {
        let triggerMode = this.props.trigger ? this.props.trigger : 'hover';
        const parent =  this.refs.parent;
        if (triggerMode == 'hover') {
            parent.addEventListener('mouseenter', this._handleOnMouseEnter.bind(this), false);
            parent.addEventListener('mouseleave', this._handleOnMouseLeave.bind(this), false)
        } else {
            parent.addEventListener('click', this._handleOnClick.bind(this), false)
        }
    }

    render() {
        return (
            <div
                ref="parent"
                className={['dc-defaultPop', this.props.className].join(' ')}
            >
                {
                    this.state.showContent ? this._showOuterComponent() : ''
                }
                <button className="dc-pop">
                    {this.props.children}
                </button>
            </div>
        )
    }
}