import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    const styles = {
        footer: { backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '40px 20px', marginTop: '50px' },
        container: { maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' },
        topSection: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' },
        brand: { fontSize: '24px', fontWeight: 'bold' },
        brandSpan: { color: '#F83002' },
        socials: { display: 'flex', gap: '20px' },
        icon: { cursor: 'pointer', color: '#333', transition: 'color 0.2s' },
        copy: { textAlign: 'center', color: '#666', fontSize: '14px', borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.topSection}>
                    <div>
                        <h2 style={styles.brand}>Job<span style={styles.brandSpan}>Portal</span></h2>
                        <p style={{ color: '#666', marginTop: '5px' }}>Your gateway to a better future.</p>
                    </div>
                    <div style={styles.socials}>
                        <a href="#" style={{color: 'inherit'}}><Facebook size={24} /></a>
                        <a href="#" style={{color: 'inherit'}}><Twitter size={24} /></a>
                        <a href="#" style={{color: 'inherit'}}><Linkedin size={24} /></a>
                        <a href="#" style={{color: 'inherit'}}><Instagram size={24} /></a>
                    </div>
                </div>
                
                <div style={styles.copy}>
                    <p>&copy; 2024 JobPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;