import OpenAI from 'openai'

// Debug: Check environment variables
console.log('🚀 Initializing OpenAI client...')
console.log('import.meta.env:', import.meta.env)
console.log('📋 All env vars:', Object.keys(import.meta.env))
console.log('🔑 VITE_OPENAI_API_KEY in import.meta.env:', import.meta.env.VITE_OPENAI_API_KEY ? '✅ Present' : '❌ Missing')
console.log('🔑 VITE_OPENAI_API_KEY length:', import.meta.env.VITE_OPENAI_API_KEY?.length || 0)

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

if (!apiKey || apiKey === 'your_openai_api_key_here') {
  const errorMsg = `
❌ VITE_OPENAI_API_KEY is not properly configured!

Current value: "${apiKey}"

Please ensure:
1. Your .env file exists in the project root
2. It contains: VITE_OPENAI_API_KEY=your_actual_openai_api_key
3. The key is not the placeholder "your_openai_api_key_here"
4. Restart the dev server after changes

Get your API key from: https://platform.openai.com/api-keys
`
  throw new Error(errorMsg)
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
})

export interface CoverLetterRequest {
  type: 'url' | 'description'
  url?: string
  title?: string
  description?: string
  resumeContent?: string
}

export const generateCoverLetter = async (request: CoverLetterRequest): Promise<string> => {
  try {
    let prompt = ''

    if (request.type === 'url') {
      prompt = `
Создайте профессиональное сопроводительное письмо на основе следующей информации:

URL вакансии: ${request.url}

${request.resumeContent ? `Содержание резюме кандидата:\n${request.resumeContent}\n\n` : ''}

Пожалуйста, создайте персонализированное сопроводительное письмо, которое:
1. Будет адресовано HR-менеджеру или работодателю
2. Подчеркнет релевантный опыт и навыки
3. Покажет энтузиазм по отношению к компании и позиции
4. Будет лаконичным и профессиональным
5. Будет написано на русском языке

Структура письма должна включать:
- Приветствие
- Введение (откуда узнал о вакансии)
- Основная часть (почему подходит на эту позицию)
- Заключение (предложение обсудить кандидатуру подробнее)
- Прощание
      `
    } else if (request.type === 'description') {
      prompt = `
Создайте профессиональное сопроводительное письмо на основе следующей информации:

Название вакансии: ${request.title}
Описание вакансии: ${request.description}

Пожалуйста, создайте персонализированное сопроводительное письмо, которое:
1. Будет адресовано HR-менеджеру или работодателю
2. Покажет понимание требований вакансии
3. Подчеркнет релевантный опыт и навыки
4. Будет лаконичным и профессиональным
5. Будет написано на русском языке

Структура письма должна включать:
- Приветствие
- Введение (откуда узнал о вакансии)
- Основная часть (почему подходит на эту позицию)
- Заключение (предложение обсудить кандидатуру подробнее)
- Прощание
      `
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: "Вы - профессиональный помощник по созданию сопроводительных писем. Создавайте качественные, персонализированные письма на русском языке."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_completion_tokens: 1000,
    })

    return completion.choices[0]?.message?.content?.trim() || 'Не удалось сгенерировать сопроводительное письмо'
  } catch (error) {
    console.error('Error generating cover letter:', error)
    throw new Error('Произошла ошибка при генерации сопроводительного письма')
  }
}

export default openai
