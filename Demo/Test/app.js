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
                <Button onClick={this.handle.bind(this)} icon="loading">button</Button>
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));