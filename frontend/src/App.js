import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm.js';
import ResultsDisplay from './ResultsDisplay.js';
import './App.css';

function App() {
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const calculate = async (formData) => {
        setIsLoading(true);
        setError('');
        setResults(null);
        try {
            // The API endpoint of your Flask backend
            const response = await axios.post('https://materialandtheirpricecalculator.onrender.com/api/estimate', formData);
            setResults(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch estimation.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>🏗️ Smart Construction Material Estimator</h1>
            </header>
            <main>
                <InputForm onCalculate={calculate} isLoading={isLoading} />
                {error && <p className="error">{error}</p>}
                {results && <ResultsDisplay data={results} />}
            </main>
        </div>
    );
}

export default App;
