import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './row.css';

export class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: '',
            privateStyle: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'margin',
                           'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
            mode:{
                flex: 'dc-row-flex',
            }
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
        this._changeRowLayout();
        this._arrangeCowOrder();
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
                    data-order={child.props.order}
                >
                    {child}
                </div>
            )
        })
    }

    _isOverCurrentScreenWidth() {
        const parent = this.refs.parent;
        const children = Array.from(parent.childNodes);
        const totalWidth = children.reduce((sum, item) => {
            return sum += parseInt(item.style.width);
        }, 0);
        if (totalWidth > document.documentElement.clientWidth) {
            throw new Error('the total width of component of Row is over current screen!');
        }
    }

    _receivePrivateStyle() {
        const parent = this.refs.parent;
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

    _changeRowLayout() {
        if (!this.props.mode) return;
        if (!this.state.mode[this.props.mode]) return;
        const parent = this.refs.parent;
        if (parent.className) {
            parent.className = parent.className + ' ' + this.state.mode[this.props.mode];
        } else {
            parent.className = this.state.mode[this.props.mode]
        }
    }

    _arrangeCowOrder() {
        if (!this.props.openOrder) return;
        const parent = this.refs.parent;
        let childNodes = [];
        for (let i of parent.childNodes) {
            childNodes.push(i);
        }
        childNodes.sort((prev, next) => {
            const _defaultOrder = (item) => {
                return item.dataset.order ? item.dataset.order : 0;
            }
            let prevOrder = _defaultOrder(prev);
            let nextOrder = _defaultOrder(next);
            return prevOrder > nextOrder ? true : false;
        })
        for (let child of parent.childNodes) {
            parent.removeChild(child);
        }
        for (let child of childNodes) {
            parent.appendChild(child);
        }
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