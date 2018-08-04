/**
 *  file Condition条件选择组件
 */

import React from 'react';

export class Condition extends React.Component {
    static createCondition(spec) {
        return {
            If: createHoc(spec)(If),
            Else: createHoc(spec)(Else),
        }
    }
}

function createHoc(spec) {
    return (Com) => {
        return class extends React.Component{
            render() {
                return  <Com {...this.props} {...spec}/>
            }
        }
    }
}

class If extends React.Component{
    render() {
        const {children, value} = this.props;
        return (
            <div>
                { value ? children : null }
            </div>
        )
    }
}

class Else extends React.Component{
    render() {
        const {children, value} = this.props;
        return (
            <div>
                { value ? null : children }
            </div>
        )
    }
}