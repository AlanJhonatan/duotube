import { QuizEntity } from '../../domain/entities/QuizEntity'
import { IQuizRepository } from '../../domain/repository/IQuizRepository'
import { db } from '../db/drizzle'
import { QuizRow, quizzesTable } from '../db/drizzle/schema'

export class QuizRepositoryDrizzle implements IQuizRepository {
  private toEntity(quiz: QuizRow) {
    return new QuizEntity({
      id: quiz.id,
      videoId: quiz.videoId,
      questions: quiz.questions || [],
    })
  }

  async createQuizz(quiz: QuizEntity): Promise<QuizEntity> {
    const [saved] = await db.insert(quizzesTable).values(quiz).returning()

    return this.toEntity(saved)
  }
  getQuizzByVideoId(videoId: string): Promise<QuizEntity> {
    throw new Error('Method not implemented.')
  }
}
