import React from 'react'
import '../styles/App.css'
import words from '../words'
import SendContainer from './SendContainer'

class WordiesContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      board:{
        board:[],
        starterColor:"",
      },
      sendOption:"",
      showAnswers:false,
    }
    this.setSendOption = this.setSendOption.bind(this)
  }
  componentDidMount() {
    let localBoard = window.localStorage.getItem("board")
    if(localBoard) {
      let board = JSON.parse(localBoard)
      this.setState({
        board
      })
      return
    }
    let board = this.buildBoard()
    this.setBoardToLocalStorage(board)
    this.setState({
      board
    })
  }
  createAnswers(){
    let i = 0
    let answers = ["death"]
    while (i < 8) {
      answers.push("red")
      answers.push("blue")
      if(i < 7){
        answers.push("neutral")
      }
      i++
    }
    let decider = Math.floor(Math.random() * 10)
    let starterColor = ""
    if(decider < 6){
      starterColor = "blue"
    } else {
      starterColor = "red"
    }
    answers.push(starterColor)
    return {
      answers,
      starterColor
    }
  }
  shuffle(array, n) {
    if(!n) {
      n = array.length
    }
    // Shuffle array
    const shuffled = array.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, n);
    return selected
  }
  buildBoard(){
    let {starterColor, answers} = this.createAnswers()
    let answersKeys = this.shuffle(answers)
    let board = this.shuffle(words, 25).map((word,i)=>{
      return {
        word,
        value:"",
        answer:answersKeys[i],
      }
    })
    return {
      board,
      starterColor
    }
  }
  newBoard(){
    let board = this.buildBoard()
    this.setState({
      board
    })
    this.setBoardToLocalStorage(board)
  }
  handleWordClick(index){
    let board = this.state.board
    board.board[index]["value"] = board.board[index]["answer"]
    this.setState({
      board
    })
    this.setBoardToLocalStorage(board)
  }
  seeAnswers(){
    this.setState({
      showAnswers: !this.state.showAnswers
    })
  }
  setBoardToLocalStorage(board){
    window.localStorage.setItem("board",JSON.stringify(board))
  }
  setSendOption(sendOption){
    this.setState({
      sendOption
    })
  }
  render(){
    return (
      <div className="App">
        <div className="title">
          <span className={`title-color ${this.state.board.starterColor}`}>{this.state.board.starterColor}</span> goes first
        </div>
        <div className="words-container">
          {
            this.state.board.board.map((word, i)=>{
              return(
                <div
                  key={word.word}
                  className={`word ${word.value} ${word.value || this.state.showAnswers ? "selected": ""} ${this.state.showAnswers ? word.answer : ""}`}
                  onClick={this.handleWordClick.bind(this,i)}
                >
                  {word.word}
                </div>
              )
            })
          }
        </div>
        <div className="bottom-holder">
          <div className="bottom-button new-board" onClick={this.newBoard.bind(this)}>
            New Board
          </div>
          <div>
            Send answers via:
            <div className="send" onClick={()=>{this.setSendOption("text")}}> text </div>
            <div className="send" onClick={()=>{this.setSendOption("email")}}> email </div>
          </div>
          <div className="bottom-button see-answers" onClick={this.seeAnswers.bind(this)}>
            {this.state.showAnswers ? "Hide answers": "See answers"}
          </div>
        </div>
        {this.state.sendOption ?
          <SendContainer
            board={this.state.board}
            setSendOption={this.setSendOption}
            sendOption={this.state.sendOption}
          />
          :
          null
        }
        <div>
        </div>
      </div>
    )
  }
}

export default WordiesContainer;
