import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let data= [
    {name : "Paul O'Shannessy",
     avatar_url : "https://avatars.githubusercontent.com/u/8445?v=3",
     company: "facebook"},
     {name : "Ben Alpert",
     avatar_url : "https://avatars.githubusercontent.com/u/6820?v=3",
     company: "facebook"},
     
  ];

ReactDOM.render(<App cards ={data}/>, document.getElementById('root'));
registerServiceWorker();
