import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './row.css';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: '',
            privateStyle: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'margin',
                           'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']
        }
    }
    componentWillMount() {
        if(!global.window || !window.document ) return 0;
        const screenWidth = document.documentElement.clientWidth;
        this.setState({grid: Math.round(screenWidth/24)})
    }
    componentDidMount() {
        this._isOverCurrentScreenWidth();
        this._receivePrivateStyle();
    }
    _computeColSize(num) {
        let span = num ? num : 1;
        if (span - Math.round(span) > 0) span = Math.round(span);
        return span * this.state.grid + 'px';
    }
    _showCol() {
        const {children} = this.props;
        return React.Children.map(children, child => {
            let colSize = this._computeColSize(child.props.span);
            return (
                <div
                    className="dc-row"
                    style={{width: colSize}}
                >
                    {child}
                </div>
            )
        })
    }
    _isOverCurrentScreenWidth() {
        const parent = ReactDOM.findDOMNode(this.refs.parent);
        const children = Array.from(parent.childNodes);
        const totalWidth = children.reduce((sum, item) => {
            return sum += parseInt(item.style.width);
        }, 0);
        if (totalWidth > document.documentElement.clientWidth) {
            throw new Error('the total width of component of Row is over current screen!');
        }
    }
    _receivePrivateStyle() {
        const parent = ReactDOM.findDOMNode(this.refs.parent);
        let _privateStyleArr = this.state.privateStyle.map(item => {
            return {
                key: item,
                value: this.props[item]
            }
        });
        _privateStyleArr = _privateStyleArr.filter(item => {
            return item.value ? true : false;
        })
        _privateStyleArr.forEach(item => {
            parent.style[item.key] = item.value + 'px';
        })
    }
    render() {
        return <div
            ref="parent"
            className={this.props.className}
        >
            {
                this._showCol()
            }
        </div>
    }
}