import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import _ from 'lodash'

const Stars = (props) => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);
    // let stars= [];
    // for(let i = 0; i<numberOfStars; i++){
    //     stars.push(<i key={i} className="fa fa-star"></i>);
    // }
    // return( 
    //     <div className="col-5">
    //         // {stars}
    //     </div>
    // )
    return( 
        <div className="col-md-5">
            {_.range(numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    )
}

const Button = (props) => {
    return(
        <div className="col-md-2">
            <button>=</button>
        </div>
    )
}

const Answer = (props) => {
    return(
        <div className="col-md-5">
            {props.selectedNumbers.map((number,i)=>
                <span key={i}>{number}</span>
            )}
        </div>
    )
}   

const Numbers = (props) => {
    // const arrayOfNumbers = _.range(1,10);
    const numberClassName = (number) => {
       if ( props.selectedNumbers.indexOf(number) != -1) {
           return 'selected';
       } 
    }
    return(
        <div className="card text-center">
            <div>
                {Numbers.list.map(
                    (number,i)=> 
                        <span key={i} className={numberClassName(number)}>{number}</span>
                    
                )}
            </div>
        </div>
    )
}



Numbers.list = _.range(1,10);

class Game extends Component {
  state = {
      selectedNumbers: [2,4],
  };
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr/>
        <div className="row">
            <Stars />
            <Button />
            <Answer selectedNumbers={this.state.selectedNumbers} />
            
        </div>      
        <br/>
        <Numbers selectedNumbers={this.state.selectedNumbers} />    
      </div>
    );
  }
}



class App extends Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

export default App;
