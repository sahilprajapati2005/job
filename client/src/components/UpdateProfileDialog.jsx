import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: null
    });

    if (!open) return null;

    const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const fileHandler = (e) => setInput({ ...input, file: e.target.files[0] });

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) formData.append("file", input.file);

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' },
        modal: { background: 'white', padding: '20px', borderRadius: '8px', width: '90%', maxWidth: '500px', position: 'relative' },
        closeBtn: { position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', cursor: 'pointer' },
        formGroup: { marginBottom: '15px' },
        label: { display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '14px' },
        input: { width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Update Profile</h2>
                <button onClick={() => setOpen(false)} style={styles.closeBtn}><X size={20} /></button>
                
                <form onSubmit={submitHandler}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Name</label>
                        <input type="text" name="fullname" value={input.fullname} onChange={changeHandler} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input type="email" name="email" value={input.email} onChange={changeHandler} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Bio</label>
                        <input type="text" name="bio" value={input.bio} onChange={changeHandler} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Skills (Comma separated)</label>
                        <input type="text" name="skills" value={input.skills} onChange={changeHandler} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Resume/File</label>
                        <input type="file" accept="application/pdf,image/*" onChange={fileHandler} style={styles.input} />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileDialog;