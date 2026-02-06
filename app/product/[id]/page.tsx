'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { products, SkinType } from '@/lib/data';
import { ChevronLeft, Info, Droplets, Sparkles, Tag, Fingerprint, BarChart3, Globe, Loader2 } from 'lucide-react';

type Language = 'ko' | 'en' | 'ja' | 'zh';

const languageLabels: Record<Language, string> = {
    ko: '🇰🇷 한국어',
    en: '🇺🇸 English',
    ja: '🇯🇵 日本語',
    zh: '🇨🇳 中文',
};

// UI translations for static text
const uiTranslations: Record<Language, {
    back: string;
    selectSkinType: string;
    yourSkinProfile: string;
    skinTypeCompatibility: string;
    detailedDescription: string;
    howToUse: string;
    keyIngredients: string;
    reserveInStore: string;
    skinTypes: Record<SkinType, string>;
}> = {
    ko: {
        back: '뒤로',
        selectSkinType: '피부 타입을 선택하세요',
        yourSkinProfile: '나의 피부 프로필',
        skinTypeCompatibility: '피부 타입별 적합도',
        detailedDescription: '상세 설명',
        howToUse: '사용 방법',
        keyIngredients: '주요 성분',
        reserveInStore: '매장 예약하기',
        skinTypes: { Dry: '건성', Oily: '지성', Combination: '복합성', Sensitive: '민감성' }
    },
    en: {
        back: 'Back',
        selectSkinType: 'Select Your Skin Type',
        yourSkinProfile: 'Your Skin Profile',
        skinTypeCompatibility: 'Skin Type Compatibility',
        detailedDescription: 'Detailed Description',
        howToUse: 'How to Use',
        keyIngredients: 'Key Ingredients',
        reserveInStore: 'Reserve in Store',
        skinTypes: { Dry: 'Dry', Oily: 'Oily', Combination: 'Combination', Sensitive: 'Sensitive' }
    },
    ja: {
        back: '戻る',
        selectSkinType: '肌タイプを選択',
        yourSkinProfile: 'あなたの肌プロフィール',
        skinTypeCompatibility: '肌タイプ適合度',
        detailedDescription: '詳細説明',
        howToUse: '使用方法',
        keyIngredients: '主要成分',
        reserveInStore: '店舗で予約',
        skinTypes: { Dry: '乾燥肌', Oily: '脂性肌', Combination: '混合肌', Sensitive: '敏感肌' }
    },
    zh: {
        back: '返回',
        selectSkinType: '选择您的肤质',
        yourSkinProfile: '您的肤质档案',
        skinTypeCompatibility: '肤质适合度',
        detailedDescription: '详细说明',
        howToUse: '使用方法',
        keyIngredients: '主要成分',
        reserveInStore: '门店预约',
        skinTypes: { Dry: '干性', Oily: '油性', Combination: '混合性', Sensitive: '敏感性' }
    }
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [skinType, setSkinType] = useState<SkinType | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [language, setLanguage] = useState<Language>('ko');
    const [translatedContent, setTranslatedContent] = useState<{
        description: string;
        usage: string;
    } | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);

    const product = products.find((p) => p.id === id);
    const ui = uiTranslations[language];

    // Load skin type and language from localStorage on mount
    useEffect(() => {
        const savedType = localStorage.getItem('oy_skin_type') as SkinType;
        const savedLang = localStorage.getItem('oy_language') as Language;
        if (savedType) setSkinType(savedType);
        if (savedLang) setLanguage(savedLang);
        setIsLoaded(true);
    }, []);

    const handleSkinTypeChange = (type: SkinType) => {
        setSkinType(type);
        localStorage.setItem('oy_skin_type', type);
    };

    const translateContent = useCallback(async (targetLang: Language) => {
        if (!product || targetLang === 'ko') {
            setTranslatedContent(null);
            return;
        }

        // Check cache
        const cacheKey = `oy_translation_${product.id}_${targetLang}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            setTranslatedContent(JSON.parse(cached));
            return;
        }

        setIsTranslating(true);
        try {
            const textToTranslate = `설명: ${product.description}\n\n사용법: ${product.usage}`;

            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textToTranslate, targetLang }),
            });

            if (response.ok) {
                const { translatedText } = await response.json();
                const parts = translatedText.split('\n\n');
                const description = parts[0]?.replace(/^(설명|Description|説明|说明):\s*/i, '') || product.description;
                const usage = parts[1]?.replace(/^(사용법|Usage|使用方法|使用方法):\s*/i, '') || product.usage;

                const content = { description, usage };
                setTranslatedContent(content);
                localStorage.setItem(cacheKey, JSON.stringify(content));
            }
        } catch (error) {
            console.error('Translation failed:', error);
        } finally {
            setIsTranslating(false);
        }
    }, [product]);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('oy_language', lang);
        translateContent(lang);
    };

    // Translate on initial load if not Korean
    useEffect(() => {
        if (isLoaded && language !== 'ko' && product) {
            translateContent(language);
        }
    }, [isLoaded, language, product, translateContent]);

    const matchScore = useMemo(() => {
        if (!product || !skinType) return null;
        return product.compatibility[skinType];
    }, [product, skinType]);

    const displayDescription = translatedContent?.description || product?.description || '';
    const displayUsage = translatedContent?.usage || product?.usage || '';

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => router.back()}
                    style={{
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-sub)',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                    className="no-print"
                >
                    <ChevronLeft size={18} /> {ui.back}
                </button>

                {/* Language Selector */}
                <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={16} color="var(--text-sub)" />
                    <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value as Language)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            background: 'white',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                    >
                        {Object.entries(languageLabels).map(([code, label]) => (
                            <option key={code} value={code}>{label}</option>
                        ))}
                    </select>
                    {isTranslating && <Loader2 size={16} className="spin" color="var(--accent)" />}
                </div>
            </div>

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
                            {skinType ? ui.yourSkinProfile : ui.selectSkinType}
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {(['Dry', 'Oily', 'Combination', 'Sensitive'] as SkinType[]).map((type) => (
                                <button
                                    key={type}
                                    className={`skin-type-btn ${skinType === type ? 'active' : ''}`}
                                    onClick={() => handleSkinTypeChange(type)}
                                >
                                    {ui.skinTypes[type]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Compatibility Graph */}
                    <div className="glass-card" style={{ background: 'white', padding: '1.25rem', marginBottom: '2rem', border: '1px solid #f0f0f0' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                            <BarChart3 size={16} color="var(--accent)" />
                            {ui.skinTypeCompatibility}
                        </h4>
                        <div className="chart-container">
                            {(['Dry', 'Oily', 'Combination', 'Sensitive'] as SkinType[]).map((type) => (
                                <div key={type} className="bar-wrapper">
                                    <span className="bar-label" style={{ color: skinType === type ? 'var(--accent)' : 'var(--text-sub)' }}>
                                        {ui.skinTypes[type]}
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
                            <Info size={18} color="var(--accent)" /> {ui.detailedDescription}
                        </h3>
                        <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>{displayDescription}</p>
                    </section>

                    <section style={{ marginBottom: '2rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                            <Droplets size={18} color="var(--accent)" /> {ui.howToUse}
                        </h3>
                        <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>{displayUsage}</p>
                    </section>

                    <section>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
                            <Sparkles size={18} color="var(--accent)" /> {ui.keyIngredients}
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
                        <Tag size={20} /> {ui.reserveInStore}
                    </button>
                </div>
            </div>
        </div>
    );
}
