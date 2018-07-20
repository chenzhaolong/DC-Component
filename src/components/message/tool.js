import {render} from 'react-dom';
import React, {Component, PureComponent} from 'react';

/**
 *  create a element of root in body
 *  @param: tag is a tag of a element of html
 *  @param: id is a attribute of this element
 * */
function createRootElement(tag, id) {
    const ele = document.createElement(tag);
    ele.id = id;
    document.body.appendChild(ele);
}

/**
 *  remove a element of id
 * */
export function removeRootElement(id) {
    const ele = document.getElementById(id);
    document.body.removeChild(ele);
}


/**
 *  create HOC
 * */
function createHoc(Com, spec) {
    return class extends Component {
        render() {
            let option = Object.assign({}, spec, {removeRootElement});
            return (
                <div>
                    <Com {...option}/>
                </div>
            )
        }
    }
}


/**
 *  render the component of Confirm in the body
 *  @param: Com is a component
 * */
export function _renderComponent(tag, id) {
    createRootElement(tag, id);
    return function (Com, spec) {
        const RenderCom = createHoc(Com, spec);
        render(<RenderCom/>, document.getElementById(id))
    }
}