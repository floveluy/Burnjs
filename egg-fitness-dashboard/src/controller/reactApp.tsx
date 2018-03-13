import * as React from 'react'

export default class Hello extends React.Component<{ name: string }> {
    click = () => {
        console.log('点击')
    }
    componentWillMount() {
        console.log('componentWillMount')
    }

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <button onClick={this.click}>看看到底更新了没有</button>
            </div>
        )
    }
}
