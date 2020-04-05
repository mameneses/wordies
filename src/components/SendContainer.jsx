import React from 'react'
import '../styles/sendStyles.css'
import SendText from './SendText'
import SendEmail from './SendEmail'

class SendContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      show:false
    }
    this.showContainer = this.showContainer.bind(this)
    this.closeContainer = this.closeContainer.bind(this)
    this.handleContent = this.handleContent.bind(this)
    this.createAnswerText = this.createAnswerText.bind(this)
    this.handleContainerClick = this.handleContainerClick.bind(this)
  }
  componentDidMount() {
    setTimeout(()=>{
      this.showContainer()
    },1)
  }
  showContainer(){
    this.setState({
      show:true
    })
  }
  closeContainer(){
    this.setState({
      show:false
    },()=>{
      setTimeout(()=>{
        this.props.setSendOption("")
      },400)
    })
  }
  createAnswerText(origin){
    let blueWords = []
    let redWords = []
    let neutralWords = []
    let deathWord = ""
    this.props.board.board.forEach((word)=>{
      if(word.answer === "blue"){
        blueWords.push(word.word)
      }
      if(word.answer === "red"){
        redWords.push(word.word)
      }
      if(word.answer === "neutral"){
        neutralWords.push(word.word)
      }
      if(word.answer === "death"){
        deathWord = word.word
      }
    })
    let nline = origin === "email" ? "%0D%0A" : "\n"
    let body = `${origin === "text"?"-":""}${nline}${nline}Red Team:${nline}`
    redWords.forEach((word)=>{
      body += `${word}${nline}`
    })
    body += `${nline}Blue Team:${nline}`
    blueWords.forEach((word)=>{
      body += `${word}${nline}`
    })
    body += `${nline}Neutral:${nline}`
    neutralWords.forEach((word)=>{
      body += `${word}${nline}`
    })
    body += `${nline} DEATH WORD:${nline}${deathWord}`
    return body
  }
  handleContainerClick(e){
    if(e.target && e.target.className && e.target.className.includes("send-container")){
      this.closeContainer()
    }
  }
  handleContent(){
    let props = {
      ...this.props,
      closeContainer:this.closeContainer,
      createAnswerText:this.createAnswerText,
    }
    switch (this.props.sendOption) {
      case "text":
        return (
          <SendText
            {...props}
          />
        )
      case "email":
        return (
          <SendEmail
            {...props}
          />
        )
      default:
        return null
    }
  }
  render(){
    return (
      <div className={`send-container ${this.state.show ? "show" : ""}`} tabIndex="1" onClick={this.handleContainerClick}>
        <div className="send-option-container">
          {this.handleContent()}
        </div>
      </div>
    )
  }
}

export default SendContainer
