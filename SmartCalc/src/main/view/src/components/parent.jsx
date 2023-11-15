import React, { Component } from 'react';
import Calculator from "./calculator";
import History from "./history";
import Info from './info';
import '../css/main.css'
import { Link } from 'react-router-dom';

class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,
            showHistory: false,
            showGraph: false,
        }
    }
    handleHistoryItemClick = (selectedExpression) => {
        this.calculatorRef.updateExpression(selectedExpression);
    };
    handleInfoClick = () => {
        this.setState({ showInfo: true });
    }

    handleInfoClose = () => {
        this.setState({ showInfo: false });
    }

    handleHistoryClick = () => {
        this.setState({ showHistory: true });
    }

    handleHistoryClose = () => {
        this.setState({ showHistory: false });
    }

    handleGraphClick = () => {
        this.setState({ showGraph: true });
    }

    handleGraphClose = () => {
        this.setState({ showGraph: false });
    }


    render() {
        return (
            <div className='calculator-row'>
                
                <div className='calculator-column'>
                    
                    <div style={{ display: 'flex' }}>
                        <Link to="#" onClick={this.handleInfoClick}>Info</Link>
                        {this.state.showInfo && <Info onClose={this.handleInfoClose} />}
                    </div>
                   
                    <div style={{ display: 'flex' }}>
                        <Link to="#" onClick={this.handleHistoryClick}>History</Link>
                        {this.state.showHistory && <History onItemClick={this.handleHistoryItemClick} onClose={this.handleHistoryClose} />}
                    </div>
                </div>

                <Calculator ref={(ref) => (this.calculatorRef = ref)} />
                
            </div>
        );
    }
}
export default Parent;