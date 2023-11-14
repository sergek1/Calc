import React, { Component } from "react";
import Chart from "chart.js/auto";
import '../css/graph.css'

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: "",
            xMin: -10.0,
            xMax: 10.0,
            yMin: -10.0,
            yMax: 10.0,
            isInit: true
        };
    }

    chartRef = React.createRef();

    makeRequest = (expression) => {
        let encodedExpression = encodeURIComponent(expression);
        let url = `http://localhost:8080/graph?expression=${encodedExpression}&xMinStr=${this.state.xMin.toString()}&xMaxStr=${this.state.xMax.toString()}`;

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then((data) => {
                const xValues = data.x;
                const yValues = data.y;
                const minX = Math.min(...xValues);
                console.log(minX + "minX");
                const maxX = Math.max(...xValues);
                console.log(maxX + "maxX");
                this.setState(() => ({ xMin: minX, xMax: maxX }));

                if (this.state.isInit) {
                    const minY = Math.min(...yValues);
                    const maxY = Math.max(...yValues);
                    console.log(minY + "minY" + maxY + "maxY");
                    this.setState(() => ({ yMin: minY, yMax: maxY, isInit: false }));
                }

                this.buildChart(xValues, yValues);
            });
    }

    resetYAxis = () => {
        const xMin = document.getElementById("x_min").value;
        const xMax = document.getElementById("x_max").value;
        const yMin = document.getElementById("y_min").value;
        const yMax = document.getElementById("y_max").value;
        this.setState({ xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax }, () => {
            this.makeRequest(this.state.expression);
        });
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        let expression = searchParams.get('expression');
        const openBracket = new RegExp("\\(", 'g');
        const matchesOpenBracket = expression.match(openBracket);
        const countOpenBracket = matchesOpenBracket ? matchesOpenBracket.length : 0;

        const closeBracket = new RegExp("\\)", 'g');
        const matchesCloseBracket = expression.match(closeBracket);
        const countCloseBracket = matchesCloseBracket ? matchesCloseBracket.length : 0;

        const additionalBrackets = ')'.repeat(countOpenBracket - countCloseBracket)
        expression += additionalBrackets;
        this.setState(() => ({ expression: expression }));
        this.makeRequest(expression);
    }

    buildChart(xValues, yValues) {
        const ctx = this.chartRef.current.getContext("2d");
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: this.state.expression,
                        data: yValues,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        min: this.state.yMin,
                        max: this.state.yMax,
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                const numberValue = Number(value);
                                return numberValue.toFixed(2);
                            }
                        }
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16,
                                family: 'Arial',
                            },
                        },
                    },
                },
            },
        });
    }

    render() {

        return (
            <div className="graph">
                <canvas ref={this.chartRef} width={600} height={600}></canvas>
                <div className="row">
                    <div className="input">
                        <label>x min = </label>
                        <input className="inX" id="x_min" type="number" name="inX" step="1" defaultValue={this.state.xMin} />
                    </div>
                    <div className="input">
                        <label>x max = </label>
                        <input className="inX" id="x_max" type="number" name="inX" step="1" defaultValue={this.state.xMax} />
                    </div>
                </div>

                <div className="row">
                    <div className="input">
                        <label>y min = </label>
                        <input className="inX" id="y_min" type="number" name="inX" step="1" value={this.state.yMin}
                            onChange={(e) => this.setState({ yMin: e.target.value })} />
                    </div>
                    <div className="input">
                        <label>y max = </label>
                        <input className="inX" id="y_max" type="number" name="inX" step="1" value={this.state.yMax}
                            onChange={(e) => this.setState({ yMax: e.target.value })} />
                    </div>
                </div>

                <button className="button" onClick={() => {

                    this.resetYAxis()
                }}>Вычислить</button>
            </div>
        );
    }
}

export default Graph;
