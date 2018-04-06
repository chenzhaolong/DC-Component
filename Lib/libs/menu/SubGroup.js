import React, {Component} from 'react';

export class SubGroup extends Component{
    render() {
        const {className, order, disabled = false, route, label} = this.props;
        const rootItemClass = ['dc-menu-item', className].join(' ');
        return (
            <div>
                <div>
                    <div className={rootItemClass}>{label}</div>
                    <div className='dc-sub-item'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}