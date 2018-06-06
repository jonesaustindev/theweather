import React, { Component } from 'react';

class Main extends Component {

    render() {
        const { summary, time, temperature, icon, precipProbability, errorText } = this.props;
        return (
            <div>
                <h1>TheWeather</h1>
                <div>
                    <p>{summary}</p>
                    <p>{time}</p>
                    <p>{temperature}</p>
                    <p>{icon}</p>
                </div>
            </div>
        );
    }
}

export default Main;