import React from 'react'
import '../styles/App.css'

class SendEmail extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email:""
    }
    this.sendEmail= this.sendEmail.bind(this)
    this.handleEmailChange= this.handleEmailChange.bind(this)
    this.handleInvalidEmail= this.handleInvalidEmail.bind(this)
  }
  handleEmailChange(e){
    this.setState({
      email:e.target.value
    })
  }
  handleInvalidEmail(email){
    if(!email){ return false}
  }
  sendEmail(){
    var addresses = "";
    var body = this.props.createAnswerText("email")
    var subject = "Wordies Answers"
    var href = "mailto:" + addresses + "?"
             + "subject=" + subject + "&"
             + "body=" + body;
    var wndMail;
    wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
    setTimeout(()=>{
      if(wndMail){
        wndMail.close()
      }
    },200)
  }
  render(){
    return (
      <div className="text-answer">
        <div> Separate multiple emails using commas "," </div>
        <input
          onChange={this.handleEmailChange}
          value={this.state.email}
          type="email"
          className="email"
        />
        <div className="send clickable" onClick={this.sendEmail}>
          SEND
        </div>
        <div className="send clickable" onClick={this.props.closeContainer}>
          CANCEL
        </div>
      </div>
    )
  }
}

export default SendEmail;
