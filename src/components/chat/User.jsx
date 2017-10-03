// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


class User extends Component {

    onSubmit(e) {
        e.preventDefault();

        var name = this.refs.name.value.trim();

        this.props.setUser({
            name: name
        });
        this.props.emit('newUser', {name: name});

        // Clear
        this.refs.name.value = '';
    }

    render() {
        return (
            <div>
                
                <hr />
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input className="form-control" type="text" ref="name" placeholder="Add a username" />
                </form>
            </div>
        )
    }

};

export default User;
