import React, { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanies, setSearchCompanyByText } from '../../redux/companySlice';

const Companies = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    // Fetch companies hook logic (embedded for simplicity)
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    }, [dispatch]);

    const styles = {
        container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
        input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '300px' },
        table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
        th: { textAlign: 'left', padding: '15px', background: '#f9fafb', borderBottom: '1px solid #eee' },
        td: { padding: '15px', borderBottom: '1px solid #eee' },
        avatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.header}>
                    <input 
                        type="text" 
                        placeholder="Filter by name" 
                        onChange={(e) => setInput(e.target.value)} 
                        style={styles.input}
                    />
                    <button className="btn btn-primary" onClick={() => navigate("/admin/companies/create")}>
                        New Company
                    </button>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Logo</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th} align="right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies
                         .filter(company => company.name.toLowerCase().includes(searchCompanyByText.toLowerCase()))
                         .map((company) => (
                            <tr key={company._id}>
                                <td style={styles.td}>
                                    <img src={company.logo || "https://github.com/shadcn.png"} alt="logo" style={styles.avatar} />
                                </td>
                                <td style={styles.td}>{company.name}</td>
                                <td style={styles.td}>{company.createdAt.split("T")[0]}</td>
                                <td style={styles.td} align="right">
                                    <button className="btn btn-outline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {companies.length === 0 && <p style={{textAlign:'center', padding:'20px'}}>No companies found.</p>}
            </div>
        </div>
    );
}

export default Companies;