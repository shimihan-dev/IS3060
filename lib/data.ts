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
};

export const products: Product[] = [
    {
        id: "aqua-serum-01",
        name: "Aura Aqua Serum",
        category: "Skincare",
        description: "A lightweight, deep-hydrating serum that leaves your skin glowing and plump. Formulated with 5 types of hyaluronic acid for multi-layered hydration.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        price: "$45.00",
        details: [
            { label: "Skin Type", value: "All Skin Types" },
            { label: "Volume", value: "50ml" },
            { label: "Concerns", value: "Dryness, Dullness" }
        ],
        usage: "Apply 2-3 drops to clean skin before moisturizing. Gently pat until absorbed.",
        ingredients: ["Hyaluronic Acid", "Niacinamide", "Glycerin", "Ceramides", "Aloe Vera Extract"]
    },
    {
        id: "velvet-tint-02",
        name: "Velvet Lip Tint - Rose",
        category: "Makeup",
        description: "A soft, weightless lip tint that provides a natural blurred finish. High-pigment formula that stays comfortable all day without drying.",
        image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=800",
        price: "$18.00",
        details: [
            { label: "Finish", value: "Soft Matte" },
            { label: "Weight", value: "4.5g" },
            { label: "Tone", value: "Cool Rose" }
        ],
        usage: "Apply to the center of your lips and blend outwards for a gradient effect, or apply full for a bold look.",
        ingredients: ["Dimethicone", "Jojoba Oil", "Vitamin E", "Red 7 Lake", "Titanium Dioxide"]
    },
    {
        id: "glow-cream-03",
        name: "Radiant Glow Cream",
        category: "Skincare",
        description: "Luxury moisturizing cream that brightens and firms. Infused with pearl extract for an instant illuminating effect.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        price: "$62.00",
        details: [
            { label: "Skin Type", value: "Dry, Combination" },
            { label: "Volume", value: "60ml" },
            { label: "Benefits", value: "Brightening, Anti-aging" }
        ],
        usage: "Morning and night, massage a small amount onto face and neck as the final step of your skincare routine.",
        ingredients: ["Pearl Extract", "Squalane", "Shea Butter", "Peptides", "Gold Flakes"]
    }
];
