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
                <Button onClick={this.handle.bind(this)} icon="search">loading</Button>
                <Row marginRight="15">
                    <Col span={3} className="col1">COL-1</Col>
                    <Col span={3} >COL-2</Col>
                </Row>
                <Row marginTop="10">
                    <Col span={2}>COL-3</Col>
                    <Col span={4}>COL-4</Col>
                    <Col span={5}>COL-5</Col>
                </Row>
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));