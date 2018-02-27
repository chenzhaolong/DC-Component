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
            separator: separator || "/",
        }
    }

    static createItem() {
        return Item;
    }

    _renderBreadCrumbForDis() {
        const { children } = this.props;
        let _index = -1;
        children.forEach((child, index) => {
            if (window.location.href == child.props.href) _index = index;
        });
        const _children = _index >= 0 ? children.slice(0, _index + 1) : [];
        return React.Children.map(_children, (child, index) => {
            return (
                <div  className="dc-breadcrumb__item" key={index}>
                    { child }
                    {
                        this._isLastItem(child.props.href)
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
            child["href"] = child.href || this._createHrefByParams(child);
            if(currentHref == child.href) _index = index;
        });
        return _index >= 0 ? routes.slice(0, _index + 1) : [];
    }

    _createHrefByParams(spec) {
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
        const { children, href, className } = this.props;
        const currentClassName = ['dc-breadcrumb__span', className].join(" ");
        const preClassName = ['dc-breadcrumb__a', className].join(" ");
        return (
            <span className="dc-breadcrumb__item">
                {
                    this._isCurrentHref(href) ?
                        <span className={currentClassName}>
                            {children}
                        </span>
                        :
                        <a href={href} className={preClassName}>
                            {children}
                        </a>
                }
            </span>
        )
    }
}