import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest';
import Current from '../components/Current';
import Hour from '../containers/Hour';
import Week from '../containers/Week';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    // this.callWeatherApi = this.callWeatherApi.bind(this);
  }

  componentDidMount() {
    this.callWeatherApi();
  }

  callWeatherApi = async () => {
    let response = await fetch(`/api/search?latitude=33.5207&longitude=-86.8025`);
    let body = await response.json();

    if (body.cod === 404) {
      throw Error(body.message);
    } else {
      this.callUnsplashApi();
      this.setState({
        loading: false,
        // current //
        currentTemperature: body.currentTemperature,
        currentSummary: body.currentSummary,
        currentTime: body.currentTime,
        currentIcon: body.currentIcon,
        currentPrecipType: body.currentPrecipType,
        currentPrecipProbability: body.currentPrecipProbability,
        // hourly //
        hourSummary: body.hourSummary,
        hourIcon: body.hourIcon,
        hourForecast: body.hourForecast,
        // week //
        // weekSummary: body.weekSummary,
        // weekIcon: body.weekIcon,
        // weekForecast: body.weekForecast
        week: body.daily
      })
      return body;
    }
  }

  callUnsplashApi = async (location) => {
    let response = await fetch(`api/unsplashPhoto?location=${location}`);
    let body = await response.json();
    console.log(body);
  }

  onSuggestSelect(location) {
    let locationObject = location;
    console.log(locationObject);
  }

  render() {
    const { currentTemperature, currentSummary, currentTime, currentIcon, currentPrecipType, currentPrecipProbability, hourSummary, hourIcon, hourForecast } = this.state;
    return (
      <div>
        {
          this.state.loading ?

            <div className="loading"><p>Loading...</p></div> :

            <div>
              <Geosuggest
                placeholder="Enter a location"
                onSuggestSelect={this.onSuggestSelect}
                onChange={this.onChange}
              />
              <Current
                currentTemperature={currentTemperature}
                currentSummary={currentSummary}
                currentTime={currentTime}
                currentIcon={currentIcon}
                currentPrecipType={currentPrecipType}
                currentPrecipProbability={currentPrecipProbability}
              />
            </div>
        }
      </div>
    )
  }
}
