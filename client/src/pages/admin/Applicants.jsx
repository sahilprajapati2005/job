import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Applicants = () => {
    const params = useParams();
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data.success) {
                    setApplicants(res.data.job.applications);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [params.id]);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
                // Refresh list logic would go here, or just basic UI update
                window.location.reload(); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status");
        }
    }

    const styles = {
        container: { maxWidth: '1200px', margin: '20px auto', padding: '20px' },
        title: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
        table: { width: '100%', borderCollapse: 'collapse', background: 'white' },
        th: { textAlign: 'left', padding: '15px', borderBottom: '2px solid #eee' },
        td: { padding: '15px', borderBottom: '1px solid #eee' },
        link: { color: '#6A38C2', textDecoration: 'none' },
        actionBtn: { padding: '5px 10px', fontSize: '12px', margin: '0 5px', borderRadius: '4px', cursor: 'pointer', border:'none', color:'white' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <h1 style={styles.title}>Applicants ({applicants.length})</h1>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Full Name</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Contact</th>
                            <th style={styles.th}>Resume</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th} align="right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((item) => (
                            <tr key={item._id}>
                                <td style={styles.td}>{item?.applicant?.fullname}</td>
                                <td style={styles.td}>{item?.applicant?.email}</td>
                                <td style={styles.td}>{item?.applicant?.phoneNumber}</td>
                                <td style={styles.td}>
                                    {item.applicant?.profile?.resume ? <a href={item.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" style={styles.link}>{item.applicant?.profile?.resumeOriginalName}</a> : "NA"}
                                </td>
                                <td style={styles.td}>{item?.createdAt.split("T")[0]}</td>
                                <td style={styles.td} align="right">
                                    {item.status === 'pending' ? (
                                        <>
                                            <button style={{...styles.actionBtn, backgroundColor:'#16a34a'}} onClick={() => statusHandler('accepted', item._id)}>Accept</button>
                                            <button style={{...styles.actionBtn, backgroundColor:'#dc2626'}} onClick={() => statusHandler('rejected', item._id)}>Reject</button>
                                        </>
                                    ) : (
                                        <span style={{fontWeight:'bold', color: item.status === 'accepted' ? '#16a34a' : '#dc2626'}}>
                                            {item.status.toUpperCase()}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applicants;