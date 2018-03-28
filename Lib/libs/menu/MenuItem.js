import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './menu.css';

export class MenuItem extends Component{
    componentDidMount() {

    }

    render() {
        const {className, order} = this.props;
        const rootItemClass = ['dc-menu-item', className].join(' ');
        return (
            <div className={rootItemClass} data-key={order}>
                {this.props.children}
            </div>
        )
    }
}

MenuItem.propTypes = {
    order: PropTypes.string.isRequired,
};