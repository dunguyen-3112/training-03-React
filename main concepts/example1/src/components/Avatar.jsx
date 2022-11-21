import React, { Component } from 'react'

export default class Avatar extends Component {

    constructor(props) {
        super(props)
        this.state = { url: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/313416403_1477608229405631_5960254183256243505_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=adX_tq4Dg6gAX9kG53I&_nc_ht=scontent.fhan3-1.fna&oh=00_AfC5ZT_2QwK4M32dEB_1AMfGEq3JxMETFcwAbzN6tTVskg&oe=6363F4F5' }
        this._handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.setState({ url: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t39.30808-6/313423247_1477608306072290_9086702773444801888_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=7mspBpK6FMAAX9y04U5&_nc_ht=scontent.fhan3-1.fna&oh=00_AfB6JkYpuHGgWAKziV5Dq_cnmPra_1RscpgNDFGDLR32SQ&oe=63639131' })
    }
    render() {
        return (
            <div>
                <img src={this.state.url} alt="" onClick={this._handleClick} />
            </div>
        )
    }
}
