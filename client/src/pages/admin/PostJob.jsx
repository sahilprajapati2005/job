import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "", // Matches the backend controller expectation
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    // Safety check: default to empty array if companies is undefined
    const { companies = [] } = useSelector(store => store.company);

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === e.target.value.toLowerCase());
        if(selectedCompany) {
            setInput({...input, companyId: selectedCompany._id});
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Basic validation before sending
        if(companies.length === 0) {
             toast.error("Please register a company first.");
             return;
        }
        if(!input.companyId) {
            toast.error("Please select a company.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: { maxWidth: '600px', margin: '40px auto', padding: '20px' },
        form: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
        label: { display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px', color: '#333' },
        input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', outline: 'none' },
        full: { gridColumn: '1 / -1' },
        // Added button style to ensure it looks good even without external CSS classes
        button: {
            width: '100%', 
            marginTop: '20px', 
            padding: '12px', 
            background: '#6A38C2', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            opacity: loading ? 0.7 : 1
        }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={submitHandler} style={styles.form}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#333' }}>Post a New Job</h1>
                    
                    <div style={styles.grid}>
                        <div>
                            <label style={styles.label}>Title</label>
                            <input type="text" name="title" value={input.title} onChange={changeHandler} style={styles.input} placeholder="e.g. Software Engineer" required />
                        </div>
                        <div>
                            <label style={styles.label}>Description</label>
                            <input type="text" name="description" value={input.description} onChange={changeHandler} style={styles.input} placeholder="Job description..." required />
                        </div>
                        <div>
                            <label style={styles.label}>Requirements</label>
                            <input type="text" name="requirements" value={input.requirements} onChange={changeHandler} style={styles.input} placeholder="React, Node.js" required />
                        </div>
                        <div>
                            <label style={styles.label}>Salary (LPA)</label>
                            <input type="number" name="salary" value={input.salary} onChange={changeHandler} style={styles.input} placeholder="e.g. 12" required />
                        </div>
                        <div>
                            <label style={styles.label}>Location</label>
                            <input type="text" name="location" value={input.location} onChange={changeHandler} style={styles.input} placeholder="e.g. Mumbai" required />
                        </div>
                        <div>
                            <label style={styles.label}>Job Type</label>
                            <input type="text" name="jobType" value={input.jobType} onChange={changeHandler} style={styles.input} placeholder="e.g. Full Time" required />
                        </div>
                        <div>
                            <label style={styles.label}>Experience (Yrs)</label>
                            <input type="number" name="experience" value={input.experience} onChange={changeHandler} style={styles.input} placeholder="e.g. 2" required />
                        </div>
                        <div>
                            <label style={styles.label}>No. of Positions</label>
                            <input type="number" name="position" value={input.position} onChange={changeHandler} style={styles.input} placeholder="e.g. 5" required />
                        </div>
                        
                        <div style={styles.full}>
                            <label style={styles.label}>Select Company</label>
                            {companies.length > 0 ? (
                                <select onChange={selectChangeHandler} style={styles.input} defaultValue="">
                                    <option value="" disabled>--Select Company--</option>
                                    {companies.map(company => (
                                        <option key={company._id} value={company.name}>{company.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <p style={{color:'red', fontSize:'12px', marginTop:'5px'}}>
                                    No companies found. Please register a company first.
                                </p>
                            )}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? "Posting..." : "Post Job"}
                    </button>
                    
                    {companies.length === 0 && (
                        <p style={{textAlign:'center', marginTop:'15px', fontSize:'13px', color:'red'}}>
                            * You must register a company before posting a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;