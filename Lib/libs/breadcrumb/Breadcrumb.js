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
            routes,
            separator: separator || "/"
        }
    }

    _renderBreadCrumbForCon() {
        const { routes } = this.props;
        return routes.map((child, index) => {
            return this._enhanceItemComponent(child);
        });
    }

    _renderBreadCrumbForDis() {

    }

    _enhanceItemComponent(child) {
        return (
            <div className="dc-breadcrumb__item">
                <Item {...child}>
                    {child.component ? child.component : child.name}
                </Item>
                <span>{this.state.separator}</span>
            </div>
        )
    }

    render() {
        const { mode = "concentrate" } = this.props;
        return (
            <div>
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
            <div className="dc-breadcrumb__item">
                <a href={href} className="dc-breadcrumb__a">
                    {children}
                </a>
            </div>
        )
    }
}