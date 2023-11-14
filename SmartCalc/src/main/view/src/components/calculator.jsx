import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Info from './info';
import History from './history';

class Calculator extends Component {
  calculatorRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      expression: '0',
      result: "0",
      x: "1",
    };

    this.digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.is_digit = true;
    this.is_sign = false;
    this.is_close_bracket = false;
    this.is_open_bracket = false;
    this.is_point = false;
    this.is_minus = false;
    this.is_x = false;
    this.is_e = false;
    this.open_brackets_count = 0;
    this.close_brackets_count = 0;
    this.point = '.';
  }

  updateExpression = (newExpression) => {
    this.setState({ result: newExpression });
  };



  handleFormSubmit = (event) => {
    const additionalBrackets = ')'.repeat(this.open_brackets_count - this.close_brackets_count);
    this.open_brackets_count = 0;
    this.close_brackets_count = 0;
    this.setState((prevState) => {
      return {
        result: prevState.result + additionalBrackets,
      };
    }, () => {
      event.preventDefault();
      let { result, x } = this.state;
      if (result.includes("x")) {
        result = result.replace(/x/g, x);
      }
      let encodedExpression = encodeURIComponent(result);
      let url = `http://localhost:8080/calculate?expression=${encodedExpression}`;

      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(response => response.text())
        .then((body) => {
          console.log(body);
          this.setState({ result: body });
        });
    }
    );
    this.setState((prevState) => ({ expression: prevState.result + "=" }));
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    if (/^-?\d*(\.\d{0,7})?$/.test(value)) {
      this.setState({ x: value });
    }
  }


  digitPressed = (key) => {
    this.WhatPressed();
    const size = this.state.result.length;
    if (key === 'e') {
      if (!this.is_e && !this.is_sign && this.state.result.substring(size - 1, size) !== 'e' && this.is_digit) {
        this.setState((prevState) => ({ result: prevState.result + key, }));
        this.is_sign = true;
        this.is_e = true;
        this.is_digit = false;
      }
    } else {
      if (this.state.result.substring(size - 1, size) === '0' && !(this.digit.includes(key))) {
        this.setState((prevState) => ({ result: prevState.result.substring(0, size - 1), }));
      }

      if (this.state.result === "0" || this.state.result.toLocaleLowerCase() === "nan" || this.state.result === "Infinity" || this.state.result === "-Infinity") {
        this.setState({ result: key });
      } else {
        if (this.is_x || this.is_close_bracket) {
          this.setState((prevState) => ({ result: prevState.result + '*', }));
        }
        if (this.state.result.substring(size - 1, size) === '-' &&
          this.state.result.substring(size - 2, size) === 'e') {
          this.is_e = true;
        }
        this.setState((prevState) => ({ result: prevState.result + key, }));
        this.is_digit = true;
        this.is_minus = this.is_open_bracket = this.is_close_bracket = this.is_x = this.is_sign = false;
      }
    }
  };

  signPressed = (text) => {
    if (this.state.result.toLocaleLowerCase() !== "nan" && this.state.result !== "Infinity" && this.state.result !== "-Infinity") {
      const size = this.state.result.length;
      if (this.is_digit || this.is_close_bracket || this.is_x) {
        if (this.state.result.charAt(size - 1) !== 'e') {
          this.setState((prevState) => ({ result: prevState.result + text, }));
          this.is_sign = true;
          this.is_close_bracket = this.is_x = false;
        }
      } else if ((this.is_open_bracket || this.state.result === "") && text === "-") {
        this.setState((prevState) => ({ result: prevState.result + text, }));
      } else if ((this.is_e || this.is_sign) && !this.is_minus) {
        if (text === "-") {
          if (this.state.result.charAt(size - 1) === '*' ||
            this.state.result.charAt(size - 1) === '/' ||
            this.state.result.charAt(size - 1) === 'd' ||
            this.state.result.charAt(size - 1) === 'e') {
            if (this.state.result.charAt(size - 1) !== '^') {
              this.is_minus = true;
            }
          } else {
            this.setState((prevState) => ({ result: prevState.result.substring(0, size - 1), }));
          }
          this.setState((prevState) => ({ result: prevState.result + text, }));
        } else {
          if (this.state.result.charAt(size - 1) === 'd') {
            this.setState((prevState) => ({ result: prevState.result.substring(0, size - 3), }));
          } else {
            this.setState((prevState) => ({ result: prevState.result.substring(0, size - 1), }));
          }
          this.setState((prevState) => ({ result: prevState.result + text, }));
        }
      }
      this.is_point = this.is_open_bracket = this.is_digit = this.is_e = false;
    }
  };

  nullPressed = () => {
    const text = '0';
    const size = this.state.result.length;
    if (this.is_close_bracket || this.is_x) {
      this.setState((prevState) => ({ result: prevState.result + "*", }));
      this.is_close_bracket = this.is_x = false;
    }
    if (!(this.state.result.charAt(size - 1) === '0' && this.state.result.charAt(size - 2) !== this.point &&
      !(this.digit.includes(this.state.result.charAt(size - 2)))
    )) {
      this.setState((prevState) => ({ result: prevState.result + text, }));
      this.is_sign = false;
      this.is_digit = true;
    }
  };

  functionPressed = (text) => {
    this.WhatPressed();
    if (this.state.result.charAt(this.state.result.length - 1) !== 'e') {
      if (this.state.result === "0" || this.state.result.toLocaleLowerCase() === "nan" || this.state.result === "Infinity" || this.state.result === "-Infinity") {
        this.setState({ result: text });
      } else {
        if ((this.is_digit || this.is_point || this.is_close_bracket || this.is_x) && this.state.result.length !== 0) {
          this.setState((prevState) => ({ result: prevState.result + '*', }));
        }
        this.setState((prevState) => ({ result: prevState.result + text, }));
      }
      this.open_brackets_count++;
      this.is_open_bracket = true;
      this.is_point = this.is_digit = this.is_close_bracket = this.is_x = false;
    }
  };

  dotPressed = () => {
    let size = (this.state.result.length !== 0) ? (this.state.result.length - 1) : 0;
    this.is_point = false;
    while (size > 0 && (this.digit.includes(this.state.result.charAt(size)) || this.state.result.charAt(size) === this.point)) {
      if (this.state.result.charAt(size) === this.point) {
        this.is_point = true;
      }
      size--;
    }
    if (this.is_digit && !this.is_point && !this.is_close_bracket) {
      this.is_point = true;
      this.setState((prevState) => ({ result: prevState.result + this.point, }));
    }
  };

  bracketOpenPressed = () => {
    const text = '(';
    if (this.state.result === "0" || this.state.result.toLocaleLowerCase() === "nan" || this.state.result === "Infinity" || this.state.result === "-Infinity") {
      this.cleanAllPressed();
    }
    const size = this.state.result.length;
    if (size === 0 || (this.state.result.charAt(size - 1) !== 'e' && this.state.result.substring(size - 2, size) !== "e-")) {
      if ((this.is_digit || this.is_point || this.is_close_bracket || this.state.result.charAt(size - 1) === 'x') && size > 0) {

        this.setState((prevState) => ({ result: prevState.result + '*', }));
      }
      this.open_brackets_count++;
      this.setState((prevState) => ({ result: prevState.result + text }));
      this.is_open_bracket = true;
      this.is_digit = this.is_close_bracket = this.is_sign = this.is_point = false;
    }
  };

  bracketClosePressed = () => {
    const text = ')';
    if (this.open_brackets_count > this.close_brackets_count) {
      if ((this.is_digit || this.is_close_bracket || this.is_x) && !this.is_sign) {
        this.close_brackets_count++;
        this.setState((prevState) => ({ result: prevState.result + text }));
        this.is_close_bracket = true;
        this.is_digit = this.is_point = this.is_x = false;
      }
    }
  };

  xPressed = () => {
    this.WhatPressed();
    if (this.state.result === "0" || this.state.result.toLocaleLowerCase() === "nan" || this.state.result === "Infinity" || this.state.result === "-Infinity") {
      this.setState({ result: "" });
    } else if ((this.is_digit || this.is_close_bracket || this.is_x || this.is_point) &&
      this.state.result.length !== 0 && !this.is_sign && !this.is_open_bracket) {
      console.log(this.is_x + "is_x");
      console.log(this.is_sign + "is_sign");
      console.log(this.is_open_bracket + "is_open_bracket");
      this.setState((prevState) => ({ result: prevState.result + "*", }));
    }
    this.setState((prevState) => ({ result: prevState.result + "x", }));
    this.is_digit = this.is_sign = this.is_close_bracket = this.is_open_bracket = this.is_point = false;
    this.is_x = true;
  };

  cleanAllPressed = () => {
    this.setState({ result: "0" });
    this.open_brackets_count = this.close_brackets_count = 0;
    this.WhatPressed();
  };

  cleanOnePressed = () => {
    const size = this.state.result.length;
    const str1 = "sqrtacosasinatan";
    const str2 = "cossintanlog";
    const str3 = "modnan";

    if (str1.includes(this.state.result.slice(size - 5, size - 1)) && size > 4) {
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 5), }));
      this.open_brackets_count -= 1;
    } else if (str2.includes(this.state.result.slice(size - 4, size - 1)) && size > 3) {
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 4), }));
      this.open_brackets_count -= 1;
    } else if (this.state.result.slice(size - 3, size) === "ln(") {
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 3), }));
      this.open_brackets_count -= 1;
    } else if (this.state.result.slice(size - 9, size) === "-Infinity") {
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 9), }));
    } else if (this.state.result.slice(size - 8, size) === "Infinity") {
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 8), }));
    } else if (str3.includes(this.state.result.slice(size - 3, size).toLocaleLowerCase())) {
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 3), }));
    } else {
      if (this.state.result.slice(size - 1, size) === "(") {
        this.open_brackets_count -= 1;
      } else if (this.state.result[size - 1] === ")") {
        this.close_brackets_count -= 1;
      }
      this.setState((prevState) => ({ result: prevState.result.slice(0, size - 1), }));
    }
    this.WhatPressed();
  };

  WhatPressed = () => {
    const size = this.state.result.length;
    this.is_digit = false;
    this.is_sign = false;
    this.is_point = false;
    this.is_close_bracket = false;
    this.is_open_bracket = false;
    this.is_minus = false;
    this.is_x = false;
    this.is_e = false;

    if (size > 0) {
      if (this.state.result[size - 1].match(/\d/)) {
        this.is_digit = true;
      } else if (this.state.result[size - 1] === '(') {
        this.is_open_bracket = true;
      } else if (this.state.result[size - 1] === ')') {
        this.is_close_bracket = true;
      } else if (this.state.result[size - 1] === '.') {
        this.is_point = true;
      } else if (this.state.result[size - 1] === 'x') {
        this.is_x = true;
      } else if (this.state.result[size - 1] === 'e') {
        this.is_e = true;
      } else if (this.state.result.slice(size - 1) === '-') {
        const signs = "*/m";
        if (signs.includes(this.state.result[size - 2])) this.is_minus = true;
      } else {
        this.is_sign = true;
      }
    }
  };


  render() {
    return (
      <div className="calculator">
        <div className="calc-screen">
          <p className="p1">{this.state.expression}</p>
          <p id="rez" className="p2">{this.state.result}</p>
        </div>
        <div className="buttons">
          <div className="btn.none empty"></div>
          <div className="btn.none empty"></div>
          <div className="btn.none empty"></div>
          <div className="btn.none empty"></div>
          <div className="btn.none empty"></div>
          <div id="btn_clean_one" className="btn cleanOne" onClick={() => this.cleanOnePressed()}>{"<--"}</div>
          <div id="btn_clean_all" className="btn cleanAll" onClick={() => this.cleanAllPressed()}>AC</div>
          <div>
            <Link to={`/graph?expression=${this.state.result}`} className="link">Build Graph</Link>
          </div>
          <div id="btn_x" className="btn x bg-grey" onClick={() => this.xPressed()}>x</div>
          <div id="btn_e" className="btn e bg-grey" onClick={() => this.digitPressed("e")}>e</div>
          <div id="btn_bracket_open" className="btn bracketOpen" onClick={() => this.bracketOpenPressed()}>(</div>
          <div id="btn_bracket_close" className="btn bracketClose" onClick={() => this.bracketClosePressed()}>)</div>
          <div id="btn_pow" className="btn pow bg-orange" onClick={() => this.signPressed("^")}>^</div>
          <div id="btn_mod" className="btn mod bg-orange" onClick={() => this.signPressed("mod")}>mod</div>

          <div id="btn_sqrt" className="btn sqrt bg-grey" onClick={() => this.functionPressed("sqrt(")}>sqrt</div>
          <div id="btn_ln" className="btn ln bg-grey" onClick={() => this.functionPressed("ln(")}>ln</div>
          <div id="btn_log" className="btn log bg-grey" onClick={() => this.functionPressed("log(")}>log</div>
          <div id="btn_7" className="btn seven" onClick={() => this.digitPressed("7")}>7</div>
          <div id="btn_8" className="btn eight" onClick={() => this.digitPressed("8")}>8</div>
          <div id="btn_9" className="btn nine" onClick={() => this.digitPressed("9")}>9</div>
          <div id="btn_division" className="btn division bg-orange" onClick={() => this.signPressed("/")}>÷</div>

          <div id="btn_sin" className="btn sin bg-grey" onClick={() => this.functionPressed("sin(")}>sin</div>
          <div id="btn_cos" className="btn cos bg-grey" onClick={() => this.functionPressed("cos(")}>cos</div>
          <div id="btn_tan" className="btn tan bg-grey" onClick={() => this.functionPressed("tan(")}>tan</div>
          <div id="btn_4" className="btn four" onClick={() => this.digitPressed("4")}>4</div>
          <div id="btn_5" className="btn five" onClick={() => this.digitPressed("5")}>5</div>
          <div id="btn_6" className="btn six" onClick={() => this.digitPressed("6")}>6</div>
          <div id="btn_multiply" className="btn multiply bg-orange" onClick={() => this.signPressed("*")}>*</div>

          <div id="btn_asin" className="btn asin bg-grey" onClick={() => this.functionPressed("asin(")}>asin</div>
          <div id="btn_acos" className="btn acos bg-grey" onClick={() => this.functionPressed("acos(")}>acos</div>
          <div id="btn_atan" className="btn atan bg-grey" onClick={() => this.functionPressed("atan(")}>atan</div>
          <div id="btn_1" className="btn one" onClick={() => this.digitPressed("1")}>1</div>
          <div id="btn_2" className="btn two" onClick={() => this.digitPressed("2")}>2</div>
          <div id="btn_3" className="btn three" onClick={() => this.digitPressed("3")}>3</div>
          <div id="btn_minus" className="btn minus bg-orange" onClick={() => this.signPressed("-")}>-</div>

          <div className="inputX ">
            <label htmlFor="inX">x = </label> <input className="inX" id="inX" type="text" name="inX" value={this.state.x} onChange={this.handleInputChange}></input>
          </div>
          <div id="btn_0" className="btn zero" onClick={() => this.nullPressed()}>0</div>
          <div id="btn_dot" className="btn dot" onClick={() => this.dotPressed()}>.</div>

          <form onSubmit={this.handleFormSubmit}>
            <input id="ff" type="hidden" name="expression" value={this.state.result}></input>
            <button id="btn_equal" className="btn equal bg-red" type="submit">=</button>
          </form>
          <div id="btn_plus" className="btn plus bg-orange" onClick={() => this.signPressed("+")}>+</div>
        </div>
      </div>
    );
  }
}

export default Calculator;
// export default withRouter(Calculator); // Оберните компонент Calculator в withRouter

