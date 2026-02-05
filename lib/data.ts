export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Sensitive';

export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    price: string;
    details: {
        label: string;
        value: string;
    }[];
    usage: string;
    ingredients: string[];
    compatibility: Record<SkinType, number>;
};

export const products: Product[] = [
    {
        id: "oy-h-serum",
        name: "Olive Young Hyaluronic Serum",
        category: "Skincare",
        description: "A deep-hydrating serum with 5-layered hyaluronic acid that provides instant plumpness and long-lasting moisture. Perfect for a dewy, healthy glow.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        price: "$42.00",
        details: [
            { label: "Volume", value: "50ml" },
            { label: "Texture", value: "Lightwater" },
            { label: "Best for", value: "Hydration" }
        ],
        usage: "Apply 2-3 drops to face after toning. Pat gently for absorption.",
        ingredients: ["5-layered Hyaluronic Acid", "Niacinamide", "Panthenol", "Allantoin"],
        compatibility: { Dry: 98, Oily: 72, Combination: 88, Sensitive: 95 }
    },
    {
        id: "oy-m-oil",
        name: "Olive Young Recovery Oil",
        category: "Treatment",
        description: "A luxurious overnight oil that repairs and revitalizes skin while you sleep. Infused with botanical extracts to restore skin's natural barrier.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        price: "$58.00",
        details: [
            { label: "Volume", value: "30ml" },
            { label: "Texture", value: "Rich Oil" },
            { label: "Best for", value: "Repair" }
        ],
        usage: "Warm 2 drops in palms and press onto face before sleep.",
        ingredients: ["Squalane", "Rosehip Oil", "Evening Primrose", "Lavender Oil"],
        compatibility: { Dry: 95, Oily: 45, Combination: 80, Sensitive: 92 }
    },
    {
        id: "oy-spf50",
        name: "Olive Young Daily Sunscreen",
        category: "Protection",
        description: "An ultra-lightweight sunscreen that provides high-level defense against UVA/UVB rays without any white cast or stickiness.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d521?auto=format&fit=crop&q=80&w=800",
        price: "$35.00",
        details: [
            { label: "Volume", value: "60ml" },
            { label: "SPF", value: "50+ PA++++" },
            { label: "Finish", value: "Natural" }
        ],
        usage: "Apply generously as the final step of your skincare routine.",
        ingredients: ["Zinc Oxide", "Titanium Dioxide", "Centella Asiatica", "Green Tea"],
        compatibility: { Dry: 90, Oily: 85, Combination: 92, Sensitive: 98 }
    },
    {
        id: "oy-c-cleanser",
        name: "Olive Young Bright Cleanser",
        category: "Cleanser",
        description: "A brightening cleanser infused with Vitamin C to gently remove impurities while evening out skin tone and revealing a radiant complexion.",
        image: "https://images.unsplash.com/photo-1556228443-72249c424783?auto=format&fit=crop&q=80&w=800",
        price: "$28.00",
        details: [
            { label: "Volume", value: "150ml" },
            { label: "Texture", value: "Creamy Foam" },
            { label: "Key Benefit", value: "Brightening" }
        ],
        usage: "Lather with water and massage onto damp skin. Rinse thoroughly.",
        ingredients: ["Vitamin C", "Lemon Extract", "Salicylic Acid", "Glycerin"],
        compatibility: { Dry: 82, Oily: 95, Combination: 90, Sensitive: 75 }
    }
];
