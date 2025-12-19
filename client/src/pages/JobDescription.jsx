// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../components/shared/Navbar';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSingleJob } from '../redux/jobSlice';
// import { toast } from 'react-hot-toast';

// const JobDescription = () => {
//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();
//     const { singleJob } = useSelector(store => store.job);
//     const { user } = useSelector(store => store.auth);

//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchSingleJob();
//     }, [jobId, dispatch]);

//     const applyHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
//             if(res.data.success){
//                 // Manually update the state to reflect the change immediately
//                 const updatedSingleJob = {...singleJob, applications: [...singleJob.applications, {applicant: user?._id}]};
//                 dispatch(setSingleJob(updatedSingleJob)); 
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             // FIX: Gracefully handle the error toast
//             toast.error(error.response?.data?.message || "Something went wrong");
//         }
//     }

//     // Check if user has already applied
//     const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

//     return (
//         <div>
//             <Navbar />
//             <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', background: 'white', borderRadius: '8px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div>
//                         <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{singleJob?.title}</h1>
//                         <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
//                             <span className="badge badge-blue">{singleJob?.position} Positions</span>
//                             <span className="badge badge-red">{singleJob?.jobType}</span>
//                             <span className="badge badge-purple">{singleJob?.salary} LPA</span>
//                         </div>
//                     </div>
//                     <button 
//                         onClick={applyHandler} 
//                         disabled={isApplied}
//                         className={`btn ${isApplied ? 'btn-outline' : 'btn-primary'}`}
//                         style={{cursor: isApplied ? 'not-allowed' : 'pointer'}}
//                     >
//                         {isApplied ? 'Already Applied' : 'Apply Now'}
//                     </button>
//                 </div>

//                 <h2 style={{ fontSize: '18px', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '20px' }}>Job Description</h2>
//                 <div style={{ marginTop: '20px', lineHeight: '1.6', color: '#555' }}>
//                     <p><strong>Role:</strong> {singleJob?.title}</p>
//                     <p><strong>Location:</strong> {singleJob?.location}</p>
//                     <p><strong>Description:</strong> {singleJob?.description}</p>
//                     <p><strong>Experience:</strong> {singleJob?.experience} years</p>
//                     <p><strong>Posted Date:</strong> {singleJob?.createdAt?.split("T")[0]}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobDescription;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import { toast } from 'react-hot-toast';

const JobDescription = () => {
    const { id: jobId } = useParams();
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    
                    // Check if current user is in the applications list
                    const hasApplied = res.data.job.applications.some(application => {
                        // Handle cases where application.applicant is an object or just an ID string
                        const applicantId = application.applicant?._id || application.applicant;
                        return applicantId === user?._id;
                    });
                    setIsApplied(hasApplied);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if(res.data.success){
                setIsApplied(true); // Disable button immediately
                
                const updatedSingleJob = {
                    ...singleJob, 
                    applications: [...singleJob.applications, {applicant: user?._id}]
                };
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMsg = error.response?.data?.message || "Something went wrong";
            
            // UX Fix: If the error is "Already applied", disable the button so they can't click again
            if (error.response?.status === 400 || errorMsg.toLowerCase().includes("already applied")) {
                setIsApplied(true);
                toast.error("You have already applied for this job.");
            } else {
                toast.error(errorMsg);
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{singleJob?.title}</h1>
                        <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200">
                                {singleJob?.position} Positions
                            </span>
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs border border-red-200">
                                {singleJob?.jobType}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200">
                                {singleJob?.salary} LPA
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={isApplied ? null : applyHandler} 
                        disabled={isApplied}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            isApplied 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-[#6A38C2] hover:bg-[#5b30a6] text-white cursor-pointer'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </button>
                </div>

                <h2 style={{ fontSize: '18px', fontWeight:'600', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', marginTop: '25px', color: '#333' }}>
                    Job Description
                </h2>
                
                <div style={{ marginTop: '20px', lineHeight: '1.8', color: '#4b5563' }}>
                    <p style={{marginBottom: '10px'}}>
                        <strong style={{color:'#111827', marginRight:'8px'}}>Role:</strong> 
                        {singleJob?.title}
                    </p>
                    <p style={{marginBottom: '10px'}}>
                        <strong style={{color:'#111827', marginRight:'8px'}}>Location:</strong> 
                        {singleJob?.location}
                    </p>
                    <p style={{marginBottom: '10px'}}>
                        <strong style={{color:'#111827', marginRight:'8px'}}>Description:</strong> 
                        {singleJob?.description}
                    </p>
                    <p style={{marginBottom: '10px'}}>
                        <strong style={{color:'#111827', marginRight:'8px'}}>Experience:</strong> 
                        {singleJob?.experience} years
                    </p>
                    <p style={{marginBottom: '10px'}}>
                        <strong style={{color:'#111827', marginRight:'8px'}}>Salary:</strong> 
                        {singleJob?.salary} LPA
                    </p>
                    <p style={{marginBottom: '10px'}}>
                        <strong style={{color:'#111827', marginRight:'8px'}}>Posted Date:</strong> 
                        {singleJob?.createdAt?.split("T")[0]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;