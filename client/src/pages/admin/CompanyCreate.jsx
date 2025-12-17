import React, { useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if(!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            // This will show you WHY it failed (e.g., "Company already exists")
            toast.error(error.response?.data?.message || "Failed to create company");
        }
    }

    const styles = {
        container: { maxWidth: '600px', margin: '40px auto', padding: '20px' },
        title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' },
        desc: { color: '#666', marginBottom: '30px' },
        input: { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '20px' },
        btnGroup: { display: 'flex', gap: '10px', marginTop: '20px' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.title}>Your Company Name</h1>
                <p style={styles.desc}>What would you like to give your company name? You can change this later.</p>

                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Company Name</label>
                <input 
                    type="text" 
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    style={styles.input}
                />

                <div style={styles.btnGroup}>
                    <button className="btn btn-outline" onClick={() => navigate("/admin/companies")}>Cancel</button>
                    <button className="btn btn-primary" onClick={registerNewCompany}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default CompanyCreate;