/**
 *  Transverter组件最多只支持数据结构为两层的数据转换
 * */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class Transverter extends Component{
    constructor(props) {
        super(props);
        const { inputSource, mapper, puppetothersource } = this.props;
        this.state = {
            _inputSource: inputSource,    // 数据输入来源
            _mapper: mapper,              // 数据转换映射表
            _secondProps: puppetothersource       // 木偶组件其他数据来源
        }
    }

    /**
     *  数据转换器
     *  对于一层数据结构，直接做数据分流；
     *  对于二层数据结构，在mainSource中选择对应的数据进行
     *  数据分流处理；
     * */
    _transformData() {
        const { puppetmainsource } = this.props;
        const { _inputSource, _mapper } = this.state;
        if (puppetmainsource) {
            return this._dataShunt(_inputSource[puppetmainsource], _mapper);
        } else {
             return this._dataShunt(_inputSource, _mapper);
        }
    }

    // 数据类型分流器
    _dataShunt(data, mapper) {
        if (data instanceof Array) {
            return this._transformArray(data, mapper);
        }
        if (typeof data == "object") {
            return this._transformObject(data, mapper);
        }
        return data;
    }

    // 对象类型转换器
    _transformObject(data, mapper) {
        const obj = {};
        mapper.forEach(_map => {
            obj[_map.target] = data[_map.source]
        });
        return obj;
    }

    // 数组类型转换器
    _transformArray(data, mapper) {
        const objArr = [];
        data.forEach(_list => {
            const listObj = this._transformObject(_list, mapper);
            objArr.push(listObj);
        });
        return objArr;
    }

    _puppetProps(data) {
        const mainProps = this._puppetMainProps(data);
        const { _secondProps } = this.state;
        return Object.assign({}, mainProps, _secondProps);
    }

    // 木偶组件主要属性
    _puppetMainProps(data) {
        const { _inputSource } = this.state;
        const { puppetmainsource, puppetmainprops } = this.props;
        let prop1 = {};
        if (puppetmainsource) {
            prop1[puppetmainsource] = data;
        } else {
            prop1 = data;
        }
        prop1 = Object.assign({}, _inputSource, prop1);
        let prop2 = {};
        prop2[puppetmainprops] = prop1;
        return prop2;
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            _inputSource: newProps.inputSource,
            _mapper: newProps.mapper,
            secondProps: newProps.puppetothersource,
        })
    }

    render() {
        const { Puppet } = this.props;
        const _innerData = this._transformData();
        const puppetData = this._puppetProps(_innerData);
        return (
            <div>
                {
                    <Puppet {...puppetData}/>
                }
            </div>
        )
    }
}

Transverter.propTypes = {
    inputSource: PropTypes.object.isRequired,
    mapper: PropTypes.array.isRequired,
    puppetmainprops: PropTypes.string.isRequired,
    Puppet: function(props, propName, componentName) {
        if (!props[propName]) {
            throw new Error(
                `${propName} is required in ${componentName}`
            )
        }
    }
}