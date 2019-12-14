import React, {Component} from 'react';
import Contacts from './components/contacts';

class App extends Component {

    constructor() {
        super();
        this.state = {
            contacts: [],
            firstName: "",
            lastName: ""
        };
    }
    componentDidMount() {
        fetch('http://localhost:8080/person')
            .then(res => res.json())
            .then((data) => {
                this.setState({contacts: data})
            })
            .catch(console.log)
    }

    handleFirstNameChange(e) {
        this.setState({firstName: e.target.value});
    }

    handleLastNameChange(e) {
        this.setState({lastName: e.target.value});
    }

    handleSendingData(firstName, lastName) {
        console.log("posting data " + firstName + " " + lastName);
        fetch('http://localhost:8080/person', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName
            })
        });
    };

    render() {
        return (
            <div>
                <form>
                    <input type="text" placeholder="first name" value={this.firstName}
                           onChange={(e) => this.handleFirstNameChange(e)}/>
                    <input type="text" placeholder="last name" value={this.lastName}
                           onChange={(e) => this.handleLastNameChange(e)}/>
                </form>
                <button type="button"
                        onClick={() => this.handleSendingData(this.state.firstName, this.state.lastName)}>send data
                </button>
                <Contacts contacts={this.state.contacts}/>
            </div>
        );
    }
}

export default App;