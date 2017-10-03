// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Subcomponents
import Message from './Message.jsx';


class History extends Component {

    getHistory() {
       
        var User = '',LastUser = '',removeFlag=false;
        this.props.messages.map((message, i) => {
            if(message.text.indexOf("</sticker>") > -1)
            {
             
                removeFlag=true;
                
            }
        });

       
            return this.props.messages.map((message, i) => {

                //console.log("message.user="+message.user);
                User = message.user;
                message.isSameUser = User == LastUser;
                LastUser = User;
                if(removeFlag)
                    return <Message message={message} key={i} flag={true} />
                else
                    return <Message message={message} key={i} flag={false} />
            });
       
       removeFlag=false;
        
    }

    render() {
        return (
            <div className="well">
                <h3>
                    <strong>Chat</strong>
                </h3>
                <hr />
                {this.getHistory()}
            </div>
        )
    }

};

export default History ;
