import React, { Component } from 'react';

class Navbar extends Component {

    handleChange(e) {
        e.preventDefault();
        const location = this.textInput.value;
        this.props.onClick(location);
        this.textInput.value = '';
        this.callSearchApi(location);
    }

    callSearchApi = async (location) => {
        
    }

    // callWeatherApi = async (latitude, longitude, location) => {
    //     let response = await fetch(`/api/current?latitude=${latitude}&longitude=${longitude}`);
    //     let body = await response.json();
    
    //     if (body.cod === 404) {
    //       throw Error(body.message);
    //     } else {
    //       // this.callUnsplashApi(body.name)
    //       this.setState({
    //         errorText: '',
    //         summary: body.summary,
    //         icon: body.icon,
    //         precipProbability: body.precipProbability,
    //         temperature: body.temperature,
    //         precipType: body.precipType,
    //         time: body.time,
    //         loading: false
    //       })
    //       return body;
    //     }
    //   }

    render() {
        return (
            <form onSubmit={this.handleChange}>
                <input className={this.props.errorClass} type="text" ref={(input) => {
                    this.textInput = input;
                }} />
                <button onClick={this.handleChange}>Submit</button>
            </form>
        );
    }
}

export default Navbar;