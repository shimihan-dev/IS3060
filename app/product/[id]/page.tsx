'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { products, SkinType } from '@/lib/data';
import { ChevronLeft, Info, Droplets, Sparkles, Tag, Fingerprint, BarChart3 } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [skinType, setSkinType] = useState<SkinType | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load skin type from localStorage on mount
    useEffect(() => {
        const savedType = localStorage.getItem('aura_skin_type') as SkinType;
        if (savedType) {
            setSkinType(savedType);
        }
        setIsLoaded(true);
    }, []);

    const handleSkinTypeChange = (type: SkinType) => {
        setSkinType(type);
        localStorage.setItem('aura_skin_type', type);
    };

    const product = products.find((p) => p.id === id);

    const matchScore = useMemo(() => {
        if (!product || !skinType) return null;
        return product.compatibility[skinType];
    }, [product, skinType]);

    if (!product) {
        return (
            <div className="container animate-in">
                <div className="glass-card" style={{ textAlign: 'center' }}>
                    <h2>Product Not Found</h2>
                    <p style={{ marginTop: '1rem', color: 'var(--text-sub)' }}>
                        This QR code might be invalid or the product has been removed.
                    </p>
                    <button
                        className="premium-button"
                        style={{ marginTop: '2rem' }}
                        onClick={() => router.push('/')}
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container animate-in">
            <button
                onClick={() => router.back()}
                style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-sub)',
                    marginBottom: '1.5rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
                className="no-print"
            >
                <ChevronLeft size={18} /> Back
            </button>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                        height: '120px'
                    }} />

                    {matchScore !== null && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                            <div className="match-score-badge">
                                <Sparkles size={16} />
                                {matchScore}% Match
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ padding: '2rem' }}>
                    <span className="badge">{product.category}</span>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: '700', marginBottom: '1.5rem' }}>
                        {product.price}
                    </p>

                    {/* Skin Type Selector */}
                    <div className="glass-card" style={{ background: '#fcfcfc', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #f0f0f0' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
                            <Fingerprint size={16} color="var(--accent)" />
                            {skinType ? 'Your Skin Profile' : 'Select Your Skin Type'}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {(['Dry', 'Oily', 'Combination', 'Sensitive'] as SkinType[]).map((type) => (
                                <button
                                    key={type}
                                    className={`skin-type-btn ${skinType === type ? 'active' : ''}`}
                                    onClick={() => handleSkinTypeChange(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Compatibility Graph */}
                    <div className="glass-card" style={{ background: 'white', padding: '1.25rem', marginBottom: '2rem', border: '1px solid #f0f0f0' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                            <BarChart3 size={16} color="var(--accent)" />
                            Skin Type Compatibility
                        </h4>
                        <div className="chart-container">
                            {(['Dry', 'Oily', 'Combination', 'Sensitive'] as SkinType[]).map((type) => (
                                <div key={type} className="bar-wrapper">
                                    <span className="bar-label" style={{ color: skinType === type ? 'var(--accent)' : 'var(--text-sub)' }}>
                                        {type}
                                    </span>
                                    <div className="bar-bg">
                                        <div
                                            className={`bar-fill ${skinType === type ? 'highlight' : ''}`}
                                            style={{ width: isLoaded ? `${product.compatibility[type]}%` : '0%' }}
                                        />
                                    </div>
                                    <span className="bar-value">{product.compatibility[type]}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '2rem' }}>
                        {product.details.map((detail) => (
                            <div key={detail.label} style={{ background: '#f8f9fa', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-sub)', textTransform: 'uppercase' }}>{detail.label}</p>
                                <p style={{ fontSize: '0.8rem', fontWeight: '600' }}>{detail.value}</p>
                            </div>
                        ))}
                    </div>

                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                            <Info size={18} color="var(--accent)" /> Detailed Description
                        </h3>
                        <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>{product.description}</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                            <Droplets size={18} color="var(--accent)" /> How to Use
                        </h3>
                        <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>{product.usage}</p>
                    </section>

                    <section>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
                            <Sparkles size={18} color="var(--accent)" /> Key Ingredients
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {product.ingredients.map((ing) => (
                                <span key={ing} style={{
                                    background: '#f0f0f0',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    color: '#444'
                                }}>
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </section>

                    <button className="premium-button no-print" style={{ width: '100%', marginTop: '2.5rem', height: '56px' }}>
                        <Tag size={20} /> Reserve in Store
                    </button>
                </div>
            </div>
        </div>
    );
}
