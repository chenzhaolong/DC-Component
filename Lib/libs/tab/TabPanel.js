import React, {Component} from 'react';
import './tab.css'

export class TabPanel extends Component{
    render() {
        return null
    }
}

export class PanelTitle extends Component{
    constructor(props) {
        super(props);
        this.state = {
            _defaultClass: ['dc-tabpanel'],
        }
    }

    _PanelTitleStyleForDefault() {
        const { effectType = "background" } = this.props;
        const panelClassList = this.state._defaultClass;
        if (effectType == "background") {
            panelClassList.push('dc-tabpanel_default');
        } else {
            panelClassList.push('dc-tabpanel-underline');
        }
        return panelClassList;
    }

    _PanelTitleStyleForActiveOfBg(panelClassList, _activeId) {
        if (this.props.order == _activeId) {
            panelClassList.push('dc-tabpanel_actived');
        } else if (panelClassList.indexOf('dc-tabpanel_actived') !== -1) {
            const index = panelClassList.indexOf('dc-tabpanel_actived');
            panelClassList.splice(index, 1);
        }
        this.setState({_defaultClass: panelClassList});
    }

    _PanelTitleStyleForDisabled(panelClassList) {
        panelClassList.push('dc-tabpanel_disabled');
        this.setState({_defaultClass: panelClassList});
    }

    componentWillMount() {
        let panelClassList = this._PanelTitleStyleForDefault();
        if (this.props.disabled) {
            this._PanelTitleStyleForDisabled(panelClassList);
        } else {
            this._PanelTitleStyleForActiveOfBg(panelClassList, this.props._activeId);
        }
    }

    componentWillReceiveProps(newProps) {
        this._PanelTitleStyleForActiveOfBg(this.state._defaultClass, newProps._activeId);
    }

    render() {
        const { name,  order, disabled } = this.props;
        const { _defaultClass } = this.state;
        return (
            <div
                className={_defaultClass.join(" ")}
                data-key={order}
                data-disabled={disabled}
            >
                {name}
            </div>
        )
    }
}

export class PanelContent extends Component{
    render() {
        const { order,  children, _activeId} = this.props;
        return (
            <div
                className="dc-tabcontent"
                data-key={order}
            >
                {
                    order == _activeId ? children : null
                }
            </div>
        )
    }
}