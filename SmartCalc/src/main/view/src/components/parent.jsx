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
        }
    }
    handleHistoryItemClick = (selectedExpression) => {
        // Обновляем выражение в Calculator, когда выбран элемент истории
        this.calculatorRef.updateExpression(selectedExpression);
    };
    handleInfoClick = () => {
        this.setState({ showInfo: true });
    }

    handleCloseInfo = () => {
        this.setState({ showInfo: false });
    }

    handleHistoryClick = () => {
        this.setState({ showHistory: true });
    }

    handleCloseHistory = () => {
        this.setState({ showHistory: false });
    }

    render() {
        return (
            <div className='calculator-row'>
                
                <div className='calculator-column'>
                    <div style={{ display: 'flex' }}>
                        <Link to="#" onClick={this.handleInfoClick}>Info</Link>
                        {this.state.showInfo && <Info onItemClick={this.handleHistoryItemClick} onClose={this.handleCloseInfo} />}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Link to="#" onClick={this.handleHistoryClick}>History</Link>
                        {this.state.showHistory && <History onItemClick={this.handleHistoryItemClick} onClose={this.handleCloseHistory} />}
                    </div>
                </div>
                <Calculator ref={(ref) => (this.calculatorRef = ref)} />
            </div>
        );
    }
}
export default Parent;