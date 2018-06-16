import React, {Component} from 'react';
import {IconLib} from '../Icon/IconLib';
import {Icon} from '../Icon/index';
import './pagination.css';
import {get} from 'lodash';

export class Pagination extends Component {
    constructor(props) {
        super(props);
        const {total, pageSize} = this.props;
        this.state = {
            _total: total,
            _pageSize: pageSize,
            pageNo: 1
        }
    }

    // 数字字符转成数字
    _changeStrToNumber(str) {
        return parseFloat(str);
    }

    // 跳转到指定页数
    jumpToTargetPageNo(e) {
        let pageNo = this._changeStrToNumber(e.target.value);
        if (pageNo && pageNo <= this._pageNumber()) {
            this.setState({pageNo: pageNo}, () => {
                let curNode = this._finePageByPageNo(this.state.pageNo, false);
                this._activeBehavior(curNode);
            })
        }
    }

    // 跳转到前一页
    _jumpToPrev(e) {
        let pageNo = this._changeStrToNumber(this.state.pageNo);
        if (this.state.pageNo != 1) {
            this.setState({pageNo: pageNo - 1}, () => {
                let curNode = this._finePageByPageNo(this.state.pageNo);
                this._activeBehavior(curNode);
            })
        }
    }

    // 跳转到下一页
    _jumpToNext(e) {
        let pageNo = this._changeStrToNumber(this.state.pageNo);
        if (this.state.pageNo < this._pageNumber()) {
            this.setState({pageNo: pageNo + 1}, () => {
                let curNode = this._finePageByPageNo(this.state.pageNo);
                this._activeBehavior(curNode);
            })
        }
    }

    // 通过页数寻找对应页数元素
    _finePageByPageNo(order, isThrow = true) {
        let ul = document.getElementById('dc-pagination-ul');
        let children = ul.children;
        if (children.length > 0) {
            if (order <= children.length) {
                return children[order - 1];
            } else {
                if (isThrow) {
                    throw new Error('the order of page is over the total of page');
                }
            }
        } else {
            if (isThrow) {
                throw new Error('the total of page is zero');
            }
        }
    }

    // 页数
    _pageNumber() {
        let _total = this._changeStrToNumber(this.state._total);
        let _pageSize = this._changeStrToNumber(this.state._pageSize);
        return Math.ceil(_total / _pageSize);
    }

    // 兄弟节点
    _getSlibingDom(node) {
        let parent = node.parentNode;
        let l = parent.childNodes.length;
        let slibingNodes = [];
        for (let i = 0; i < l; i++) {
            if (parent.childNodes[i].dataset.order !== node.dataset.order) {
                slibingNodes.push(parent.childNodes[i]);
            }
        }
        return slibingNodes;
    }

    // 激活该节点
    _activeItem(e) {
        let curNode = e.target;
        if (curNode.tagName.toLowerCase() !== 'li') {
            return;
        }
        this.setState({pageNo: curNode.dataset.order}, () => {
            this._activeBehavior(curNode);
        });
    }

    // 激活后的具体行为
    _activeBehavior(curNode) {
        let slibings = this._getSlibingDom(curNode);
        curNode.classList.add('dc-pagination_active');
        slibings.forEach(item => {
            if (item.classList.contains('dc-pagination_active')) {
                item.classList.remove('dc-pagination_active');
            }
        });
        if (this.props.changePage) {
            let _pageNo = get(curNode, 'dataset.order') || this.state.pageNo;
            this.props.changePage(_pageNo);
        }
    }

    // 默认的页码
    _defaultChoosePageNo(order) {
        const {pageNo = 1} = this.state;
        return order == pageNo;
    }

    // 主要渲染内容
    _mainContent() {
        let totalCount = this._pageNumber();
        let _content = [];
        for (let i = 0; i < totalCount; i++) {
            let item = this._renderPageItem(i + 1, totalCount);
            _content.push(item);
        }
        let _prev = ['dc-pagination-button_prev'];
        let _next = ['dc-pagination-button_next'];
        if (this.state.pageNo >= this._pageNumber()) {
            _next.push('dc-pagination-button_disabled');
        }
        if (this.state.pageNo == 1) {
            _prev.push('dc-pagination-button_disabled');
        }
        return (
            <div style={{display: 'inline-block'}}>
                <span className={_prev.join(" ")} onClick={this._jumpToPrev.bind(this)}>
                    <Icon type='right' width='30px' height='30px'/>
                </span>
                <ul
                    className='dc-pagination-ul'
                    onClick={this._activeItem.bind(this)}
                    id='dc-pagination-ul'
                >{_content}</ul>
                <span className={_next.join(" ")} onClick={this._jumpToNext.bind(this)}>
                    <Icon type='right' width='30px' height='30px'/>
                </span>
            </div>
        );
    }

    // 渲染的节点
    _renderPageItem(index, total) {
        let _className = ['dc-pagination-li'];
        if (index === 1) {
            _className.push('dc-pagination-border_right');
        }
        if (index === total) {
            _className.push('dc-pagination-border_left');
        }
        if (this._defaultChoosePageNo(index)) {
            _className.push('dc-pagination_active');
        }
        return <li
            data-order={index}
            key={index}
            className={_className.join(' ')}
        >{index}</li>
    }

    // 展示总数
    _showToatal() {
        return (
            <div className='dc-pagination-total'>
                共 {this.props.total} 条
            </div>
        )
    }

    // 展示跳转
    _showJumper() {
        return (
            <div className='dc-pagination-jumper'>
                前往
                <input type='text' className='dc-pagination-jumper_txt' onChange={this.jumpToTargetPageNo.bind(this)}/>
                页
            </div>
        )
    }

    _clearUnlessDefaultActived() {
        const activeDom = document.getElementsByClassName('dc-pagination_active');
        for (let i = 0; i < activeDom.length; i++) {
            const _order = activeDom[i].dataset.order;
            if (!this._defaultChoosePageNo(_order)) {
                activeDom[i].classList.remove('dc-pagination_active');
            }
        }
    }

    _reTraggleChangepage(prevPage) {
        const {pageNo = 1} = prevPage;
        const {cancelRelevance = true} = this.props;
        if (pageNo !== this.props.pageNo) {
            cancelRelevance && this.props.changePage(this.props.pageNo);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.pageNo && this.props.pageNo !== newProps.pageNo) {
            this.setState({pageNo: newProps.pageNo});
        }
    }

    componentDidUpdate(prevProps) {
        this._clearUnlessDefaultActived();
        this._reTraggleChangepage(prevProps);
    }

    render() {
        let total = this._changeStrToNumber(this.state._total);
        let {layout} = this.props;
        return (
            <div>
                {
                    layout.indexOf('total') >= 0 ? this._showToatal() : null
                }
                {
                    total > 0 ? this._mainContent() : null
                }
                {
                    layout.indexOf('jumper') >= 0 ? this._showJumper() : null
                }
            </div>
        )
    }
}

