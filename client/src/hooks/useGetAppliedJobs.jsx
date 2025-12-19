import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                // This calls your backend to get the list
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });
                
                if (res.data.success) {
                    // This updates Redux with the real data
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    }, [])
};
export default useGetAppliedJobs;