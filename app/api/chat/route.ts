import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { products } from '@/lib/data';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const productContext = products.map(p =>
    `- ${p.name} (${p.category}): ${p.description} 피부타입 적합도: 건성 ${p.compatibility.Dry}%, 지성 ${p.compatibility.Oily}%, 복합성 ${p.compatibility.Combination}%, 민감성 ${p.compatibility.Sensitive}%`
).join('\n');

const systemPrompt = `당신은 올리브영의 AI 스킨케어 컨설턴트입니다. 친절하고 전문적으로 고객의 피부 고민을 상담해주세요.

사용 가능한 상품 목록:
${productContext}

규칙:
1. 고객의 피부 타입과 고민을 파악하세요
2. 위 상품 목록에서 가장 적합한 상품을 1~2개 추천하세요
3. 추천 이유를 피부과학적으로 설명하세요
4. 답변은 3-4문장으로 간결하게 하세요
5. 이모지를 적절히 사용해 친근하게 답변하세요
6. 한국어로 답변하세요`;

export async function POST(request: NextRequest) {
    try {
        const { message, history } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: 'system', content: systemPrompt },
            ...history.slice(-6), // Keep last 6 messages for context
            { role: 'user', content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.7,
            max_tokens: 300,
        });

        const reply = completion.choices[0]?.message?.content || '죄송합니다, 답변을 생성할 수 없습니다.';

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: 'Chat failed' }, { status: 500 });
    }
}
