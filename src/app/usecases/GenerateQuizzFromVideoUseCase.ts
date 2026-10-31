import { ITranscriptionAdapter } from '../../domain/adapter/ITranscriptionAdapter'
import { QuizEntity } from '../../domain/entities/QuizEntity'
import { ITranscriptionRepository } from '../../domain/repository/ITranscriptionRepository'
import { IQuizGeneratorService } from '../../domain/services/IQuizzGeneratorService'

export class GenerateQuizzFromVideoUseCase {
  private transcriptionAdapter: ITranscriptionAdapter
  private transcriptionRepository: ITranscriptionRepository
  private quizGeneratorService: IQuizGeneratorService

  constructor(
    transcriptionAdapter: ITranscriptionAdapter,
    transcriptionRepository: ITranscriptionRepository,
    quizGeneratorService: IQuizGeneratorService,
  ) {
    this.transcriptionAdapter = transcriptionAdapter
    this.transcriptionRepository = transcriptionRepository
    this.quizGeneratorService = quizGeneratorService
  }

  async execute(videoId: string): Promise<QuizEntity> {
    const transcription = await this.transcriptionAdapter.generateTranscription(videoId)

    const createdTranscription = await this.transcriptionRepository.saveTranscription(transcription)

    const quiz = await this.quizGeneratorService.generateQuizz(videoId, createdTranscription)

    // return quiz
    // return new QuizEntity()
  }
}
