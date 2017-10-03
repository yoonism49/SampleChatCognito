// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Modules
import io from 'socket.io-client';

// Subcomponents
import History from './chat/History.jsx';
import Chat from './chat/Chat.jsx';
import User from './chat/User.jsx';



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 'disconnected',
            messages: [{
                text: "",
                user: ""
            }],
            users: [],
            user: '',
            name: ''
        }
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
        this.socket.on('newMessage', this.onNewMessage.bind(this));
        this.socket.on('newUser', this.onNewUser.bind(this));
    }

    connect() {
        this.setState({
            status: 'connected'
        });
        console.log('Connected: ' + this.socket.id);
    }

    disconnect(users) {
        this.setState({
            users: users
        });
        this.setState({
            status: 'disconnected'
        });
    }

    onNewUser(users) {
        this.setState({
            users: users
        });
    }

    onNewMessage(message) {
        this.setState({
            messages: this.state.messages.concat(message)
        });
    }

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    setUser(user) {
        console.log("user="+user);
        this.setState({
            user: user
        });
    }


    render() {
        let userName;
      
            return (
                <div>
                 <div className="row">
                    <div className="col-md-3">
                    <User emit={this.emit.bind(this)} setUser={this.setUser.bind(this)} />
                    </div>
                      <div className="col-md-2">
                       <ul className="list-group">
                        {
                            this.state.users.map((user, i) => {
                                return (
                                    <li className="list-group-item" user={user} key={i}>
                                        {user.name}
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                  </div>
         
                <div className="row">
                    <div className="col-md-8">
                        <History {...this.state} />
                        <Chat {...this.state} emit={this.emit.bind(this)} />
                    </div>
                </div>
                </div>
            )
        
    }

};

export default App;
