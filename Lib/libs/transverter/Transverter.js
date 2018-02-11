import React, {Component} from 'react';

export class Transverter extends Component{
    constructor(props) {
        super(props);
        const { inputSource, mapper } = this.props;
        this.state = {
            _inputSource: inputSource,
            _mapper: mapper,
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            _inputSource: newProps.inputSource,
            _mapper: newProps.mapper,
        })
    }

    _transformData() {
        const { _inputSource, _mapper } = this.state;
        if (_inputSource instanceof Array) {
            const objArr = [];
            _inputSource.forEach(li => {
                const obj = {};
                _mapper.forEach(item => {
                    obj[item.target] = li[item.source];
                });
                objArr.push(obj);
            });
            return objArr;
        }
        if (typeof _inputSource == 'object') {
            const obj = {};
            _mapper.forEach(item => {
                obj[item.target] = _inputSource[item.source];
            });
            return obj;
        }
    }

    _newComponent() {
        const { Puppet } = this.props;
        return class extends Puppet{
            render() {
                return super.render()
            }
        }
    }

    _puppetProps(data) {
        const a1 = this.props.outerSource;
        const obj = {};
        obj[a1] = {id: 2, list: data};
        return obj;
    }

    render() {
        const PuppetComponent =  this._newComponent();
        const _innerData = this._transformData();
        const puppetData = this._puppetProps(_innerData);
        return (
            <div>
                {
                    <PuppetComponent {...puppetData}/>
                }
            </div>
        )
    }
}