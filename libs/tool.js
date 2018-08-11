import {render} from 'react-dom';
import React, {Component, PureComponent} from 'react';

/**
 *  create a element of root in body
 *  @param: tag is a tag of a element of html
 *  @param: id is a attribute of this element
 * */
export function createRootElement(tag, id, className, style) {
    const ele = document.createElement(tag);
    if (id) {
        ele.id = id;
    }
    if (className) {
        ele.className = className;
    }
    if (style) {
        ele.style = style;
    }
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
export function createHoc(Com, spec) {
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
export function _renderComponent(tag, id, className) {
    createRootElement(tag, id, className);
    return function (Com, spec) {
        const RenderCom = createHoc(Com, spec);
        let rootEle;
        if (id) {
            rootEle = document.getElementById(id);
        } else {
            rootEle = document.body.lastElementChild;
        }
        render(<RenderCom/>, rootEle)
    }
}

/**
 *
 */
export function renderChild(id, Com)  {
    const rootEle = document.getElementById(id);
    render(<Com/>, rootEle);
}