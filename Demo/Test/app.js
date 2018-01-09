import React, {Component} from 'react';
import {render} from 'react-dom';
// import {Button} from 'antd';
import {Button} from '../../Lib/index';

class Demo extends Component{
    render() {
        return (
            <div>
                <Button type='dangers'>danger</Button>
            </div>
        )
    }
}

render(<Demo/>, document.getElementById('app'));