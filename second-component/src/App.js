import React, { Component } from 'react';
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const Card = (props) =>{
  return (
    <div>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft:10}}>
          <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
          </div>  
          <div>{props.company}</div>  
      </div>

    </div>
  );
};

const CardList = (props)=>
{
  return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
      {/* <Card name="Paul O'Shannessy"
            avatar_url="https://avatars.githubusercontent.com/u/8445?v=3"
            company="Facebook" /> */}
    </div>  
  );
};

class Form extends React.Component {
    state = { userName: '' }
    handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Form submitted", this.state.userName); 
        axios.get(`http://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({userName :'' });
            });
        
    }
    render(){
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
                 /* ref={(input) => this.userNameInput = input }  */
                 value={this.state.userName}
                 onChange={(event) => this.setState({ userName : event.target.value})}
                 placeholder="Github username" required/>   
          <button type="submit">Add card</button>
        </form>        
      );
    }
}

class App extends React.Component {
  state = {
    cards: [
        { id: 1,
         name : "Paul O'Shannessy",
         avatar_url : "https://avatars.githubusercontent.com/u/8445?v=3",
         company: "facebook"},
        {
        id: 2,
        name : "Ben Alpert",
        avatar_url : "https://avatars.githubusercontent.com/u/6820?v=3",
        company: "facebook"}
    ]
  }

  addNewCard = (cardInfo) => {
    this.setState(prevState => (
        {
            cards : prevState.cards.concat(cardInfo)                            
        }
    ));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}


export default App;
