import React, {Component} from 'react';
import {TabPanel, PanelTitle, PanelContent} from './TabPanel';

export class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _activeId: this.props.activeId,
        }
    }

    static createTabPanel() {
        return TabPanel;
    }

    _renderTabsTitle(children) {
        return React.Children.map(children, child => {
            const titleProps = Object.assign({}, child.props, {
                _activeId: this.state._activeId,
                effectType: this.props.effectType
            });
            return <PanelTitle {...titleProps}/>
        })
    }

    _renderTabsContent(children) {
        return React.Children.map(children, child => {
            const ContentProps = Object.assign({}, child.props, {
                _activeId: this.state._activeId,
            });
            return <PanelContent {...ContentProps}/>
        })
    }

    _changeTabTitle(e) {
        if (e.target.className.indexOf('dc-tabpanel-disabled') !== -1) return false;
        const _activeId = e.target.dataset.key;
        this.props.onChange(_activeId);
        this.setState({_activeId});
    }

    render() {
        const {children} = this.props;
        return (
            <div>
                <section className="dc-tabs" onClick={this._changeTabTitle.bind(this)}>
                    { this._renderTabsTitle(children) }
                </section>
                <section className="">
                    { this._renderTabsContent(children) }
                </section>
            </div>
        )
    }

    componentDidMount() {
    }
}

