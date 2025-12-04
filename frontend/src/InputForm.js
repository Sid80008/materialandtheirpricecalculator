import React, { useState } from 'react';

const InputForm = ({ onCalculate, isLoading }) => {
    const [formData, setFormData] = useState({
        length: '',
        width: '',
        height: '',
        floors: '1',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCalculate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="input-form">
            <input name="length" value={formData.length} onChange={handleChange} placeholder="Length (meters)" required type="number" />
            <input name="width" value={formData.width} onChange={handleChange} placeholder="Width (meters)" required type="number" />
            <input name="height" value={formData.height} onChange={handleChange} placeholder="Height per Floor (meters)" required type="number" />
            <input name="floors" value={formData.floors} onChange={handleChange} placeholder="Number of Floors" required type="number" min="1"/>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Calculating...' : 'Calculate'}
            </button>
        </form>
    );
};

export default InputForm;
