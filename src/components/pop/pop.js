import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import './pop.css';

export class Pop extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showContent: false,
            position: {left: '', top: ''},
            btnSize: {width:'', height: ''}
        }
    }

    _handleOnMouseEnter(e) {
        this.setState({showContent: true})
    }

    _handleOnMouseLeave(e) {
        this.setState({showContent: false})
    }

    _handleOnClick(e) {
        let showContent = this.state.showContent ? false : true;
        this.setState({showContent});
        e.stopPropagation();
    }

    _setTouchEleOffset() {
        const btn = this.refs.btn;
        let position = {
            left: btn.offsetLeft,
            top: btn.offsetTop
        };
        let btnSize = {
            width: btn.offsetWidth,
            height: btn.offsetHeight
        };
        this.setState({position, btnSize});
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
        window.addEventListener('click', function() {
            if (this.state.showContent) this.setState({showContent: false})
        }.bind(this), false);
    }

    render() {
        const {content, placement = 'top', title} = this.props;
        const {position, btnSize} = this.state;
        return (
            <div
                ref="parent"
                className={['dc_defaultPop', this.props.className].join(' ')}
            >
                {
                    this.state.showContent ? <PopContent
                        content={content}
                        position={position}
                        placement={placement}
                        btnSize={btnSize}
                        title={title}
                    /> : ''
                }
                <div
                    className="dc-pop"
                    ref="btn"
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class PopContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            _position : this.props.position,
            _arrowToward: {
                'top': 'dc-pop_top',
                'bottom': 'dc-pop_bottom',
                'right': 'dc-pop_right',
                'left': 'dc-pop_left'
            }
        }
    }

    _computeContentPosition() {
        let popContent = this.refs.popContent;
        const {top, left} = this.props.position;
        const {width, height} = this.props.btnSize;
        const placementAction = {
            'top':  () => {
                return {
                    top: top - popContent.offsetHeight,
                    left: left - popContent.offsetWidth/2 + width/2,
                    marginTop: '-8px'
                }
            },
            'bottom': () => {
                return {
                    top: top + height,
                    left: left - popContent.offsetWidth/2 + width/2,
                    marginTop: "8px"
                }
            },
            'left': () => {
                return {
                    top: top - popContent.offsetHeight/2 + height/2,
                    left: left - popContent.offsetWidth,
                    marginLeft: '-8px'
                }
            },
            'right': () => {
                return {
                    top: top - popContent.offsetHeight/2 + height/2,
                    left: left + width,
                    marginLeft: '8px'
                }
            }
        };
        let contentPosition = placementAction[this.props.placement]();
        this.setState({_position: contentPosition})
    }

    componentDidMount() {
        this._computeContentPosition();
    }

    render() {
        const {_arrowToward} = this.state;
        const {placement, title} = this.props;
        return (
            <div
                className="dc-pop_open"
                style={this.state._position}
                ref="popContent"
            >
               <div className={_arrowToward[placement]}></div>
                <div className="dc-pop_content">
                    {
                        title ? <div className="dc-content__title">{title}</div> : ''
                    }
                    <div className="dc-content__txt">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}