import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

function getLoadingScreen(clickHandler) {
  return (
    <div>
      <button className="dataButton" value="one" onClick={clickHandler}>
        Upcoming Holidays
      </button>
      <button className="dataButton" value="two" onClick={clickHandler}>
        Passed Holidays
      </button>
      <Grid
        item
        lg={3}
        md={4}
        xs={12}
        style={{ margin: "60px auto", textAlign: "center" }}
      >
        <Typography variant="h2">Loading....</Typography>
      </Grid>
    </div>
  );
}

class CurrentDate extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      upcomingholidays: [],
      passedholidays: []
    };
  }
  promiseState = async state =>
    new Promise(resolve => this.setState(state, resolve));
  componentDidMount() {
    setTimeout(() => {
      this.onclickhandler({ target: { value: "one" } });
    }, 2000);
  }
  getupholdiayhandler = () => {
    this.setState({ loading: true });
    return new Promise((Resolve, Reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://calendarific.com/api/v2/holidays?api_key=28395347787004033c45afe35e659151463fbae4f8acd3c7c874b59edbe812aa&country=IN&year=2019"
      );
      xhr.send();
      var temp = [];
      xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
          var upcomingdata = JSON.parse(xhr.responseText);

          temp = this.state.upcomingholidays;

          temp = upcomingdata.response.holidays;

          this.setState({
            upcomingholidays: temp,
            passedholidays: [],
            loading: false
          });
          Resolve();
        }
      };
    });
  };

  getpassdatahandler = () => {
    this.setState({ loading: true });
    return new Promise((Resolve, Reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://calendarific.com/api/v2/holidays?api_key=28395347787004033c45afe35e659151463fbae4f8acd3c7c874b59edbe812aa&country=IN&year=2019"
      );
      xhr.send();
      var temp = [];
      xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          var passeddata = JSON.parse(xhr.responseText);
          temp = this.state.passedholidays;
          temp = passeddata.response.holidays;
          this.setState({
            upcomingholidays: [],
            passedholidays: temp,
            loading: false
          });
          Resolve();
        }
      };
    });
  };

  onclickhandler = async e => {
    var flag = e.target.value;
    this.promiseState({ loading: false }).then(() => {
      let nowpromise = undefined;
      // nowpromise=this.istodayholiday();
      if (flag === "one") {
        document.getElementsByClassName("dataButton")[0].style.backgroundColor =
          "whitesmoke";
        document.getElementsByClassName("dataButton")[0].style.color = "black";
        document.getElementsByClassName("dataButton")[1].style.backgroundColor =
          "white";
        document.getElementsByClassName("dataButton")[1].style.color = "black";
        nowpromise = this.getupholdiayhandler();
      } else {
        document.getElementsByClassName("dataButton")[1].style.backgroundColor =
          "whitesmoke";
        document.getElementsByClassName("dataButton")[1].style.color = "black";
        document.getElementsByClassName("dataButton")[0].style.backgroundColor =
          "white";
        document.getElementsByClassName("dataButton")[0].style.color = "black";
        nowpromise = this.getpassdatahandler();
      }
      nowpromise.then(() =>
        this.props.onstatehandler(
          this.state.upcomingholidays,
          this.state.passedholidays,
          flag
        )
      );
    });
  };
  istodayholiday = () => {
    var a = new Date();
    var dd = a.getDate();
    var mm = a.getMonth();
    var z;
    var x;
    var y;
    // this.setState({ loading: true });
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://calendarific.com/api/v2/holidays?api_key=28395347787004033c45afe35e659151463fbae4f8acd3c7c874b59edbe812aa&country=IN&year=2019&month=1&day=1"
    );
    xhr.send();
    var temp = [];
    xhr.onreadystatechange = () => {
      console.log("hello");
      if (xhr.status === 200 && xhr.readyState === 4) {
        var passeddata = JSON.parse(xhr.responseText);
        console.log(passeddata.response.holidays[0].name);
        z = passeddata.response.holidays.length;
        if (z == 0) {
          y = passeddata.response.holidays[0].name;
          x = passeddata.response.holidays[0].date.type;
        }
      }
    };
    if (z != 0) {
      console.log("excellent work");
      return (
        <div>
          <p>Hey, you got Holiday today.</p>
          <p>{x}</p>
          <p>{y}</p>
        </div>
      );
    } else {
      console.log("try again");
      return <p>No Holiday</p>;
    }
  };

  render() {
    if (this.state.loading === true) {
      return getLoadingScreen(this.onclickhandler);
    } else
      return (
        <div>
          {this.istodayholiday()}
          <button
            className="dataButton"
            value="one"
            onClick={this.onclickhandler}
          >
            Upcoming Holidays
          </button>
          <button
            className="dataButton"
            value="two"
            onClick={this.onclickhandler}
          >
            Passed Holidays
          </button>

          {console.log("enjoy")}
        </div>
      );
  }
}

export default CurrentDate;
