import React, {Component} from 'react';
import {Content} from "./Content";

export class SubGroup extends Component{
    render() {
        const {label, content} = this.props;
        const renderList = typeof content === 'object' ? [content]: content;
        return (
            <div>
                <article>
                    {label}
                </article>
                <article>
                    {
                        renderList.map(child => {
                            const params = Object.assign({}, {content: child.children}, child.props);
                            return <Content {...params} key='11'/>
                        })
                    }
                </article>
            </div>
        )
    }
}