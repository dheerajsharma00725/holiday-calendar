import React from 'react';
import './App.css';
import Upcomingholiday from './Upcomingholiday.js';
import CurrentDate from './CurrentDate.js';
import Passedholiday from './Passedholiday.js';
class App extends React.Component {
     state={
       upcomingholidays: [],
       passedholidays: [],
        flag: "one"
        }
        onsetstatehandler=(upcomingholidays,passedholidays,flag)=>
        {
          this.setState({upcomingholidays,passedholidays,flag});
        }
getComponent=()=>{
  if(this.state.flag==="one")
  return  <Upcomingholiday upcomingdata={this.state.upcomingholidays} />
  else
    return <Passedholiday passeddata={this.state.passedholidays}/>


}

   render()  {
     const Parameters={
       country:'IN',
       year:2019
     }
  return (
    <div  style={{ textAlign: 'center' }}>
    <div className="App">
    <CurrentDate onstatehandler={this.onsetstatehandler}/>
      </div>
      {
        this.getComponent()
      }
    </div>
  );


}

}
export default App;
