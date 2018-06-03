import React, {Component} from 'react';
import './pagination.css';

export class Pagination extends Component {
    constructor(props) {
        super(props);
        const {total, pageSize} = this.props;
        this.state = {
            _total: total,
            _pageSize: pageSize
        }
    }

    // 数字字符转成数字
    _changeStrToNumber(str) {
        return parseFloat(str);
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
        let slibings = this._getSlibingDom(curNode);
        curNode.classList.add('dc-pagination_active');
        slibings.forEach(item => {
            if (item.classList.contains('dc-pagination_active')) {
                item.classList.remove('dc-pagination_active');
            }
        })
    }

    // 主要渲染内容
    _mainContent() {
        let totalCount = this._pageNumber();
        let _content = [];
        for (let i = 0; i < totalCount; i++) {
            let item = this._renderPageItem(i + 1, totalCount);
            _content.push(item);
        }
        return <ul
            className='dc-pagination-ul'
            onClick={this._activeItem.bind(this)}
        >{_content}</ul>;
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
        return <li
            data-order={index}
            key={index}
            className={_className.join(' ')}
        >{index}</li>
    }

    render() {
        let total = this._changeStrToNumber(this.state._total);
        return (
            <div>
                {
                    total > 0 ? this._mainContent() : null
                }
            </div>
        )
    }
}

