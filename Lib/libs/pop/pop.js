import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import './pop.css';

export class Pop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showContent: false,
            position: {
                left: '',
                top: ''
            }
        }
    }

    _handleOnMouseEnter(e) {
        this.setState({showContent: true})
    }

    _handleOnMouseLeave(e) {
        this.setState({showContent: false})
    }

    _handleOnClick(e) {
        this.setState({showContent: true})
    }

    _setTouchEleOffset() {
        const btn = this.refs.btn;
        let position = {
            left: btn.offsetLeft,
            top: btn.offsetTop
        };
        this.setState({position});
    }

    _touchOuterTrigger() {
        let triggerMode = this.props.trigger ? this.props.trigger : 'hover';
        const parent =  this.refs.parent;
        if (triggerMode == 'hover') {
            parent.addEventListener('mouseenter', this._handleOnMouseEnter.bind(this), false);
            parent.addEventListener('mouseleave', this._handleOnMouseLeave.bind(this), false)
        } else {
            parent.addEventListener('click', this._handleOnClick.bind(this), false)
        }
    }

    componentDidMount() {
        this._setTouchEleOffset();
        this._touchOuterTrigger();
    }

    render() {
        return (
            <div
                ref="parent"
                className={['dc-defaultPop', this.props.className].join(' ')}
            >
                {
                    this.state.showContent ? <PopContent
                        content={this.props.content}
                        position={this.state.position}
                    /> : ''
                }
                <button
                    className="dc-pop"
                    ref="btn"
                >
                    {this.props.children}
                </button>
            </div>
        )
    }
}

class PopContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            _position : this.props.position
        }
    }
    render() {
        return (
            <div
                className="dc-pop-open"
                style={this.state._position}
                ref="popContent"
            >
                {this.props.content}
            </div>
        )
    }

    _computeContentPosition() {
        let popContent = this.refs.popContent;
        const {top, left} = this.props.position;
        let contentPosition = {
            left,
            top: top - popContent.offsetHeight
        };
        this.setState({_position: contentPosition})
    }

    componentDidMount() {
        this._computeContentPosition();
    }

    componentWillUnmount() {

    }
}

