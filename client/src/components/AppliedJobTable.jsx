import React from 'react';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    // Ideally you fetch this data using a custom hook: useGetAppliedJobs()
    const { allAppliedJobs } = useSelector(store => store.job); // Ensure you have this state in your store

    const styles = {
        table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
        th: { textAlign: 'left', padding: '12px', borderBottom: '2px solid #eee', color: '#666', fontSize: '14px' },
        td: { padding: '12px', borderBottom: '1px solid #eee', fontSize: '14px' },
        badge: { padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }
    };

    // Dummy data fallback if redux is empty for visualization
    const appliedJobs = allAppliedJobs?.length > 0 ? allAppliedJobs : [
        { _id: '1', createdAt: '2023-10-10', job: { title: 'Frontend Developer', company: { name: 'Google' } }, status: 'selected' },
        { _id: '2', createdAt: '2023-10-15', job: { title: 'Backend Engineer', company: { name: 'Microsoft' } }, status: 'pending' },
    ];

    const getStatusStyle = (status) => {
        switch(status.toLowerCase()) {
            case 'rejected': return { background: '#ffe4e6', color: '#dc2626' };
            case 'selected': return { background: '#dcfce7', color: '#16a34a' };
            default: return { background: '#e5e7eb', color: '#374151' };
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Applied Jobs</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Job Role</th>
                        <th style={styles.th}>Company</th>
                        <th style={styles.th} align="right">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appliedJobs.map(appliedJob => (
                        <tr key={appliedJob._id}>
                            <td style={styles.td}>{appliedJob.createdAt?.split("T")[0]}</td>
                            <td style={styles.td}>{appliedJob.job?.title}</td>
                            <td style={styles.td}>{appliedJob.job?.company?.name}</td>
                            <td style={styles.td} align="right">
                                <span style={{ ...styles.badge, ...getStatusStyle(appliedJob.status) }}>
                                    {appliedJob.status.toUpperCase()}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobTable;