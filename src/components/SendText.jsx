import React from 'react'
import '../styles/sendStyles.css'
import twilio from 'twilio'

class SendText extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      number:""
    }
    this.textMessageAnswers= this.textMessageAnswers.bind(this)
    this.handleNumberChange= this.handleNumberChange.bind(this)
    this.handleNumberIsValid= this.handleNumberIsValid.bind(this)
  }
  handleNumberChange(e){
    this.setState({
      number:e.target.value
    })
  }
  handleNumberIsValid(number){
    if(!number){ return false}
    if(number.length !== 10 ){
      window.alert("Please enter a valid phone number")
      return false
    }
    return true
  }
  textMessageAnswers(){
    if(!this.handleNumberIsValid(this.state.number)){
      return
    }
    if(this.state.sendingText) return
    let body = this.props.createAnswerText("text")
    let number = this.state.number.split(" ").join("")
    let to = `+1${number}`
    let client = new twilio(process.env.REACT_APP_TWILIO_ACCOUNT,process.env.REACT_APP_TWILIO_KEY)
    this.setState({
      sendingText: true
    })
    client.messages.create({
      to,
      from: '+12675260045',
      body
    }).then(()=>{
      this.setState({
        sendingText: false,
        textSent: true
      })
    })
  }
  render(){
    if(this.state.sendingText){
      return (
        <div className="text-answer">
          Sending text...
        </div>
      )
    }
    return (
      <div className="text-answer">
        {this.state.textSent ?
          <div>
            Your set has been sent!
          </div>
          :
          <div>
            <div> US numbers only </div>
            <input
              onChange={this.handleNumberChange}
              value={this.state.number}
              type="tel"
              placeholder="888 888 8888"
              />
            <div className="send clickable" onClick={this.textMessageAnswers}>
              SEND
            </div>
            <div className="send clickable" onClick={this.props.closeContainer}>
              CANCEL
            </div>
          </div>
        }
      </div>
    )
  }
}

export default SendText;
