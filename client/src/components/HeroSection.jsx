import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice'; // Optional: If you implement search filter in Redux later
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = () => {
        // dispatch(setSearchedQuery(query)); // Future implementation
        navigate("/browse");
    }

    const styles = {
        container: { textAlign: 'center', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' },
        badge: { padding: '8px 16px', borderRadius: '20px', backgroundColor: '#F3F4F6', color: '#F83002', fontWeight: 'bold', fontSize: '14px', display: 'inline-block', marginBottom: '10px' },
        title: { fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', lineHeight: '1.2' },
        highlight: { color: '#6A38C2' },
        subtitle: { fontSize: '1rem', color: '#666', maxWidth: '600px' },
        searchContainer: { display: 'flex', width: '100%', maxWidth: '600px', borderRadius: '50px', border: '1px solid #e5e7eb', padding: '5px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '20px', background: 'white' },
        input: { width: '100%', padding: '12px 20px', border: 'none', outline: 'none', borderRadius: '50px', fontSize: '16px' },
        button: { backgroundColor: '#6A38C2', color: 'white', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <span style={styles.badge}>No. 1 Job Hunt Website</span>
            <h1 style={styles.title}>
                Search, Apply & <br /> Get Your <span style={styles.highlight}>Dream Job</span>
            </h1>
            <p style={styles.subtitle}>
                Connecting talent with opportunity. Find thousands of jobs, internships, and employment opportunities from top companies.
            </p>
            <div style={styles.searchContainer}>
                <input 
                    type="text" 
                    placeholder="Find your dream job"
                    onChange={(e) => setQuery(e.target.value)}
                    style={styles.input}
                />
                <button onClick={searchHandler} style={styles.button}>
                    <Search size={24} />
                </button>
            </div>
        </div>
    )
}

export default HeroSection;