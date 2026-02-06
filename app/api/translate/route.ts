import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const languageNames: Record<string, string> = {
    ko: 'Korean',
    en: 'English',
    ja: 'Japanese',
    zh: 'Chinese (Simplified)',
};

export async function POST(request: NextRequest) {
    try {
        const { text, targetLang } = await request.json();

        if (!text || !targetLang) {
            return NextResponse.json({ error: 'Missing text or targetLang' }, { status: 400 });
        }

        const targetLanguage = languageNames[targetLang] || 'English';

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a professional translator specializing in beauty and cosmetics. Translate the following text to ${targetLanguage}. Keep the tone friendly and professional. Only return the translated text, nothing else.`,
                },
                {
                    role: 'user',
                    content: text,
                },
            ],
            temperature: 0.3,
        });

        const translatedText = completion.choices[0]?.message?.content || text;

        return NextResponse.json({ translatedText });
    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
    }
}
