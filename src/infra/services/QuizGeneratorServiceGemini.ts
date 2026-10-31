import { GoogleGenAI, Type } from '@google/genai'
import { QuizEntity } from '../../domain/entities/QuizEntity'
import { TranscriptionEntity } from '../../domain/entities/TranscriptionEntity'
import { IQuizGeneratorService } from '../../domain/services/IQuizzGeneratorService'
import { QuizSchema } from '../schemas/QuizSchema'

const quizSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          correctIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING },
        },
        required: ['question', 'options', 'correctIndex', 'explanation'],
      },
    },
  },
  required: ['questions'],
}

export class QuizGeneratorServiceGemini implements IQuizGeneratorService {
  private genai

  constructor() {
    this.genai = new GoogleGenAI({
      apiKey: process.env['GEMINI_API_KEY'],
    })
  }

  async generateQuizz(videoId: string, transcription: TranscriptionEntity): Promise<QuizEntity> {
    console.log(`getting quiz for \n ${videoId}`)
    const response = await this.genai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: `Gere um quiz de 4 perguntas de múltipla escolha sobre a transcrição abaixo:\n\n${transcription.text}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: quizSchema,
      },
    })

    // console.log('finished !')

    // console.log('response', response.text, response.data)

    const parsed = QuizSchema.parse(JSON.parse(response.text as string))

    return new QuizEntity(String(Date.now()), videoId, parsed.questions)
  }
}
