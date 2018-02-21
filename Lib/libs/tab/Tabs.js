import React, {Component} from 'react';
import {findDOMNode} from 'react-dom'
import {TabPanel, PanelTitle, PanelContent} from './TabPanel';

export class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _activeId: this.props.activeId,
            childNodes: this.props.children,
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
        if (this._isDisabled(e.target)) return false;
        const _activeId = this._getActiveElementKey(e.target);
        if (this.props.effectType == 'slider') {
            this._computeSliderMove(_activeId);
        } else {
            this._panelTitleColor(_activeId);
        }
        if (this.props.onChange) this.props.onChange(_activeId);
        this.setState({_activeId});
    }

    _getActiveElementKey(ele) {
        let parent = ele;
        while (!parent.dataset.hasOwnProperty("key")) {
            parent = parent.parentNode;
        }
        return parent.dataset.key;
    }

    _computeSliderMove(key) {
        const slider = this.refs.slider;
        const child = this._panelTitleColor(key);
        const length = this._computedSliderLenght(child);
        this._computedStyle(slider, {
            'transition': 'left 0.5s',
            'left': `${length}px`
        });
    }

    _panelTitleColor(key) {
        const paneltitle = this.refs.paneltitle;
        const count = key - 1;
        const child = paneltitle.childNodes[count];
        for (let i = 0; i <= paneltitle.childNodes.length - 1; i++) {
            if (i !== count && !this._isDisabled(paneltitle.childNodes[i])) {

                this._computedStyle(paneltitle.childNodes[i], {color: '#000'});
            }
        }
        const activedColor = this.props.activedColor || '#108ee9';
        this._computedStyle(child, {'color': activedColor});
        return child;
    }

    _computedSliderLenght(child) {
        const _width = child.offsetWidth;
        const _left = child.offsetLeft;
        const _length = this.refs.slider.offsetWidth;
        if (_width <= _length) {
            return _left;
        } else {
            return _left + (_width - _length)/2;
        }
    }

    _computedStyle(node, style) {
        if (!style) return false;
        for (let key of Object.keys(style)) {
            node.style[key] = style[key];
        }
    }

    _isDisabled(ele) {
        return ele.className.indexOf('dc-tabpanel_disabled') !== -1;
    }

    render() {
        const {effectType} = this.props;
        return (
            <div>
                <section
                    className="dc-tabs__section_default"
                    onClick={this._changeTabTitle.bind(this)}
                    ref="paneltitle"
                >
                    { this._renderTabsTitle(this.state.childNodes) }
                    {
                        effectType == 'slider' && <div className="dc-panel_slider" ref="slider"></div>
                    }
                </section>
                <section className="">
                    { this._renderTabsContent(this.state.childNodes) }
                </section>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.effectType == 'slider') this._computeSliderMove(this.props.activeId);

    }
}

