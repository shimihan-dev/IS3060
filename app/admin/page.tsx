'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { products } from '@/lib/data';
import { Download, ExternalLink, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [host, setHost] = useState('https://is-3060.vercel.app');

    useEffect(() => {
        if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
            setHost(window.location.origin);
        } else if (typeof window !== 'undefined') {
            // Default for local development
            setHost(`http://${window.location.hostname}:3000`);
        }
    }, []);

    return (
        <div className="container animate-in">
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <LayoutDashboard size={28} color="var(--accent)" />
                    <h1 style={{ fontSize: '2.5rem' }}>Aura Staff</h1>
                </div>
                <p style={{ color: 'var(--text-sub)' }}>Generate and manage QR codes for offline products.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                    <button
                        className="premium-button"
                        onClick={() => window.print()}
                        style={{ background: 'var(--accent)', fontSize: '0.9rem' }}
                    >
                        <Download size={18} /> Print All QR Codes
                    </button>
                </div>

                <div className="glass-card no-print" style={{ marginTop: '2rem', textAlign: 'left' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-sub)', display: 'block', marginBottom: '0.5rem' }}>
                        Base URL (Production or Local IP)
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                            placeholder="https://your-app.vercel.app"
                            style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                border: '1px solid #ddd',
                                flex: 1,
                                fontSize: '0.9rem'
                            }}
                        />
                        <button
                            onClick={() => setHost(window.location.origin)}
                            style={{
                                background: '#f0f0f0',
                                border: 'none',
                                padding: '0 1rem',
                                borderRadius: '12px',
                                cursor: 'pointer'
                            }}
                            title="Reset to current origin"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>
                        ※ For phone testing, enter your computer\'s local IP address (e.g., http://192.168.x.x:3000).
                    </p>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {products.map((product) => (
                    <div key={product.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem' }}>
                        <div style={{ flex: 1 }}>
                            <span className="badge" style={{ fontSize: '0.65rem' }}>{product.id}</span>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>{product.category}</p>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                <Link
                                    href={`/product/${product.id}`}
                                    style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                >
                                    <ExternalLink size={14} /> Preview Page
                                </Link>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid #eee' }}>
                            <QRCodeSVG
                                value={`${host}/product/${product.id}`}
                                size={100}
                                level="H"
                                includeMargin
                            />
                            <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', fontWeight: '600', color: 'var(--primary)' }}>SCAN ME</p>
                            <button
                                style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', marginTop: '0.25rem' }}
                                onClick={() => {
                                    const svg = document.querySelector(`[value="${host}/product/${product.id}"]`) as HTMLElement;
                                    if (svg) {
                                        // Simple way to trigger print/save for the user
                                        window.print();
                                    }
                                }}
                            >
                                <Download size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Link href="/" style={{ color: 'var(--text-sub)', fontSize: '0.9rem', textDecoration: 'none' }}>
                    &larr; Return to Home
                </Link>
            </div>
        </div>
    );
}
