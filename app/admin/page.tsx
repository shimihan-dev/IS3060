'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { products } from '@/lib/products';

export default function AdminPage() {
    const [host, setHost] = useState('https://is-3060.vercel.app');

    useEffect(() => {
        // If we're on localhost, we might want to keep the override option, 
        // but for the production build, we want the Vercel URL.
        if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
            setHost(window.location.origin);
        }
    }, []);

    return (
        <div className="container">
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Aura Admin</h1>
                <p>Manage products and generate QR codes for your store.</p>

                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.9rem', color: '#666' }}>
                        Mobile Testing: Enter your computer's IP address (e.g., http://192.168.0.10:3000)
                    </label>
                    <input
                        type="text"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        placeholder="http://192.168.x.x:3000"
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid #ddd',
                            width: '100%',
                            maxWidth: '400px'
                        }}
                    />
                    <p style={{ fontSize: '0.8rem', color: '#999' }}>
                        ※ 스마트폰으로 테스트하려면 컴퓨터의 IP 주소를 입력해야 합니다.
                    </p>
                </div>
            </header>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {products.map((product) => (
                    <div key={product.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ flex: 1 }}>
                            <h3>{product.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{product.category}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <QRCodeSVG
                                value={`${host}/product/${product.id}`}
                                size={120}
                                fgColor="#2d2a29"
                                level="H"
                                includeMargin
                            />
                            <p style={{ fontSize: '0.6rem', color: '#888', maxWidth: '120px', overflowWrap: 'break-word' }}>
                                {`${host}/product/${product.id}`}
                            </p>
                            <p style={{ fontSize: '0.7rem', marginTop: '0.5rem', color: 'var(--accent)' }}>SCAN ME</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
