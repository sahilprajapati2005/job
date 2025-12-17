import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import { toast } from 'react-hot-toast';

const JobDescription = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch]);

    const applyHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', background: 'white', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{singleJob?.title}</h1>
                        <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                            <span className="badge badge-blue">{singleJob?.position} Positions</span>
                            <span className="badge badge-red">{singleJob?.jobType}</span>
                            <span className="badge badge-purple">{singleJob?.salary} LPA</span>
                        </div>
                    </div>
                    <button 
                        onClick={applyHandler} 
                        disabled={isApplied}
                        className={`btn ${isApplied ? 'btn-outline' : 'btn-primary'}`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </button>
                </div>

                <h2 style={{ fontSize: '18px', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '20px' }}>Job Description</h2>
                <div style={{ marginTop: '20px', lineHeight: '1.6', color: '#555' }}>
                    <p><strong>Role:</strong> {singleJob?.title}</p>
                    <p><strong>Location:</strong> {singleJob?.location}</p>
                    <p><strong>Description:</strong> {singleJob?.description}</p>
                    <p><strong>Experience:</strong> {singleJob?.experienceLevel} years</p>
                    <p><strong>Posted Date:</strong> {singleJob?.createdAt?.split("T")[0]}</p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;