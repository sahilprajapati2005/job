import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { Eye, Edit2 } from 'lucide-react';
import { setSearchCompanyByText } from '@/redux/companySlice'; // Reusing this action for filtering text

const AdminJobs = () => {
    useGetAllAdminJobs(); // Fetch admin jobs
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allJobs } = useSelector(store => store.job);

    useEffect(() => {
        // Simple client-side search logic
        dispatch(setSearchCompanyByText(input)); 
    }, [input, dispatch]);

    const styles = {
        container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
        header: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
        input: { padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' },
        table: { width: '100%', borderCollapse: 'collapse', background: 'white', marginTop: '20px' },
        th: { textAlign: 'left', padding: '15px', borderBottom: '1px solid #eee' },
        td: { padding: '15px', borderBottom: '1px solid #eee' }
    };

    // Filter jobs based on input
    const filteredJobs = allJobs?.filter(job => 
        job.title.toLowerCase().includes(input.toLowerCase()) || 
        job.company?.name.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <input 
                        type="text" 
                        placeholder="Filter by role or company" 
                        onChange={(e) => setInput(e.target.value)} 
                        style={styles.input}
                    />
                    <button className="btn btn-primary" onClick={() => navigate("/admin/jobs/create")}>
                        Post New Job
                    </button>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}>Company</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th} align="right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs?.map((job) => (
                            <tr key={job._id}>
                                <td style={styles.td}>{job.title}</td>
                                <td style={styles.td}>{job.company?.name}</td>
                                <td style={styles.td}>{job.createdAt.split("T")[0]}</td>
                                <td style={styles.td} align="right">
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                        <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} title="View Applicants">
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminJobs;