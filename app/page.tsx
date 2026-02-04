'use client';

import Link from 'next/link';

export default function Home() {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '15vh' }}>
            <div className="glass-card">
                <h1 style={{ fontSize: '3rem', color: 'var(--primary)' }}>AURA BEAUTY</h1>
                <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                    Personalized skincare powered by AI.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Link href="/admin">
                        <button className="premium-button" style={{ width: '100%' }}>
                            Staff Dashboard (QR Generator)
                        </button>
                    </Link>
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#999' }}>
                            Customer view is accessed via QR codes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
