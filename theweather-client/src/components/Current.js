import React, { Component } from 'react'

export default class Current extends Component {
  render() {
    const { currentTemperature, currentSummary, currentTime, currentIcon, currentPrecipType, currentPrecipProbability } = this.props;
    return (
      <div className="container">
        <div class="card text-center">
          <div class="card-header">
            City Name
          </div>
          <div class="card-body">
            <h5 class="card-title">{currentTemperature}</h5>
            <p class="card-text">{currentSummary}</p>
            <span>{currentPrecipType}</span>
            <span>{currentPrecipProbability}</span>
            </div>
          <div class="card-footer text-muted">
          {currentTime}
          </div>
        </div>
      </div>
    )
  }
}