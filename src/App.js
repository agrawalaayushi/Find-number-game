import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      numberToFind: '', 
      numberFound: false,
      boxArray: [],
      countClick: 0,
      trackClick: [],
      errorFound: false
    };
    this.resetGame = this.resetGame.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange (event) {
    this.setState ({
      numberToFind: event.target.value,
      errorFound: false
    })
  }

  //generate random number
  // generateNumber (index) {
  //   const { numberToFind } = this.state;
  //   if (numberToFind) {
  //     let  number = Math.floor(Math.random() * 10) 
  //     let boxArray = this.state.boxArray
  //      boxArray[index] = number
  //      this.setState({
  //        boxArray: boxArray,
  //        countClick: this.state.countClick+1,
  //      }, () => {
  //        console.log(this.state.boxArray)
  //      }) 

  //      if (number == numberToFind) {
  //       this.setState({
  //         numberFound: true
  //       }) 
  //      }
  //   }
  //   else {
  //     this.setState({
  //       errorFound: true
  //     }) 
  //   }
  // }

  handleButtonClick (index) {
      const { numberToFind } = this.state;
      if (numberToFind) {
      let id = `boxValue${index}`
      document.getElementById(id).style.display = "block";
      this.setState({
        countClick: this.state.countClick+1,
      })
    }
     else {
      this.setState({
        errorFound: true
      }) 
    }
  }

  generateNumber () {
    let boxArray = this.state.boxArray;
    let number;
    for (let i = 0; i < 9  ; i++) {
      number = Math.floor(Math.random() * 10) 
      boxArray[i] = number
    }
    this.setState({
      boxArray: boxArray
    })
  }

  resetGame () {
    this.setState({
      countClick: 0,
      numberToFind: '',
      boxArray: []
    }) 
  }

  getBox (item, index) {
    const { boxArray } = this.state;
    return (
      <button className="box" key = {`${index}`} onClick={()=>this.handleButtonClick(index)}>
        <span id={'boxValue'+ index} className="box-value">{boxArray[index]}</span>
      </button>
    )
  }

  componentDidMount () {
    this.generateNumber();
  }

  render() {
    const { boxArray, numberFound, countClick, errorFound, numberToFind } = this.state;
    return (
      <div className="game-grid-view">
      <h1>Click and find your number!</h1>
        <div>Enter number to find</div>
        <input type='number' name="number"  placeholder="Enter a number" 
        className={'input-field' + (errorFound ? ' error' : '')} onChange={this.handleInputChange} 
        value={numberToFind} required/>
        <div className="box-wrapper" id="gridBox">
          { boxArray.map((item, index) =>( this.getBox(item, index) )) }
        </div>
        {/* <div className="box-wrapper">
          <div className="row">
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[1]}</span></button>
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[2]}</span></button>
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[3]}</span></button>
          </div>
          <div className="row">
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[4]}</span></button>
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[5]}</span></button>
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[6]}</span></button>
          </div>
          <div className="row">
          <button className="box" onClick={this.handleButtonClick}><span>{boxArray[7]}</span></button>
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[8]}</span></button>
            <button className="box" onClick={this.handleButtonClick}><span>{boxArray[9]}</span></button>
          </div>
        </div> */}
          {numberFound && <div className="result">You Win!</div>}
          {countClick >= 3 && !numberFound  && <div>You lose!</div>}
          <button className="reset-btn" onClick={this.resetGame}>Reset Game</button>
      </div>
    );
  }
}


export default (App);

