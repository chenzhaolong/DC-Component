import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons/index.es'

export function FaIcon(props) {

    const getFaIcon = (type) => {
        let firstChar = type.substr(0,1);
        let reg = new RegExp(firstChar);
        let bigFirstChar = firstChar.toUpperCase();
        return type.replace(reg, bigFirstChar);
    };

    const realIconType = (type) => {
        let arr = type.split('-');
        if (arr.length === 1) {
            return getFaIcon(type);
        } else {
            return arr.map(str => {
                return getFaIcon(str);
            }).join('');
        }
    };

    let {color, fontSize, className, icon} = props;
    let iconType = 'fa' + realIconType(icon);
    return (
        <div>
            <i style={{color, fontSize}} className={className}>
                <FontAwesomeIcon icon={fas[iconType]}/>
            </i>
        </div>
    )
}
