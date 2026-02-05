'use client';

import Link from 'next/link';
import { Sparkles, QrCode, ShoppingBag } from 'lucide-react';

export default function Home() {
    return (
        <div className="container animate-in" style={{ textAlign: 'center', paddingTop: '10vh' }}>
            <div style={{ marginBottom: '3rem' }}>
                <span className="badge" style={{ marginBottom: '1rem', background: 'rgba(141, 166, 29, 0.1)' }}>Welcome to Olive Young</span>
                <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                    Smart <br /> <span style={{ color: 'var(--accent)' }}>Beauty Scanner</span>
                </h1>
                <p style={{ color: 'var(--text-sub)', maxWidth: '300px', margin: '0 auto 2.5rem' }}>
                    Explore product ingredients and find the perfect match for your skin.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-card" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <div style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '12px' }}>
                            <QrCode size={24} />
                        </div>
                        <div>
                            <p style={{ fontWeight: '600', fontSize: '1rem' }}>Scan QR in Store</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Instantly view ingredients & usage</p>
                        </div>
                    </div>

                    <div className="glass-card" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                        <div style={{ background: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '12px' }}>
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <p style={{ fontWeight: '600', fontSize: '1rem' }}>AI Recommendations</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Find the perfect match for your skin</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer style={{ marginTop: '2rem' }}>
                <Link href="/admin" className="premium-button">
                    <ShoppingBag size={20} /> Staff Dashboard
                </Link>
                <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
                    &copy; 2026 AURA COSMETICS. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
