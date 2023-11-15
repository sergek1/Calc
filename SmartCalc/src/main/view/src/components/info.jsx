import React, { Component } from 'react';
import '../css/info.css';

class Info extends Component {
    render() {
        return (
            <div className="info" >
                <h1>SmartCalc v3.0</h1>
                <div>
                <img className="image" src="images/person.png" width="400px" alt="Calculator Screenshot" />
                    <p>
                    Расширенная версия обычного калькулятора.<br />
                    Помимо основных арифметических операций, таких как сложение/вычитание и умножение/деление, 
                    есть возможность вычисления арифметических выражений с соблюдением порядка, 
                    а также некоторыми математическими функциями (sin, cos, sqrt и т.д.).<br />
                    Можно построить график функции.<br />
                    Программа хранит историю операций, позволяет загружать выражения из истории и очищать историю целиком.<br />
                    История сохраняется между запусками приложения.
                    </p>
                </div>
                <button onClick={this.props.onClose}>Close</button>
            </div>
        );
    }
}

export default Info;