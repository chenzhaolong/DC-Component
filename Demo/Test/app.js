import React, {Component} from 'react';
import {render} from 'react-dom';
import {Popover} from 'antd';
import {Button, Row, Col, Pop, Modal, Icon, Switch, Tabs, Transverter} from '../../Lib/index';
import './app.css';
import classNames from 'classnames';


const {confirm} = Modal;
const TabPanel = Tabs.createTabPanel();
const listData = {
    id: 2,
    list: [
        {first: '百度', second: "百度金融"},
        {first: '腾讯', second: "微众银行"},
        {first: '阿里巴巴', second: "蚂蚁金服"}
    ]
};
const mapper = [
    {source: "first", target: "name"},
    {source: "second", target: "content"},
]

class Demo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            time: 0,
            show: false,
            confirmShow: false,
        }
    }
    handle() {
        let time = this.state.time + 1;
        if (time <= 5) {
            this.setState({time, show: true})
        } else {
            this.setState({time: 0, disabled: true, show: true})
        }
    }
    cancel() {
        this.setState({show: false});
    }
    sure() {
        this.setState({confirmShow: true}, () => {
            setTimeout(function () {
                this.setState({show: false, confirmShow: false});
            }.bind(this), 5000)
        })
    }
    showConfirm() {
        confirm({
            type: 'success',
            title: 'Want to delete these items?',
            content: 'some descriptions',
            musk: false,
            onSure() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    SwitchHandle(value) {
        console.log(`this is ${value}`);
    }
    render() {
        // const database = DeptShop.changeData(listData.list, mapper);
        // const a = {id: listData.id, list: database};
        // console.log('database:',database);
        return (
            <div>
                <Button
                    onClick={this.handle.bind(this)}
                    type="dashed" data-key="1"
                    icon="house"
                    disabled={this.state.disabled}
                >click</Button>
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
                >
                    <Icon type="house" width="20px" height="20px"/>
                </Pop>
                <Modal
                    visible={this.state.show}
                    musk={true}
                    content={<Text/>}
                    title="标题"
                    onCancel={this.cancel.bind(this)}
                    onSure={this.sure.bind(this)}
                    confirmLoading={this.state.confirmShow}
                    text={{cancel: '去取消', sure: '请购物'}}
                >
                </Modal>
                <Button
                    onClick={this.showConfirm.bind(this)}
                    type="dashed"
                >confirm</Button>
                <Switch
                    defaultChecked={false}
                    onChange={this.SwitchHandle.bind(this)}
                    checkTxt="开"
                    unCheckTxt="关"
                />
                <Tabs
                    effectType="slider"
                    activeId="2"
                    onChange={this.SwitchHandle.bind(this)}
                    mode="add"
                >
                    <TabPanel name="tab 1" order="1">tab1</TabPanel>
                    <TabPanel name="tab 2" order="2">士大夫</TabPanel>
                    <TabPanel name="tab 3" order="3" disabled>士大夫2</TabPanel>
                    <TabPanel name="tab 4" order="4">士大夫3</TabPanel>
                    <TabPanel name="tab 5" order="5">士大夫4</TabPanel>
                </Tabs>
                {/*<DeptShop data={a}/>*/}
                <Transverter
                    inputSource={listData}          // 数据来源
                    mapper={mapper}                 // 映射表
                    puppetmainsource="list"              // 组件数据主来源
                    puppetmainprops="data"                // 木偶组件主要属性
                    puppetothersource={{a1: 1, a2: 2}}         // 木偶组件数据其他属性
                    Puppet={DeptShop}                    // 木偶组件
                />
            </div>
        )
    }
}

class Text extends Component {
    render() {
        return <div>
            <p>hello baidu ！</p>
        </div>
    }
}

class DeptShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopData: this.props.data,
            show: false,
        }
    }
    // 该组件的数据字段转换器
    static changeData(data, mapperArr) {
        if (data instanceof Array) {
            const objArr = [];
            data.forEach(li => {
                const obj = {};
                mapperArr.forEach(item => {
                    obj[item.target] = li[item.source];
                });
                objArr.push(obj);
            });
            return objArr;
        }
        if (typeof data == 'object') {
            const obj = {};
            mapperArr.forEach(item => {
                obj[item.target] = data[item.source];
            });
            return obj;
        }
    }

    showTab() {
        const { show } = this.state;
        this.setState({show: !show});
    }

    showContent(list) {
        let i = 0;
        return list.map(item => {
            i = i + 1;
            return <TabPanel name={item.name} order={i}>{item.content}</TabPanel>
        })
    }

    renderTab(shopData) {
        const { id, list } = shopData;
        return (
            <Tabs
                effectType="slider"
                activeId={id}
                mode="add"
            >
                {this.showContent(list)}
            </Tabs>
        )
    }

    render() {
        const { show, shopData } = this.state;
        return (
            <div>
                <Button onClick={this.showTab.bind(this)} type="primary">Tabs</Button>
                {
                    show ? this.renderTab(shopData) : null
                }
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));