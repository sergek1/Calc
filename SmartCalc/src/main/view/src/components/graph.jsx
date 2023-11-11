import React, { Component } from "react";
import Chart from "chart.js/auto";

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: "",
        };
    }
    chartRef = React.createRef();

    makeRequest = (expression) => {
        let encodedExpression = encodeURIComponent(expression);
        let url = `http://localhost:8080/graph?expression=${encodedExpression}`;

        // this.setState(() => ({ expression: expression }));
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.text())
            .then((body) => {
                console.log(body + "body");
                // this.setState(() => ({ expression: body }));
            });
    }
    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const expression = searchParams.get('expression');
        this.setState(() => ({ expression: expression }));
        this.buildChart();
        this.makeRequest(expression);
    }

    buildChart() {
        const ctx = this.chartRef.current.getContext("2d");
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
                datasets: [
                    {
                        label: "Dataset Label",
                        data: [3, 5, 2, 8, 1],
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                // Параметры настройки графика
            },
        });
    }

    render() {

        return (
            <div>
                <h1>Expression: {this.state.expression}</h1>
                <canvas ref={this.chartRef} width={400} height={400}></canvas>
            </div>
        );
    }
}

export default Graph;
