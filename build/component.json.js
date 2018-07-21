/**
 * @file 将component目录下的组件记录
 * 在对应的compo.json文件中
 */

let fs = require('fs-extra');

module.exports = {
    readLocation(dir) {
        let json = {};
        let location = fs.readdirSync(dir);
        location = location.filter(dir => {
           return ['.DS_Store', 'index.js'].indexOf(dir) === -1;
        });
        location.forEach(secDir => {
            let relativePath = `${dir}${secDir}/`;
            let _location = fs.readdirSync(relativePath);
            let file = _location.filter(val => {
                return val.indexOf('js') !== -1;
            })[0];
            let _componentDir = `/lib/${secDir}/${secDir}`;
            json[_componentDir] = `./src/components/${secDir}/${file}`;
        });
        json['index'] = './src/components/index.js';
        return json;
    }
};