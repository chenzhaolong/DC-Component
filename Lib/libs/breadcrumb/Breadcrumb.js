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
        let _index = -1;
        routes.forEach((child, index) => {
            if(this._matchCurrentHref(child.href)) _index = index;
        });
        const _routes = _index >= 0 ? routes.slice(0, _index + 1) : [];
        return _routes.map((child, index, array) => {
            return this._enhanceItemComponent(child, index, array);
        });
    }

    _renderBreadCrumbForDis() {

    }

    _matchCurrentHref(href) {
        const currentHref = window.location.href;
        return currentHref.indexOf(href) !== -1;
    }

    _isLastItem(index, array) {
        return index == array.length - 1;
    }

    _enhanceItemComponent(child, index, array) {
        return (
            <div className="dc-breadcrumb__item" key={index}>
                <Item {...child}>
                    {child.component ? child.component : child.name}
                </Item>
                {
                    this._isLastItem(index, array) ? null
                        : <span className="dc-breadcrumb__separator">{this.state.separator}</span>
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
    render() {
        const { children, href } = this.props;
        return (
            <span className="dc-breadcrumb__item">
                <a href={href} className="dc-breadcrumb__a">
                    {children}
                </a>
            </span>
        )
    }
}