// 载体组件和展示性组件
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export class MenuItem extends PureComponent{
    render() {
        return (
            <div>
                {this.props.content}
            </div>
        )
    }
}

MenuItem.propTypes = {
    order: PropTypes.string.isRequired,
};