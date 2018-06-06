import React, { Component } from 'react';
import { apiCall } from './services/api';
import Navbar from './components/Navbar';
import Main from './components/Main';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorText: '',
      loading: false
    };
  }

  callWeatherApi = async (latitude, longitude, location) => {
    let response = await fetch(`/api/current?latitude=${latitude}&longitude=${longitude}`);
    let body = await response.json();

    if (body.cod === 404) {
      throw Error(body.message);
    } else {
      // this.callUnsplashApi(body.name)
      this.setState({
        errorText: '',
        summary: body.summary,
        icon: body.icon,
        precipProbability: body.precipProbability,
        temperature: body.temperature,
        precipType: body.precipType,
        time: body.time,
        loading: false
      })
      return body;
    }
  }

  callUnpslashApi = async (location) => {
    let response = await fetch(`/api/unsplash?location=${location}`);
    let body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    const randomPhotoNumber = Math.floor(Math.random() * 10);
    this.setState({
      currentCityImage: body[randomPhotoNumber].urls.regular,
      userFirstName: body[randomPhotoNumber].user.first_name,
      userProfileLink: body[randomPhotoNumber].user.links.html,
      userProfileImage: body[randomPhotoNumber].user.profile_image.medium
    });
    return body;
  }

  getCoords() {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
        this.callWeatherApi(position.coords.latitude,
          position.coords.longitude,
          "geo")
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
      }, (error) => {
        this.setState({
          error: error.message,
        });
      });
    }
  }

  setCoordsFromLocalStorage(cachedLat, cachedLon) {
    this.setState({
      latitude: cachedLat,
      longitude: cachedLon
    }, () => {
      this.callWeatherApi(this.state.latitude, this.state.longitude, "geo")
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));
    });
  }

  changeLocation(location) {
    this.setState({
      location: location
    }, () => {
      this.callWeatherApi('latitude', 'longitude', this.state.location)
        .then(res => this.setState({ response: res.express }))
        .catch(err => this.setState({
          errorText: 'city/state does not exist',
        }),
          console.log(this.state.errorText)
        );
    });
  }

  componentDidMount() {
    let cachedLat = localStorage.getItem('latitude');
    let cachedLon = localStorage.getItem('longitude');

    cachedLat ?
      this.setCoordsFromLocalStorage(cachedLat, cachedLon) :
      this.getCoords();
  }

  render() {
    return (
      <div className="App">
        <Navbar
          // errorClass={this.state.errorClass}
          onSubmit={this.changeLocation}
          onClick={this.changeLocation}
        />
        {
          this.state.loading ?
            <div className='loading'><p>Loading...</p></div> :
            <Main
              errorText={this.state.errorText}
              formError={this.state.formError}
              location={this.state.location}
              lat={this.state.latitude}
              lon={this.state.longitude}
              summary={this.state.summary}
              icon={this.state.icon}
              precipProbability={this.state.precipProbability}
              temperature={this.state.temperature}
              time={this.state.time}
              precipType={this.state.precipType}
            />
        }
      </div>
    );
  }
}

export default App;
