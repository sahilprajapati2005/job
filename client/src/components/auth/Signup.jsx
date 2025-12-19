import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Optional: for loading spinner

const Signup = () => {
    const [input, setInput] = useState({ 
        fullname: "", 
        email: "", 
        phoneNumber: "", 
        password: "", 
        role: "", // Default is empty so user must select one
        file: null 
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validation: Ensure Role is selected
        if (!input.role) {
            toast.error("Please select a role (Student or Recruiter)");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    // Styles object to keep UI consistent
    const styles = {
        container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
        form: { width: '400px', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
        header: { marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#6A38C2' },
        inputWrapper: { marginBottom: '10px' },
        input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' },
        radioGroup: { display: 'flex', gap: '20px', marginBottom: '15px', marginTop: '5px' },
        radioLabel: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', cursor: 'pointer' },
        button: { 
            width: '100%', 
            padding: '10px', 
            background: '#6A38C2', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
        },
        link: { marginTop: '15px', fontSize: '14px', textAlign: 'center' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={submitHandler} style={styles.form}>
                    <h1 style={styles.header}>Signup</h1>
                    
                    <div style={styles.inputWrapper}>
                        <label style={{fontSize:'14px', fontWeight:'500', marginBottom:'5px', display:'block'}}>Full Name</label>
                        <input type="text" name="fullname" value={input.fullname} onChange={changeHandler} placeholder="Full Name" style={styles.input} required />
                    </div>
                    
                    <div style={styles.inputWrapper}>
                        <label style={{fontSize:'14px', fontWeight:'500', marginBottom:'5px', display:'block'}}>Email</label>
                        <input type="email" name="email" value={input.email} onChange={changeHandler} placeholder="Email" style={styles.input} required />
                    </div>
                    
                    <div style={styles.inputWrapper}>
                        <label style={{fontSize:'14px', fontWeight:'500', marginBottom:'5px', display:'block'}}>Phone Number</label>
                        <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} placeholder="Phone Number" style={styles.input} required />
                    </div>
                    
                    <div style={styles.inputWrapper}>
                        <label style={{fontSize:'14px', fontWeight:'500', marginBottom:'5px', display:'block'}}>Password</label>
                        <input type="password" name="password" value={input.password} onChange={changeHandler} placeholder="Password" style={styles.input} required />
                    </div>

                    {/* Role Selection Radio Buttons */}
                    <div style={styles.inputWrapper}>
                        <div style={styles.radioGroup}>
                            <label style={styles.radioLabel}>
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="student" 
                                    checked={input.role === 'student'} 
                                    onChange={changeHandler} 
                                    style={{cursor:'pointer'}}
                                /> 
                                Student
                            </label>
                            <label style={styles.radioLabel}>
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="recruiter" 
                                    checked={input.role === 'recruiter'} 
                                    onChange={changeHandler} 
                                    style={{cursor:'pointer'}}
                                /> 
                                Recruiter
                            </label>
                        </div>
                    </div>

                    <div style={styles.inputWrapper}>
                        <label style={{fontSize:'14px', fontWeight:'500', marginBottom:'5px', display:'block'}}>Profile Photo</label>
                        <input type="file" onChange={fileHandler} accept="image/*" style={{fontSize:'14px'}} />
                    </div>
                    
                    <button 
                        type="submit" 
                        style={{...styles.button, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
                        disabled={loading}
                    >
                        {loading && <Loader2 className='animate-spin h-4 w-4' />}
                        {loading ? 'Please wait' : 'Signup'}
                    </button>
                    
                    <p style={styles.link}>
                        Already have an account? <Link to="/login" style={{color:'blue', textDecoration:'none'}}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;