import React, { Component } from 'react';
import '../css/history.css'

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
        };
    }

    componentDidMount() {
        this.loadHistory();
    }

    handleItemClick = (expression) => {
        this.props.onItemClick(expression);
      };

    loadHistory = async()=>{
        const url = 'http://localhost:8080/history';
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            this.setState({history:data});
        } else {
            console.log('Failed to load history');
        }
    }

    deleteHistory = async () => {
        const url = 'http://localhost:8080/deleteHistory';
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('History deleted successfully');
                this.loadHistory();
            } else {
                console.log('Failed to delete history');
            }
    }

    render() {
        return (
            <div className="history">
                <ul className="history-list">
                    {this.state.history.map((expression, index)=>(
                        <li className="history-item" key={index} onClick={()=>this.handleItemClick(expression)}>{expression}</li>
                    ))}
                </ul>
                <div className="history-buttons">
                    <button className="history-button" onClick={this.deleteHistory}>Delete History</button>
                    <button className="history-button" onClick={this.props.onClose}>Close</button>
                </div>
            </div>
        );
    }
}

export default History;