// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class ChatForm extends Component {

    onSubmit(e) {
        e.preventDefault();
        this.props.emit('newMessage', {
            timestamp: Date.now(),
            text: this.refs.text.value.trim(),
            user: this.props.user.name
        });

        // Clear form
        this.refs.text.value = '';
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input className="form-control" type="text" ref="text" placeholder=""/>
                </form>
            </div>
        )
    }

};

export default ChatForm;
