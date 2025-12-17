import React, { useEffect } from 'react';
import Navbar from '../components/shared/Navbar';
import HeroSection from '../components/HeroSection';
import LatestJobs from '../components/LatestJobs';
import Footer from '../components/shared/Footer';
import useGetAllJobs from '../hooks/useGetAllJobs'; // Assuming you create this hook file as shown below, or you can keep the useEffect here.
import { useSelector, useDispatch } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';

const Home = () => {
    // Ideally use a custom hook, but putting useEffect here is fine for now if you haven't made the hook file
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    }, [dispatch]);

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <Navbar />
            <HeroSection />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home;