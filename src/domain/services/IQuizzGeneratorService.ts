import { QuizEntity } from "../entities/QuizEntity";
import { TranscriptionEntity } from "../entities/TranscriptionEntity";

export interface IQuizGeneratorService {
  generateQuizz(
    videoId: string,
    transcription: TranscriptionEntity,
  ): Promise<QuizEntity>;
}
