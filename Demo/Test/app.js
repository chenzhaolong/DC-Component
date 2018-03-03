import React, {Component} from 'react';
import {render} from 'react-dom';
import {Popover} from 'antd';
import {Button, Row, Col, Pop, Modal, Icon, Switch, Tabs, Transverter, Breadcrumb} from '../../Lib/index';
import './app.css';
import classNames from 'classnames';


const {confirm} = Modal;
const TabPanel = Tabs.createTabPanel();
const listData = {
    id: 2,
    usrId: 10232334,
    code: 100,
    list: [
        {first: '百度', second: "百度金融", workyear: 2},
        {first: '腾讯', second: "微众银行", workyear: 0},
        {first: '阿里巴巴', second: "蚂蚁金服", workyear: 2},
        {first: '其他', second: "陆金所", workyear: 0},
    ]
};

const mapper = [
    {source: "first", target: "name"},
    {source: "second", target: "content"},
];

const personData = {
    code: 100,
    msg: 'success',
    show: {
        personName:'dragon',
        personage:"23",
        persondata: '2017.02.12',
        persontel: '2193213213',
        school: 'jnu',
        id: 1,
    }
};

const personMap = [
    {source: 'personName', target: 'name'},
    {source: 'personage', target: 'age'},
    {source: 'persondata', target: 'date'},
    {source: 'persontel', target: 'tel'},
    // {source: 'school', target: 'school'},
];

const BreadRotes = [
    {name: "一级路由", href: 'http://127.0.0.1:8089/one', className: "one"},
    {name: "二级路由", path: "/one/two/three", query: {a1:1, a2: 2}, hash: "123", prefix: "data", className: "three"},
    {name: "三级路由", href: 'http://127.0.0.1:8089/one/two', className: "two"},
];

const Item = Breadcrumb.createItem();

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
                    type="primary" data-key="1"
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
                    <Icon type="phone" width="20px" height="20px"/>
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
                    effectType="background"
                    activeId="2"
                    onChange={this.SwitchHandle.bind(this)}
                >
                    <TabPanel name={<Text/>} order="1">tab1</TabPanel>
                    <TabPanel name="tab 2" order="2">士大夫</TabPanel>
                    <TabPanel name="tab 3" order="3" disabled>士大夫2</TabPanel>
                    <TabPanel name="tab 4" order="4" disabled>士大夫3</TabPanel>
                    <TabPanel name="tab 5" order="5">士大夫4</TabPanel>
                    <TabPanel name="tab 6" order="6">士大夫5</TabPanel>
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
                {/*<Transverter*/}
                    {/*inputSource={personData}*/}
                    {/*mapper={personMap}*/}
                    {/*puppetmainsource="show"*/}
                    {/*puppetmainprops="obj"*/}
                    {/*puppetothersource={{className:"test-demo"}}*/}
                    {/*Puppet={Test}*/}
                {/*/>*/}
                <Breadcrumb
                    mode="concentrate"
                    routes={BreadRotes}
                />
                <div>
                    <a href="http://127.0.0.1:8089/one/two">跳转三级路由</a>
                    <br/>
                    <a href="http://127.0.0.1:8089/data/one/two/three?a1=1&a2=2#123">跳转二级路由</a>
                </div>
                <Breadcrumb mode="distribution">
                    <Item href="http://127.0.0.1:8089/one" className="first">第一级</Item>
                    <Item href="http://127.0.0.1:8089/one/two" className="second">第二级</Item>
                    <Item route={{path: "/one/two/three", query: {a1:1, a2: 2}, hash: "123", prefix: "data"}}>第三极</Item>
                </Breadcrumb>
            </div>
        )
    }
}

class Text extends Component {
    render() {
        return <div>
            <p style={{margin: 0}}>hello baidu ！</p>
        </div>
    }
}

class Test extends Component{
    render() {
        const {obj} = this.props;
        return (
            <div className={this.props.className}>
                <p>名字{obj.show.name}</p>
                <p>年龄{obj.show.age}</p>
                <p>出生{obj.show.date}</p>
                <p>电话{obj.show.tel}</p>
                <p>学历{obj.show.school}</p>
            </div>
        )
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