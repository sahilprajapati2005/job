import React, { useState } from 'react';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const styles = {
        card: { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
        title: { fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' },
        group: { marginBottom: '20px' },
        groupTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '10px' },
        label: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer', fontSize: '14px', color: '#555' },
        radio: { accentColor: '#6A38C2', cursor: 'pointer' }
    };

    return (
        <div style={styles.card}>
            <h1 style={styles.title}>Filter Jobs</h1>
            <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #eee' }} />
            
            {filterData.map((data, index) => (
                <div key={index} style={styles.group}>
                    <h2 style={styles.groupTitle}>{data.filterType}</h2>
                    {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        return (
                            <label key={itemId} style={styles.label}>
                                <input 
                                    type="radio" 
                                    name={data.filterType} 
                                    value={item} 
                                    checked={selectedValue === item}
                                    onChange={() => changeHandler(item)}
                                    style={styles.radio}
                                />
                                {item}
                            </label>
                        )
                    })}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;