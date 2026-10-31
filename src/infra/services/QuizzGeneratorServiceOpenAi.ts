import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { QuizzEntity } from "../../domain/entities/QuizzEntity";
import { TranscriptionEntity } from "../../domain/entities/TranscriptionEntity";
import { IQuizzGeneratorService } from "../../domain/services/IQuizzGeneratorService";
import { QuizSchema } from "../schemas/QuizSchema";

export class QuizzGeneratorService implements IQuizzGeneratorService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });
  }

  async generateQuizz(
    videoId: string,
    transcription: TranscriptionEntity,
  ): Promise<QuizzEntity> {
    const completion = await this.openai.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você gera quizzes educacionais com base em transcrições de vídeos.",
        },
        {
          role: "user",
          content: `Gere um quiz de 4 perguntas de múltipla escolha sobre a transcrição abaixo:\n\n${transcription.text}`,
        },
      ],
      response_format: zodResponseFormat(QuizSchema, "quiz"),
    });

    const quiz = completion.choices[0].message.parsed;

    if (!quiz) throw new Error("Falha ao gerar quiz!");

    return new QuizzEntity("random-id", videoId, quiz.questions);
  }
}
