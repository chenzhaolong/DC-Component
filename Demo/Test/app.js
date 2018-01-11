import React, {Component} from 'react';
import {render} from 'react-dom';
// import {Button} from 'antd';
import {Button} from '../../Lib/index';
import './app.css';

class Demo extends Component{
    handle() {
        console.log('here')
    }
    render() {
        return (
            <div>
                <Button type='dashed' onClick={this.handle.bind(this)}>primary</Button>
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));