import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import _ from 'lodash'

var possibleCombinationSum = function (arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

const Stars = (props) => {
    // const numberOfStars = 1 + Math.floor(Math.random() * 9);
    // let stars= [];
    // for(let i = 0; i<numberOfStars; i++){
    //     stars.push(<i key={i} className="fa fa-star"></i>);
    // }
    // return( 
    //     <div className="col-5">
    //         // {stars}
    //     </div>
    // )
    return (
        <div className="col-md-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    )
}

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success" onClick={props.acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>;
            break;
        case false:
            button =
                <button className="btn btn-danger">
                    <i className="fa fa-times"></i>
                </button>;
            break;
        default:
            button =
                <button className="btn"
                    onClick={props.checkAnswer}
                    disabled={props.selectedNumbers.length === 0}>=
            </button>;
            break;
    };
    return (
        <div className="col-md-2">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm" onClick={props.redraw}
                disabled={props.redraws === 0}>
                <i className="fa fa-refresh"></i>{props.redraws}
            </button>
        </div>
    )
}

const Answer = (props) => {
    return (
        <div className="col-md-5">
            {props.selectedNumbers.map((number, i) =>
                <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span>
            )}
        </div>
    )
}

const Numbers = (props) => {
    // const arrayOfNumbers = _.range(1,10);
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) !== -1) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(number) !== -1) {
            return 'selected';
        }
    }
    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map(
                    (number, i) =>
                        <span key={i} className={numberClassName(number)}
                            onClick={() => props.selectNumber(number)}>{number}</span>

                )}
            </div>
        </div>
    )
}

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>
                Play again
            </button>
        </div>
    )
}

Numbers.list = _.range(1, 10);

class Game extends Component {

    static randomNumber = () => 1 + Math.floor(Math.random() * 9)
    static initStatus = () => (
    {
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null,
    });

    state = Game.initStatus(); 
    resetGame = () => this.setState(Game.initStatus());
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) !== -1)
            return;
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null,
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
            answerIsCorrect: null
        }));
    };

    checkAnswer = () => {
        this.setState((prevState) => (
            {
                answerIsCorrect: prevState.randomNumberOfStars ===
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
            }
        ));
    };

    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const _possibleNumbers = _.range(1, 10)
                                  .filter(number => 
                                          usedNumbers.indexOf(number) === -1);
        return possibleCombinationSum(_possibleNumbers, randomNumberOfStars)
    }

    updateDoneStatus = () => {
        this.setState((prevState) => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. You won!' };
            }

            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game over' };
            }
        }
        )
    };

    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }
        this.setState((prevState) => (
            {
                randomNumberOfStars: Game.randomNumber(),
                selectedNumbers: [],
                answerIsCorrect: null,
                redraws: prevState.redraws - 1,
            }
        ), this.updateDoneStatus);
    };

    acceptAnswer = () => {
        this.setState((prevState) => (
            {
                usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                selectedNumbers: [],
                answerIsCorrect: null,
                randomNumberOfStars: Game.randomNumber(),
            }
        ), this.updateDoneStatus);
    };



    render() {
        const { selectedNumbers, randomNumberOfStars,
            answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        redraws={redraws} />
                    <Answer selectedNumbers={selectedNumbers}
                        unSelectNumber={this.unSelectNumber} />
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} /> :
                    <Numbers selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers} />
                }
                <br />

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
