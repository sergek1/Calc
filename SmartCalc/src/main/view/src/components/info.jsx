import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <div>
                <h1>InfoInfoInfo</h1>
                {/* Ваш код компонента Info */}
                <button onClick={this.props.onClose}>Закрыть</button>
            </div>
        );
    }
}

export default Info;