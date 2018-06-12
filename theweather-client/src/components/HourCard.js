import React, { Component } from 'react';

class HourCard extends Component {
    render(){
        return(
            <li>{this.props.hourForecast}</li>
        )
    }
}

export default HourCard;