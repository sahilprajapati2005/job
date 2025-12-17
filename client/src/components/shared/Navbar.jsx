import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, User, Menu, X } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from '../../redux/authSlice';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const styles = {
        nav: { backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 },
        container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        logo: { fontSize: '24px', fontWeight: 'bold', color: '#333', textDecoration: 'none' },
        logoSpan: { color: '#F83002' }, // Naukri/LinkedIn accent style
        
        // Desktop Menu
        desktopMenu: { display: 'flex', alignItems: 'center', gap: '30px' },
        link: { textDecoration: 'none', color: '#444', fontWeight: '500', fontSize: '15px', transition: 'color 0.2s' },
        activeLink: { color: '#6A38C2' }, // Active state color
        
        // Auth Buttons
        authContainer: { display: 'flex', gap: '12px' },
        loginBtn: { padding: '8px 20px', border: '1px solid #ccc', background: 'transparent', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' },
        signupBtn: { padding: '8px 20px', border: 'none', background: '#6A38C2', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' },

        // Profile Dropdown
        profileContainer: { position: 'relative', cursor: 'pointer' },
        avatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' },
        dropdown: {
            position: 'absolute', right: 0, top: '50px', width: '280px', 
            backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
            borderRadius: '8px', padding: '15px', display: showProfileDropdown ? 'block' : 'none',
            zIndex: 100
        },
        dropdownHeader: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
        dropdownItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', cursor: 'pointer', color: '#555', textDecoration: 'none' },

        // Mobile Menu Toggle
        mobileToggle: { display: 'none', background: 'none', border: 'none', cursor: 'pointer' },
        mobileMenu: {
            display: isMenuOpen ? 'flex' : 'none',
            flexDirection: 'column', position: 'absolute', top: '64px', left: 0, right: 0,
            backgroundColor: 'white', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', gap: '15px'
        }
    };

    return (
        <div style={styles.nav}>
            <div style={styles.container}>
                {/* Logo */}
                <Link to="/" style={styles.logo}>
                    Job<span style={styles.logoSpan}>Portal</span>
                </Link>

                {/* Mobile Hamburger */}
                <button style={styles.mobileToggle} className="mobile-only-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Links */}
                <ul className="desktop-menu" style={styles.desktopMenu}>
                    <li><Link to="/" style={styles.link}>Home</Link></li>
                    <li><Link to="/jobs" style={styles.link}>Jobs</Link></li>
                    <li><Link to="/browse" style={styles.link}>Browse</Link></li>
                    
                    {/* Recruiter Links */}
                    {user && user.role === 'recruiter' && (
                        <>
                            <li><Link to="/admin/companies" style={{...styles.link, color: '#6A38C2'}}>My Companies</Link></li>
                            <li><Link to="/admin/jobs" style={{...styles.link, color: '#6A38C2'}}>My Jobs</Link></li>
                        </>
                    )}
                </ul>

                {/* Auth Section */}
                <div className="desktop-menu">
                    {!user ? (
                        <div style={styles.authContainer}>
                            <Link to="/login"><button style={styles.loginBtn}>Login</button></Link>
                            <Link to="/signup"><button style={styles.signupBtn}>Signup</button></Link>
                        </div>
                    ) : (
                        <div 
                            style={styles.profileContainer} 
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            <img 
                                src={user.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                                alt="profile" 
                                style={styles.avatar} 
                            />
                            
                            {/* Dropdown Menu */}
                            <div style={styles.dropdown}>
                                <div style={styles.dropdownHeader}>
                                    <img src={user.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="profile" style={{...styles.avatar, width:'50px', height:'50px'}} />
                                    <div>
                                        <h4 style={{margin:0, fontWeight:'bold'}}>{user.fullname}</h4>
                                        <p style={{margin:0, fontSize:'12px', color:'#666'}}>{user.profile?.bio || "No Bio Available"}</p>
                                    </div>
                                </div>
                                <Link to="/profile" style={styles.dropdownItem}>
                                    <User size={18} /> View Profile
                                </Link>
                                <div style={{...styles.dropdownItem, color: '#e11d48'}} onClick={logoutHandler}>
                                    <LogOut size={18} /> Logout
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Dropdown (Visible only on small screens via CSS class) */}
            {isMenuOpen && (
                <div style={styles.mobileMenu}>
                    <Link to="/" onClick={toggleMenu} style={styles.link}>Home</Link>
                    <Link to="/jobs" onClick={toggleMenu} style={styles.link}>Jobs</Link>
                    <Link to="/browse" onClick={toggleMenu} style={styles.link}>Browse</Link>
                    {!user && (
                        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                            <Link to="/login" onClick={toggleMenu} style={{...styles.loginBtn, textAlign:'center'}}>Login</Link>
                            <Link to="/signup" onClick={toggleMenu} style={{...styles.signupBtn, textAlign:'center'}}>Signup</Link>
                        </div>
                    )}
                    {user && (
                         <div style={{borderTop:'1px solid #eee', paddingTop:'10px'}}>
                             <Link to="/profile" onClick={toggleMenu} style={styles.dropdownItem}><User size={18}/> Profile</Link>
                             <div onClick={() => {logoutHandler(); toggleMenu();}} style={{...styles.dropdownItem, color:'red'}}><LogOut size={18}/> Logout</div>
                         </div>
                    )}
                </div>
            )}
            
            {/* CSS for responsive hiding/showing */}
            <style>{`
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-only-btn { display: block !important; }
                }
            `}</style>
        </div>
    )
}

export default Navbar;