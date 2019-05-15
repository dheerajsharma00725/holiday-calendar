import React, { Component } from 'react';
import { Paper, Grid, Typography,Button } from '@material-ui/core';
import HolidayTable from './HolidayTable';

class Upcomingholiday extends Component {


  constructor(props) {
    super(props);

    let temp = {};
    for (let i=0; i<100; i++)
      temp = {...temp, [i]: false};
    this.state = {tempR :temp,
      start : 0,
      end : 20
    };

  }
  modalShow = (e, idx) => {
    e.stopPropagation();
    this.setState((currentState) => ({tempR:{...currentState.tempR, [idx]: true}}));

  }
  modalClose = (e, idx) => {
    if (e)
      e.stopPropagation();
    console.log(`closing modal ${idx}`);
    this.setState((currentState) => ({tempR:{...currentState.tempR, [idx]: false}}), () => console.log(this.state.tempR));
  };
  dec = ()=>{
    if(this.state.start>=20)
    this.setState((curr)=>({start:curr.start-20,end:curr.end-20}))
  }
  inc = (len)=>{
    console.log(len);
    if(this.state.end < len)
    this.setState((curr)=>({start:curr.start+20,end:curr.end+20}))
  }
  render() {

    return (

      <Paper>
        <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
          {
            this.props.upcomingdata.map((item, idx) => {
              if(idx>this.state.start && idx<=this.state.end)
              return (
                <Grid item md={4} lg={3} xs={12} key={idx} variant="primary"
                  onClick={(e) => this.modalShow(e,idx)}>
                  <Typography variant="title">
{(new Date(item.date.iso)).toLocaleDateString("latn",{ day: 'numeric' ,month: 'long', year: 'numeric'  })}


                    <Typography variant="subtitle1">
                  Forgiveness has stopped
                    </Typography>
                  </Typography>
                  <HolidayTable holidays={item} open={this.state.tempR[idx]} close={(e) => {return this.modalClose(e,idx)}}/>
                </Grid>
              );
            })
          }
        </Grid>
      </Paper>
    )

  };
}


export default Upcomingholiday;
