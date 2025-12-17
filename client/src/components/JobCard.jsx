import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const styles = {
        card: { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '10px' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
        companyInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
        logo: { width: '40px', height: '40px', objectFit: 'contain' },
        title: { fontSize: '18px', fontWeight: 'bold', margin: '5px 0' },
        desc: { fontSize: '14px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' },
        tags: { display: 'flex', gap: '10px', flexWrap: 'wrap' }
    };

    return (
        <div style={styles.card}>
            <div style={styles.header}>
                <div style={styles.companyInfo}>
                    <img src={job?.company?.logo || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"} alt="logo" style={styles.logo} />
                    <div>
                        <h3 style={{ margin: 0 }}>{job?.company?.name}</h3>
                        <span style={{ fontSize: '12px', color: 'gray' }}>India</span>
                    </div>
                </div>
                <Bookmark size={20} color="gray" />
            </div>

            <div>
                <h2 style={styles.title}>{job?.title}</h2>
                <p style={styles.desc}>{job?.description}</p>
            </div>

            <div style={styles.tags}>
                <span className="badge badge-blue">{job?.position} Positions</span>
                <span className="badge badge-red">{job?.jobType}</span>
                <span className="badge badge-purple">{job?.salary} LPA</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => navigate(`/description/${job?._id}`)} className="btn btn-outline" style={{ flex: 1 }}>Details</button>
                <button className="btn btn-primary" style={{ flex: 1 }}>Save</button>
            </div>
        </div>
    );
};

export default JobCard;