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
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { id: "root" }),
            React.createElement("button", { onClick: this.click }, "\u70B9\u51FB\u6211\u540C\u6B65\u6E32\u67D3"),
            React.createElement("script", { src: "/public/react-dragger-layout.js" })));
    }
}
exports.default = Hello;
