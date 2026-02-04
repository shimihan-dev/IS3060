export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Sensitive';

export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    usage: string;
    ingredients: string[];
    compatibility: Record<SkinType, number>; // Recommendation score 0-100
    image: string;
}

export const products: Product[] = [
    {
        id: 'glow-cushion',
        name: 'Glow Perfect Cushion',
        category: 'Pact',
        description: 'A long-lasting cushion that provides a natural, radiant glow while keeping the skin hydrated.',
        usage: 'Apply evenly on the face using the included puff.',
        ingredients: ['Hyaluronic Acid', 'Niacinamide', 'SPF 50+ PA+++'],
        compatibility: {
            'Dry': 98,
            'Combination': 85,
            'Oily': 60,
            'Sensitive': 92
        },
        image: '/images/cushion.png'
    },
    {
        id: 'velvet-lipstick',
        name: 'Velvet Matte Lipstick',
        category: 'Lipstick',
        description: 'A creamy, high-pigment lipstick with a soft matte finish that doesn\'t dry out the lips.',
        usage: 'Swipe directly onto the lips from the bullet.',
        ingredients: ['Vitamin E', 'Shea Butter', 'Jojoba Oil'],
        compatibility: {
            'Dry': 90,
            'Combination': 95,
            'Oily': 95,
            'Sensitive': 88
        },
        image: '/images/lipstick.png'
    },
    {
        id: 'barrier-cream',
        name: 'Intensive Barrier Repair Cream',
        category: 'Cream',
        description: 'Strengthens the skin barrier and provides 72-hour deep moisture for damaged skin.',
        usage: 'Massage into the skin as the last step of your skincare routine.',
        ingredients: ['Ceramides', 'Panthenol', 'Squalane'],
        compatibility: {
            'Dry': 100,
            'Combination': 80,
            'Oily': 50,
            'Sensitive': 98
        },
        image: '/images/cream.png'
    },
    {
        id: 'hydra-lotion',
        name: 'Hydro-Balance Lotion',
        category: 'Lotion',
        description: 'A lightweight, fast-absorbing lotion that balances oil and moisture levels.',
        usage: 'Apply after serum or toner.',
        ingredients: ['Green Tea Extract', 'Glycerin', 'Centella Asiatica'],
        compatibility: {
            'Dry': 75,
            'Combination': 98,
            'Oily': 92,
            'Sensitive': 90
        },
        image: '/images/lotion.png'
    }
];
