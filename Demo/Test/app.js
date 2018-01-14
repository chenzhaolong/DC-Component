import React, {Component} from 'react';
import {render} from 'react-dom';
// import {Row, Col} from 'antd';
import {Button, Row, Col} from '../../Lib/index';
import './app.css';

class Demo extends Component{
    handle() {
        console.log('here')
    }
    render() {
        return (
            <div>
                <Button onClick={this.handle.bind(this)} icon="loading" loading>button</Button>
                <Row>
                    <Col span={3}>COL-1</Col>
                    <Col span={3}>COL-2</Col>
                </Row>
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));