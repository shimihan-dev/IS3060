'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { products, SkinType } from '@/lib/products';
import { Sparkles, Info, Droplets, FlaskConical } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [skinType, setSkinType] = useState<SkinType>('Dry');

    const product = products.find((p) => p.id === id);

    const recommendationScore = useMemo(() => {
        if (!product) return 0;
        return product.compatibility[skinType];
    }, [product, skinType]);

    if (!product) {
        return <div className="container">Product not found.</div>;
    }

    return (
        <div className="container">
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ position: 'relative', width: '100%', height: '350px' }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{product.category}</p>
                            <h2>{product.name}</h2>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '15px',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}>
                                <Sparkles size={16} />
                                {recommendationScore}% Match
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {(['Dry', 'Oily', 'Combination', 'Sensitive'] as SkinType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setSkinType(type)}
                                style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '20px',
                                    border: skinType === type ? '2px solid var(--primary)' : '1px solid #ddd',
                                    background: skinType === type ? 'var(--secondary)' : 'white',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    fontWeight: skinType === type ? '600' : '400',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <Info size={18} /> Description
                        </h3>
                        <p style={{ color: '#555', marginBottom: '1.5rem' }}>{product.description}</p>

                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <Droplets size={18} /> How to Use
                        </h3>
                        <p style={{ color: '#555', marginBottom: '1.5rem' }}>{product.usage}</p>

                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <FlaskConical size={18} /> Ingredients
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {product.ingredients.map((ing) => (
                                <span key={ing} style={{ background: '#f0f0f0', padding: '0.3rem 0.8rem', borderRadius: '5px', fontSize: '0.85rem' }}>
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button className="premium-button" style={{ width: '100%', marginTop: '2rem', height: '50px' }}>
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}
