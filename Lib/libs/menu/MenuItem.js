import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './menu.css';

export class MenuItem extends Component{
    componentDidMount() {

    }

    // 路由地址
    _itemRoute(route) {
        const {host, protocol} = window.location;
        const baseHost = `${protocol}//${host}`;
        return baseHost + route;
    }

    render() {
        const {className, order, disabled = false, route} = this.props;
        const rootItemClass = ['dc-menu-item', className].join(' ');
        const _href = route && this._itemRoute(route);
        return (
            <div>
                <div
                    className={rootItemClass}
                    data-key={order}
                    data-disabled={disabled}
                    data-href={_href}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}

MenuItem.propTypes = {
    order: PropTypes.string.isRequired,
};