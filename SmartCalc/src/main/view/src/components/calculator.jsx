import React from "react";
import { useState } from "react";

const Calculator = () => {
    const [result, setResult] = useState("0");
    const [expression, setExpression] = useState("0");
    const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const action = ['-', '+', '÷', 'x'];

    let is_digit = true, is_sign = false, is_close_bracket = false, is_open_bracket = false,
        is_point = false, is_minus = false, is_x = false, is_e = false;
    let open_brackets_count = 0, close_brackets_count = 0;

    let point = '.';

    const digitPressed = (key) => {
        var size = result.length;
        if (key === 'e') {
            if (!is_e && !is_sign && result.substring(size - 1, size) !== 'e' && is_digit) {
                setResult(prevResult => prevResult + key);
                setExpression(prevExpression => prevExpression + key);
                is_sign = is_e = true;
                is_digit = false;
            }
        } else {
            if (result.substring(size - 1, size) === '0' &&
                !(digit.includes(key))) {
                setResult(prevResult => prevResult.substring(0, size - 1));
            }

            if (result === "0" || result === "nan" || result === "inf" || result === "-inf") {
                setResult(key);
            } else {
                if (is_x || is_close_bracket) setResult(prevResult => prevResult + '*');
                if (result.substring(size - 1, size) === '-' &&
                    result.substring(size - 2, size) === 'e') is_e = true;
                setResult(prevResult => prevResult + key);
            }
            is_digit = true;
            is_minus = is_open_bracket = is_close_bracket = is_x = is_sign = false;
        }
    }

    function signPressed(text) {
        if (result !== "nan" && result !== "inf" && result !== "-inf") {
            var size = result.length;

            if (is_digit || is_close_bracket || is_x) {
                if (result.charAt(size - 1) !== 'e') {
                    setResult(prevResult => prevResult + text);
                    is_sign = true;
                    is_close_bracket = is_x = false;
                }
            } else if ((is_open_bracket || !result) && text === "-") {
                setResult(prevResult => prevResult + text);
            } else if ((is_e || is_sign) && !is_minus) {
                if (text === "-") {
                    if (
                        result.charAt(size - 1) === '*' ||
                        result.charAt(size - 1) === '/' ||
                        result.charAt(size - 1) === 'd' ||
                        result.charAt(size - 1) === 'e'
                    ) {
                        is_minus = true;
                    } else {
                        setResult(prevResult => prevResult.substring(0, size - 1));
                    }
                    setResult(prevResult => prevResult + text);
                } else {
                    if (result.charAt(size - 1) === 'd') {
                        setResult(prevResult => prevResult.substring(0, size - 3));
                    } else {
                        setResult(prevResult => prevResult.substring(0, size - 1));
                    }
                    setResult(prevResult => prevResult + text);
                }
            }
            is_point = is_open_bracket = is_digit = is_e = false;
        }
    }
    const nullPressed = () => {
        const text = '0';
        var size = result.length;
        if (is_close_bracket || is_x) {
          setResult(prevResult => prevResult + "*");
          is_close_bracket = is_x = false;
        }
        if (!(result.charAt(size - 1) === '0' && result.charAt(size - 2) !== point &&
          !(digit.includes(result.charAt(size - 2)))
        )) {
          setResult(prevResult => prevResult + text);
        }
        is_sign = false;
        is_digit = true;
      }
    
      const functionPressed = (text) => {
        if (result === "0" || result === "nan" || result === "inf" || result === "-inf") {
          setResult("");
        }
        if (result.charAt(result.length - 1) !== 'e') {
          if ((is_digit || is_point || is_close_bracket || is_x) && result.length !== 0) {
            setResult(prevResult => prevResult + '*');
          }
          setResult(prevResult => prevResult + text);
          open_brackets_count++;
          is_open_bracket = true;
          is_point = is_digit = is_close_bracket = is_x = false;
        }
      }
    
      const dotPressed = () => {
        var size = (result.length !== 0) ? (result.length - 1) : 0;
        is_point = false;
        while (size > 0 && (digit.includes(result.charAt(size)) || result.charAt(size) === point)) {
          if (result.charAt(size) === point) {
            is_point = true;
          }
          size--;
        }
        if (is_digit && !is_point && !is_close_bracket) {
          is_point = true;
          setResult(prevResult => prevResult + point);
        }
      }
    
      const bracketOpenPressed = () => {
        const text = '(';
        if (result === "0" || result === "nan" || result === "inf" || result === "-inf") {
          setResult("");
        }
        var size = result.length;
        if (size === 0 || (result.charAt(size - 1) !== 'e' && result.substring(size - 2, size) !== "e-")) {
          if ((is_digit || is_point || is_close_bracket || result.charAt(size - 1) === 'x') && size !== 0) {
            setResult(prevResult => prevResult + '*');
          }
          open_brackets_count++;
          setResult(prevResult => prevResult + text);
          is_open_bracket = true;
          is_digit = is_close_bracket = is_sign = is_point = false;
        }
      }
    
      const bracketClosePressed = () => {
        const text = ')';
    
        if (open_brackets_count > close_brackets_count) {
          if ((is_digit || is_close_bracket || is_x) && !is_sign) {
            close_brackets_count++;
            setResult(prevResult => prevResult + text);
            is_close_bracket = true;
            is_digit = is_point = is_x = false;
          }
        }
      }
    
      const xPressed = () => {
        if (result === "0" || result === "nan" || result === "inf" || result === "-inf") {
          setResult("");
        }
        if ((is_digit || is_close_bracket || is_x || is_point)
          && result.length !== 0 && !is_sign && !is_open_bracket) {
          setResult(prevResult => prevResult + "*");
        }
        setResult(prevResult => prevResult + "x");
        is_digit = is_sign = is_close_bracket = is_open_bracket = is_point = false;
        is_x = true;
      }






    return (
        <div className="calculator">
            <div className="calc-screen">
                <p className="p1">{expression}</p>
                <p id="rez" className="p2">{result}</p>
            </div>
            <div className="buttons">
                <div className="btn.none empty"></div>
                <div className="btn.none empty"></div>
                <div className="btn.none empty"></div>
                <div className="btn.none empty"></div>
                <div className="btn.none empty"></div>
                <div id="btn_clean_one" className="btn cleanOne">--</div>
                <div id="btn_clean_all" className="btn cleanAll">AC</div>

                <form action="/graph">
                    <input id="graphId" type="hidden" name="expression" value=""></input>
                    <button id="btn_graph" className="btn graph bg-green" type="submit">graph</button>
                </form>


                <div id="btn_x" className="btn x bg-grey">x</div>
                <div id="btn_e" className="btn e bg-grey">e</div>
                <div id="btn_bracket_open" className="btn bracketOpen">(</div>
                <div id="btn_bracket_close" className="btn bracketClose">)</div>
                <div id="btn_pow" className="btn pow bg-orange" onClick={() => signPressed("^")}>^</div>
                <div id="btn_mod" className="btn mod bg-orange" onClick={() => signPressed("mod")}>mod</div>

                <div id="btn_sqrt" className="btn sqrt bg-grey">sqrt</div>
                <div id="btn_ln" className="btn ln bg-grey">ln</div>
                <div id="btn_log" className="btn log bg-grey">log</div>
                <div id="btn_7" className="btn seven" onClick={() => digitPressed("7")}>7</div>
                <div id="btn_8" className="btn eight" onClick={() => digitPressed("8")}>8</div>
                <div id="btn_9" className="btn nine" onClick={() => digitPressed("9")}>9</div>
                <div id="btn_division" className="btn division bg-orange" onClick={() => signPressed("÷")}>÷</div>

                <div id="btn_sin" className="btn sin bg-grey">sin</div>
                <div id="btn_cos" className="btn cos bg-grey">cos</div>
                <div id="btn_tan" className="btn tan bg-grey">tan</div>
                <div id="btn_4" className="btn four" onClick={() => digitPressed("4")}>4</div>
                <div id="btn_5" className="btn five" onClick={() => digitPressed("5")}>5</div>
                <div id="btn_6" className="btn six" onClick={() => digitPressed("6")}>6</div>
                <div id="btn_multiply" className="btn multiply bg-orange" onClick={() => signPressed("*")}>*</div>

                <div id="btn_asin" className="btn asin bg-grey">asin</div>
                <div id="btn_acos" className="btn acos bg-grey">acos</div>
                <div id="btn_atan" className="btn atan bg-grey">atan</div>
                <div id="btn_1" className="btn one" onClick={() => digitPressed("1")}>1</div>
                <div id="btn_2" className="btn two" onClick={() => digitPressed("2")}>2</div>
                <div id="btn_3" className="btn three" onClick={() => digitPressed("3")}>3</div>
                <div id="btn_minus" className="btn minus bg-orange" onClick={() => signPressed("-")}>-</div>

                <div className="inputX ">
                    <label for="inX">x = </label> <input className="inX" id="inX" type="text" name="inX" value="1.0"></input>
                </div>
                <div id="btn_0" className="btn zero">0</div>
                <div id="btn_dot" className="btn dot">.</div>

                <form action="/calculate">
                    <input id="ff" type="hidden" name="expression" value=""></input>
                    <button id="btn_equal" className="btn equal bg-red" type="submit">=</button>
                </form>
                <div id="btn_plus" className="btn plus bg-orange" onClick={() => signPressed("+")}>+</div>
            </div>
        </div>
    );
    // }
}

export default Calculator;