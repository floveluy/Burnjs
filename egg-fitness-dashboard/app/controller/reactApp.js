"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Hello extends React.Component {
    constructor() {
        super(...arguments);
        this.click = () => {
            console.log('点击');
        };
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, this.props.name),
            React.createElement("button", { onClick: this.click }, "\u770B\u770B\u5230\u5E95\u66F4\u65B0\u4E86\u6CA1\u6709")));
    }
}
exports.default = Hello;
