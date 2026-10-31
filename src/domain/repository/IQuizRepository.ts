import { QuizEntity } from '../entities/QuizEntity'

export interface IQuizRepository {
  createQuizz(quiz: QuizEntity): Promise<QuizEntity>
  getQuizzByVideoId(videoId: string): Promise<QuizEntity>
}
