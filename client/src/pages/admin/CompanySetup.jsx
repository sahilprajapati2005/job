import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById';
import { ArrowLeft, Loader2 } from 'lucide-react';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id); // Fetch data on load
    
    const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
        }
    }, [singleCompany]);

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const fileHandler = (e) => setInput({ ...input, file: e.target.files[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) formData.append("file", input.file);

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating company");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: { maxWidth: '800px', margin: '40px auto', padding: '20px' },
        form: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
        header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' },
        backBtn: { background: 'none', border: 'none', cursor: 'pointer' },
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
        fullWidth: { gridColumn: '1 / -1' },
        label: { display: 'block', marginBottom: '8px', fontWeight: '500' },
        input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={submitHandler} style={styles.form}>
                    <div style={styles.header}>
                        <button type="button" onClick={() => navigate("/admin/companies")} style={styles.backBtn}>
                            <ArrowLeft />
                        </button>
                        <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Company Setup</h1>
                    </div>

                    <div style={styles.grid}>
                        <div>
                            <label style={styles.label}>Company Name</label>
                            <input type="text" name="name" value={input.name} onChange={changeHandler} style={styles.input} />
                        </div>
                        <div>
                            <label style={styles.label}>Description</label>
                            <input type="text" name="description" value={input.description} onChange={changeHandler} style={styles.input} />
                        </div>
                        <div>
                            <label style={styles.label}>Website</label>
                            <input type="text" name="website" value={input.website} onChange={changeHandler} style={styles.input} />
                        </div>
                        <div>
                            <label style={styles.label}>Location</label>
                            <input type="text" name="location" value={input.location} onChange={changeHandler} style={styles.input} />
                        </div>
                        <div style={styles.fullWidth}>
                            <label style={styles.label}>Logo</label>
                            <input type="file" accept="image/*" onChange={fileHandler} style={styles.input} />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }} disabled={loading}>
                        {loading ? <span style={{display: 'flex', justifyContent:'center', gap:'5px'}}> <Loader2 className='animate-spin'/> Please wait </span> : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;