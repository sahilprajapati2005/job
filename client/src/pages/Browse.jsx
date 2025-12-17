import React, { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import JobCard from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';

const Browse = () => {
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        // In a real app, this might fetch based on a search query URL param
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs();
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Search Results ({allJobs.length})</h1>
                <div className="grid-cols-3">
                    {allJobs.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;