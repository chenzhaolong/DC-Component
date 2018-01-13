export const factoryStyle = (options) => {
    const {method, params, style = {}} = options;
    if (!method && Object.keys(style).length) return style;
    const polished = require('polished');
    if (!polished.hasOwnProperty(method)) return;
    let eleStyle = polished[method](params);
    return Object.assign(eleStyle, style);
}