import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { Mail, Pen, Phone } from 'lucide-react';
import AppliedJobTable from '../components/AppliedJobTable';
import UpdateProfileDialog from '../components/UpdateProfileDialog';
import { useSelector } from 'react-redux';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const isResume = user?.profile?.resume; // Assuming backend returns a boolean or url

    const styles = {
        container: { maxWidth: '800px', margin: '20px auto', padding: '0 20px' },
        card: { background: 'white', border: '1px solid #eee', borderRadius: '8px', padding: '30px', marginBottom: '20px' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
        userInfo: { display: 'flex', gap: '20px', alignItems: 'center' },
        avatar: { width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' },
        infoItem: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', color: '#555' },
        skillsContainer: { display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '15px 0' },
        resumeLink: { color: '#6A38C2', textDecoration: 'none', fontWeight: '500' },
        editBtn: { background: 'white', border: '1px solid #ccc', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                {/* Profile Info Section */}
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.userInfo}>
                            <img src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" style={styles.avatar} />
                            <div>
                                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{user?.fullname}</h1>
                                <p style={{ color: '#666' }}>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <button onClick={() => setOpen(true)} style={styles.editBtn} title="Edit Profile"><Pen size={18} /></button>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <div style={styles.infoItem}><Mail size={18} /> <span>{user?.email}</span></div>
                        <div style={styles.infoItem}><Phone size={18} /> <span>{user?.phoneNumber}</span></div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold' }}>Skills</h2>
                        <div style={styles.skillsContainer}>
                            {user?.profile?.skills?.length > 0 ? user.profile.skills.map((item, index) => (
                                <span key={index} className="badge badge-blue">{item}</span>
                            )) : <span>NA</span>}
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Resume</label>
                        {isResume ? <a target='_blank' rel="noreferrer" href={user?.profile?.resume} style={styles.resumeLink}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div style={styles.card}>
                    <AppliedJobTable />
                </div>
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;