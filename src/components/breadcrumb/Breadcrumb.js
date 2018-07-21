/**
 * Created by zh on 2018/2/22.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./breadcrumb.css";

export class Breadcrumb extends Component{
    constructor(props) {
        super(props);
        const { separator } = this.props;
        this.state = {
            separator: separator || "/"
        }
    }

    static createItem() {
        return Item;
    }

    _renderBreadCrumbForDis() {
        const { children } = this.props;
        let _index = -1;
        children.forEach((child, index) => {
            const _href = child.props.href || _createHrefByParams(child.props.route);
            if (window.location.href == _href) _index = index;
        });
        const _children = _index >= 0 ? children.slice(0, _index + 1) : [];
        return React.Children.map(_children, (child, index) => {
            const { href, route } = child.props;
            const _href = href || _createHrefByParams(route);
            return (
                <div  className="dc-breadcrumb__item" key={index}>
                    { child }
                    {
                        this._isLastItem(_href)
                    }
                </div>
            )
        })
    }

    _renderBreadCrumbForCon() {
        const { routes } = this.props;
        const _routes = this._matchCurrentHref(routes);
        return _routes.map((child, index, array) => {
            return this._enhanceItemComponent(child, index, array);
        });
    }

    _matchCurrentHref(routes) {
        const currentHref = window.location.href;
        let _index = -1;
        routes.forEach((child, index) => {
            child["href"] = child.href || _createHrefByParams(child);
            if(currentHref == child.href) _index = index;
        });
        return _index >= 0 ? routes.slice(0, _index + 1) : [];
    }

    _isLastItem(href) {
        return window.location.href == href ? null :
            <span className="dc-breadcrumb__separator">{this.state.separator}</span>
    }

    _enhanceItemComponent(child, index) {
        return (
            <div className="dc-breadcrumb__item" key={index}>
                <Item {...child}>
                    {child.component ? child.component : child.name}
                </Item>
                {
                    this._isLastItem(child.href)
                }
            </div>
        )
    }

    render() {
        const { mode = "concentrate" } = this.props;
        return (
            <div className="dc-breadcrumb">
                {
                    mode == "concentrate" ? this._renderBreadCrumbForCon() : this._renderBreadCrumbForDis()
                }
            </div>
        )
    }
}

class Item extends Component{
    constructor(props) {
        super(props);
    }

    _isCurrentHref(href) {
        return window.location.href == href;
    }

    render() {
        const { children, href, className, route } = this.props;
        const currentClassName = ['dc-breadcrumb__span', className].join(" ");
        const preClassName = ['dc-breadcrumb__a', className].join(" ");
        const _href = href || _createHrefByParams(route);
        return (
            <span className="dc-breadcrumb__item">
                {
                    this._isCurrentHref(_href) ?
                        <span className={currentClassName}>
                            {children}
                        </span>
                        :
                        <a href={_href} className={preClassName}>
                            {children}
                        </a>
                }
            </span>
        )
    }
}

/**
 * 根据配置项拼接url
 * @param: spec是配置对象
 * @spec-path：相对路径
 * @spec-query：查询字符串
 * @spec-hash：希尔值
 * @spec-prefix：路径前缀
 * */
function _createHrefByParams(spec) {
    const { path, query, hash, prefix } = spec;
    const { protocol, host, pathname } = window.location;
    const currentpath = `${prefix && "/"}${prefix && prefix}${path || pathname}`;
    let _href = `${protocol}//${host}${currentpath}`;
    const _queryString = function(query) {
        let queryStr = "";
        for (let key in query) {
            queryStr = `${queryStr && queryStr}${queryStr && "&"}${key}=${query[key]}`
        }
        return queryStr;
    };
    if (query) {
        if (typeof query !== 'object') throw new Error("query must be Object!");
        _href = `${_href}?${_queryString(query)}`;
    }
    if (hash) {
        _href = `${_href}#${hash}`;
    }
    return _href;
}