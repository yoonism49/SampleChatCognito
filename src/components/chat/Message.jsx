// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class Message extends Component {

 
    render() {

        const {message,flag} = this.props;
        let user ;
        if(flag)
       {
            user="";
       }
       else if (message.text=='<sticker>') {
            user = <img src='https://media.boingboing.net/wp-content/uploads/2016/11/trump.jpg' width='30%' height='30%'/>;
       }
       
        if(message.text!='')
            {
            return (
                <div className="message">
                    {message.user} : {message.text} {user}
                </div>
                );
            }
            else
            {
                return (
                <div className="message">
                    
                </div>
                );
            }
        

    }

};

export default Message;
