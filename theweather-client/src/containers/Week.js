import React, { Component } from 'react'

export default class Week extends Component {
  render() {
      const { weekSummary, weekIcon, weekForecast } = this.props;
    return (
      <div>
        <p>{weekSummary}</p>
        <p>{weekIcon}</p>
        <p>{weekForecast}</p>
      </div>
    )
  }
}
