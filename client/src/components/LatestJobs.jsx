import React from 'react';
import JobCard from './JobCard'; // Reusing the card we made earlier
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    
    // Take only the first 6 jobs
    const jobsToDisplay = allJobs ? allJobs.slice(0, 6) : [];

    const styles = {
        container: { maxWidth: '1200px', margin: '0 auto', padding: '4rem 20px' },
        title: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' },
        highlight: { color: '#6A38C2' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' },
        noJobs: { textAlign: 'center', color: '#666', fontSize: '1.2rem', marginTop: '2rem' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>
                <span style={styles.highlight}>Latest & Top </span> Job Openings
            </h1>
            <div style={styles.grid}>
                {jobsToDisplay.length <= 0 ? (
                    <div style={styles.noJobs}>No Job Available</div>
                ) : (
                    jobsToDisplay.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    )
}

export default LatestJobs;