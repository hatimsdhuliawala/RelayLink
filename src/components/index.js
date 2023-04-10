'use strict';

import React from 'react';
import RelayLinkComponent from './relayLink';
import LoginPage from './loginPage'
import axios from 'axios';
import  ITSDATA from '../data/itsData'
const SteinStore = require("stein-js-client");


class RelayComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
    }

    this.logout = this.logout.bind(this);
    this.setITSNumber = this.setITSNumber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let logInData = window.sessionStorage.getItem("isLoggedIn")
    this.setState({
      isLoggedIn: (logInData && logInData === 'true') ? true : false,
    })
  }

  logout() {
    this.setState({
      isLoggedIn:false,
      ITSNumber: '',
      isLoading: false,
      errorState: false,
    })
    window.sessionStorage.setItem("isLoggedIn", false)
  }

  setITSNumber(value) {
    this.setState({
      ITSNumber:value,
    })
  }


  handleSubmit() {
      this.setState({
        isLoading: true,
      })

    // Handling with local json file
      if(ITSDATA.ITSNUMBERS.includes(Number(this.state.ITSNumber))) {
        this.setState({
          errorState: false,
          isLoggedIn: true,
          isLoading: false,
        });
        window.sessionStorage.setItem("isLoggedIn", true)
      } else {
        this.setState({
          errorState: true,
          isLoggedIn: false,
          isLoading: false,
        });
        window.sessionStorage.setItem("isLoggedIn", false)
      }

      //  Handling with Google Sheets

    //   let url = 'https://sheet2api.com/v1/cTIVlAVaSOSt/relay-link'
    //   axios.get(url).then(response => {
    //     this.setState({
    //       isLoading: false,
    //     })
    //     let VALIDITSNUMBER = response.data.find(data => data.ITSNumber === Number(this.state.ITSNumber.trim()))
    //
    //     console.log(VALIDITSNUMBER)
    //     if (Object.keys(VALIDITSNUMBER).length === 0) {
    //       this.setState({
    //         errorState: true,
    //         isLoggedIn: false,
    //       });
    //       window.sessionStorage.setItem("isLoggedIn", false)
    //     } else {
    //       this.setState({
    //         errorState: false,
    //         isLoggedIn: true,
    //       });
    //
    //       window.sessionStorage.setItem("isLoggedIn", true)
    //     }
    // }).catch((error, data) => {
    //   this.setState({errorState: true});
    // })
  }


  render() {
    return (
      <div>
        {
          this.state.isLoggedIn ?
          <RelayLinkComponent logout={this.logout}/> :
           <LoginPage
            handleSubmit={this.handleSubmit}
            setITSNumber={this.setITSNumber}
            ITSNumber={this.state.ITSNumber}
            isLoading={this.state.isLoading}
            ITSNumber={this.state.ITSNumber}
            errorState={this.state.errorState}
            />
        }
      </div>
    )
  }
}

export default RelayComponent;
