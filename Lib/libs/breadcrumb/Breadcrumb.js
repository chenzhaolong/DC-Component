/**
 * Created by zh on 2018/2/22.
 */
import React, {Component} from 'react';
import "./breadcrumb.css";

export class Breadcrumb extends Component{
    constructor(props) {
        super(props);
        const { routes, separator } = this.props;
        this.state = {
            separator: separator || "/",
        }
    }

    _renderBreadCrumbForCon() {
        const { routes } = this.props;
        const _routes = this._matchCurrentHref(routes);
        return _routes.map((child, index, array) => {
            return this._enhanceItemComponent(child, index, array);
        });
    }

    _renderBreadCrumbForDis() {

    }

    _matchCurrentHref(routes) {
        const currentHref = window.location.href;
        let _index = -1;
        routes.forEach((child, index) => {
            child["href"] = child.href || this._createHrefByParams(child);
            if(currentHref.indexOf(child.href) !== -1) _index = index;
        });
        return _index >= 0 ? routes.slice(0, _index + 1) : [];
    }

    _createHrefByParams(spec) {
        const { path, query, hash } = spec;
        const { protocol, host } = window.location;
        if (!path) throw new Error("path must be have");
        let _href = `${protocol}//${host}${path}`;
        const _queryString = function(query) {
            let queryStr = "";
            for (let key in query) {
                queryStr = `${key}=${query[key]}${queryStr && "&"}${queryStr && queryStr}`
            }
            return queryStr;
        }
        if (query) {
            if (typeof query !== 'object') throw new Error("query must be Object!");
            _href = `${_href}?${_queryString(query)}`;
        }
        if (hash) {
            _href = `${_href}#${hash}`;
        }
        return _href;
    }

    _isLastItem(index, array) {
        return index == array.length - 1 ? null :
            <span className="dc-breadcrumb__separator">{this.state.separator}</span>
    }

    _enhanceItemComponent(child, index, array) {
        return (
            <div className="dc-breadcrumb__item" key={index}>
                <Item {...child}>
                    {child.component ? child.component : child.name}
                </Item>
                {
                    this._isLastItem(index, array)
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