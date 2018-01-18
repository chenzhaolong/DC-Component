import React, {Component} from 'react';
import {render} from 'react-dom';
import {Popover} from 'antd';
import {Button, Row, Col, Pop} from '../../Lib/index';
import './app.css';

class Demo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            time: 0
        }
    }
    handle() {
        let time = this.state.time + 1;
        if (time <= 5) {
            this.setState({time})
        } else {
            this.setState({time: 0, disabled: true})
        }
    }
    render() {
        return (
            <div>
                <Button onClick={this.handle.bind(this)} type="dashed" data-key="1" title="btn" disabled={this.state.disabled}>click</Button>
                <Row marginTop="15"  className="dcs">
                    <Col span={3} className="col1" order="4">COL-1</Col>
                    <Col span={2} className="col1" order="3">COL-2</Col>
                    <Col span={3} order="5">COL-3</Col>
                    <Col span={1}>COL-4</Col>
                    <Col span={2}>COL-5</Col>
                </Row>
                <Row marginTop="10">
                    <Col span={2}>COL-3</Col>
                    <Col span={4}>COL-4</Col>
                    <Col span={5}>COL-5</Col>
                </Row>
                <Pop
                    trigger="click"
                    content="你好"
                    className="pop"
                >冒泡</Pop>
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));