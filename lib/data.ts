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
        name: "올리브영 히알루론 세럼",
        category: "스킨케어",
        description: "5중 히알루론산이 함유된 고보습 세럼으로, 즉각적인 탱탱함과 오래 지속되는 촉촉함을 선사합니다. 건강하고 빛나는 피부를 위한 필수 아이템입니다.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        price: "₩42,000",
        details: [
            { label: "용량", value: "50ml" },
            { label: "제형", value: "워터 타입" },
            { label: "효능", value: "보습" }
        ],
        usage: "토너 사용 후 2~3방울을 얼굴에 도포하고 가볍게 두드려 흡수시켜 주세요.",
        ingredients: ["5중 히알루론산", "나이아신아마이드", "판테놀", "알란토인"],
        compatibility: { Dry: 98, Oily: 72, Combination: 88, Sensitive: 95 }
    },
    {
        id: "oy-m-oil",
        name: "올리브영 리커버리 오일",
        category: "트리트먼트",
        description: "수면 중 피부를 회복시키는 고급 나이트 오일입니다. 식물성 추출물이 피부 장벽을 복원하고 건강한 피부로 가꿔줍니다.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        price: "₩58,000",
        details: [
            { label: "용량", value: "30ml" },
            { label: "제형", value: "리치 오일" },
            { label: "효능", value: "수복" }
        ],
        usage: "취침 전 2방울을 손바닥에 덜어 따뜻하게 한 후 얼굴에 가볍게 눌러 흡수시켜 주세요.",
        ingredients: ["스쿠알란", "로즈힙 오일", "달맞이꽃 오일", "라벤더 오일"],
        compatibility: { Dry: 95, Oily: 45, Combination: 80, Sensitive: 92 }
    },
    {
        id: "oy-spf50",
        name: "올리브영 데일리 선크림",
        category: "자외선 차단",
        description: "백탁 현상 없이 가볍게 발리는 초경량 선크림입니다. UVA/UVB로부터 피부를 보호하고 끈적임 없이 자연스러운 마무리감을 선사합니다.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d521?auto=format&fit=crop&q=80&w=800",
        price: "₩35,000",
        details: [
            { label: "용량", value: "60ml" },
            { label: "SPF", value: "50+ PA++++" },
            { label: "마무리감", value: "내추럴" }
        ],
        usage: "스킨케어 마지막 단계에서 충분한 양을 얼굴 전체에 골고루 펴 발라 주세요.",
        ingredients: ["징크옥사이드", "티타늄디옥사이드", "병풀 추출물", "녹차 추출물"],
        compatibility: { Dry: 90, Oily: 85, Combination: 92, Sensitive: 98 }
    },
    {
        id: "oy-c-cleanser",
        name: "올리브영 브라이트 클렌저",
        category: "클렌저",
        description: "비타민C가 함유된 브라이트닝 클렌저로, 부드럽게 노폐물을 제거하면서 피부톤을 균일하게 정돈해줍니다. 맑고 환한 피부결을 경험해 보세요.",
        image: "https://images.unsplash.com/photo-1556228443-72249c424783?auto=format&fit=crop&q=80&w=800",
        price: "₩28,000",
        details: [
            { label: "용량", value: "150ml" },
            { label: "제형", value: "크리미 폼" },
            { label: "효능", value: "브라이트닝" }
        ],
        usage: "물과 함께 충분히 거품을 낸 후 얼굴에 마사지하듯 바르고 깨끗이 헹궈주세요.",
        ingredients: ["비타민C", "레몬 추출물", "살리실산", "글리세린"],
        compatibility: { Dry: 82, Oily: 95, Combination: 90, Sensitive: 75 }
    }
];
