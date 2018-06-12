import React, { Component } from 'react'
import HourCard from '../components/HourCard';

export default class Hour extends Component {
  render() {
    const { hourSummary, hourIcon, hourForecast } = this.props;
    return (
      <div>
        <h3>{hourSummary}</h3>
        <span>{hourIcon}</span>
        
      </div>
    )
  }
}
