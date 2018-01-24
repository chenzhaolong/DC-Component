import React, {Component} from 'react';
import {render} from 'react-dom';
import {Popover} from 'antd';
import {Button, Row, Col, Pop, Modal} from '../../Lib/index';
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
                <Button onClick={this.handle.bind(this)} type="dashed" data-key="1" icon="house" disabled={this.state.disabled}>click</Button>
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
                    trigger="hover"
                    content={
                        <div className="size">hesadf</div>
                    }
                    placement="right"
                    title="标题"
                >
                    <Button onClick={this.handle.bind(this)} type="dashed" data-key="1" title="btn" disabled={this.state.disabled}>click</Button>
                </Pop>
                <Pop
                    trigger="click"
                    content="hellow"
                    className="pop"
                    placement="bottom"
                >bottom</Pop>
                <Pop
                    trigger="click"
                    content="hellow"
                    className="pop"
                    placement="left"
                >left</Pop>
                <Pop
                    content="hellow"
                >right</Pop>
                <Modal
                    visible={true}
                    content="nisadf"
                    title="标题"
                >

                </Modal>
            </div>

        )
    }
}

render(<Demo/>, document.getElementById('app'));