import React, { Component } from 'react'

export default class LifeCycle extends Component {

    constructor(props) {
        super(props);

        console.log("init");

        this.state = { time: 12 }
    }

    componentWillMount() {
        console.log("willMount");
        this.setState({ time: 3 });

        const myPromise = new Promise(async function (resolve, reject) {
            const data = await fetch('https://js-asnet-api.herokuapp.com/employees');

            resolve(data.json());
            reject();
        });

        myPromise.then(function (data) { console.log() }, function () {
            console.log("error");
        })

    }

    componentDidMount() {
        console.log("didMount");
    }
    render() {
        console.log("render")
        return (
            <div>{this.state.time}</div>
        )
    }
}
