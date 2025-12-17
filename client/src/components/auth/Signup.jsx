// Simplified Signup similar to Login logic, ensuring fields: fullname, email, phoneNumber, password, role
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "student", file: null });
    const navigate = useNavigate();

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const fileHandler = (e) => setInput({ ...input, file: e.target.files[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <form onSubmit={submitHandler} style={{ width: '400px', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>Signup</h1>
                    {/* Add inputs for fullname, email, phone, password similar to Login */}
                    <div style={{ marginBottom: '10px' }}>
                        <input type="text" name="fullname" value={input.fullname} onChange={changeHandler} placeholder="Full Name" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input type="email" name="email" value={input.email} onChange={changeHandler} placeholder="Email" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeHandler} placeholder="Phone Number" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input type="password" name="password" value={input.password} onChange={changeHandler} placeholder="Password" style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <input type="file" onChange={fileHandler} accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Signup</button>
                    <p style={{ marginTop: '10px' }}>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signup;