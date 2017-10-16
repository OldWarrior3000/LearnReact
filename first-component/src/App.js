import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// const App = (props) => {
//   return (
//       <button>Go</button>
//   );
// };

// class Button extends React.Component
// {
//   constructor(props){
//     super(props);    
//     state = { counter: 0}; 
//   }

//   handleClick = () => {
//     this.setState((prevState) =>
//       {
//         return {
//           counter: prevState.counter + 1
//         }        
//       }
//     );    
//   }


//   render() {
//     return (    
//       <button onClick={this.handleClick}>
//         +1
//       </button>
//     )
//   }
// }

class Button extends React.Component
{
  handleClick = () => {
    this.props.onClickFunction(this.props.incrementValue);
  };
  
  render() {
    return (    
      <button onClick={this.handleClick}>
        +{this.props.incrementValue}
      </button>
    )
  }
}

const Result = (props) => {
  return (
    <div>{props.counter}</div>
  );

}

class App extends React.Component {
  state = { counter: 0}; 

  incrementCounter = (incrementValue)=> {
    this.setState((prevState) => (
      {
        counter: prevState.counter + incrementValue
      }
    ));
  };

  render() {
    return (
      <div>
        <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
        <Result counter={this.state.counter}/>
      </div>      
    );
  }
}

export default App;
