import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "student" });
    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <form onSubmit={submitHandler} style={{ width: '400px', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Login</h1>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input type="email" name="email" value={input.email} onChange={changeHandler} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="user@example.com" />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input type="password" name="password" value={input.password} onChange={changeHandler} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Password" />
                    </div>

                    <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                        <label><input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeHandler} /> Student</label>
                        <label><input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeHandler} /> Recruiter</label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>Don't have an account? <Link to="/signup" style={{ color: 'blue' }}>Signup</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;