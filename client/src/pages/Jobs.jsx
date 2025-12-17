import React from 'react';
import Navbar from '../components/shared/Navbar';
import FilterCard from '../components/FilterCard';
import JobCard from '../components/JobCard';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job);

    const styles = {
        container: { maxWidth: '1200px', margin: '20px auto', padding: '0 20px', display: 'flex', gap: '20px', flexDirection: 'row' },
        sidebar: { width: '20%', minWidth: '250px' }, // Responsive width handled via flex
        feed: { flex: 1, height: '88vh', overflowY: 'auto', paddingBottom: '20px' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.sidebar}>
                    <FilterCard />
                </div>
                
                <div style={styles.feed}>
                    {allJobs.length <= 0 ? <span>No jobs found</span> : (
                        <div style={styles.grid}>
                            {allJobs.map((job) => (
                                <div key={job._id}>
                                    <JobCard job={job} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;