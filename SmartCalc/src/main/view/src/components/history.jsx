import React, { Component } from 'react';

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
        // try{
            const url = 'http://localhost:8080/history';
            const response = await fetch(url);
            if (response.ok){
                const data = await response.json();
                this.setState({history:data});
            } else {
                console.log('Failed to load history');
            }
            
        // }
        // catch(){

        // }
    }

    render() {
        return (
            <div>
                <h1>History</h1>
                {/* Ваш код компонента Info */}
                <ul>
                    {this.state.history.map((expression, index)=>(
                        <li key={index} onClick={()=>this.handleItemClick(expression)}>{expression}</li>
                    ))}
                </ul>
                <button onClick={this.props.onClose}>Закрыть</button>
            </div>
        );
    }
}

export default History;