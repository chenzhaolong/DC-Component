import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Col extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

Col.propTypes = {
    span: function(props, propName, componentName) {
        if (!props[propName]) {
            throw new Error(
                `span is required in ${componentName}`
            )
        }
        if (props[propName] < 0) {
            throw new Error(
                `Invalid prop ${propName} which is ${componentName}`
            )
        }
    }
}