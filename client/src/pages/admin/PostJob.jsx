import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "", description: "", requirements: "",
        salary: "", location: "", jobType: "", experience: "",
        position: 0, companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    
    // Select company handler
    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(c => c.name.toLowerCase() === e.target.value.toLowerCase());
        if(selectedCompany) setInput({...input, companyId: selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
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
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: { maxWidth: '600px', margin: '40px auto', padding: '20px' },
        form: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
        label: { display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' },
        input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' },
        full: { gridColumn: '1 / -1' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={submitHandler} style={styles.form}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Post a New Job</h1>
                    
                    <div style={styles.grid}>
                        <div><label style={styles.label}>Title</label><input type="text" name="title" value={input.title} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>Description</label><input type="text" name="description" value={input.description} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>Requirements</label><input type="text" name="requirements" value={input.requirements} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>Salary (LPA)</label><input type="text" name="salary" value={input.salary} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>Location</label><input type="text" name="location" value={input.location} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>Job Type</label><input type="text" name="jobType" value={input.jobType} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>Experience (Yrs)</label><input type="text" name="experience" value={input.experience} onChange={changeHandler} style={styles.input} /></div>
                        <div><label style={styles.label}>No. of Positions</label><input type="number" name="position" value={input.position} onChange={changeHandler} style={styles.input} /></div>
                        
                        <div style={styles.full}>
                            <label style={styles.label}>Select Company</label>
                            {companies.length > 0 ? (
                                <select onChange={selectChangeHandler} style={styles.input}>
                                    <option value="">--Select Company--</option>
                                    {companies.map(company => (
                                        <option key={company._id} value={company.name}>{company.name}</option>
                                    ))}
                                </select>
                            ) : <p style={{color:'red', fontSize:'12px'}}>Please register a company first</p>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                        {loading ? "Posting..." : "Post Job"}
                    </button>
                    {companies.length === 0 && <p style={{textAlign:'center', marginTop:'10px', fontSize:'14px', color:'red'}}>* You must register a company before posting a job</p>}
                </form>
            </div>
        </div>
    );
};

export default PostJob;