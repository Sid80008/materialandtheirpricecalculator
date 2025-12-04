import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsDisplay = ({ data }) => {
    const { quantities, costs, total_cost } = data;

    const chartData = Object.keys(costs).map(key => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: costs[key]
    }));
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    return (
        <div className="results-container">
            <h2>Estimation Results</h2>
            <div className="results-grid">
                <div className="results-table">
                    <h3>Bill of Quantities (BOQ)</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Material</th>
                                <th>Quantity</th>
                                <th>Estimated Cost (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cement</td>
                                <td>{quantities.cement_bags.toLocaleString()} bags</td>
                                <td>₹ {costs.cement.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Sand</td>
                                <td>{quantities.sand_cft.toLocaleString()} cft</td>
                                <td>₹ {costs.sand.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Aggregate</td>
                                <td>{quantities.aggregate_cft.toLocaleString()} cft</td>
                                <td>₹ {costs.aggregate.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Steel</td>
                                <td>{quantities.steel_kg.toLocaleString()} kg</td>
                                <td>₹ {costs.steel.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Bricks</td>
                                <td>{quantities.bricks_count.toLocaleString()} pieces</td>
                                <td>₹ {costs.bricks.toLocaleString()}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2"><strong>Total Estimated Cost</strong></td>
                                <td><strong>₹ {total_cost.toLocaleString()}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="results-chart">
                    <h3>Cost Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;  