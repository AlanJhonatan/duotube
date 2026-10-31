import { TranscriptionEntity } from '../../domain/entities/TranscriptionEntity'
import { ITranscriptionRepository } from '../../domain/repository/ITranscriptionRepository'
import { db } from '../db/drizzle/index'
import { TranscriptionRow, transcriptionsTable } from '../db/drizzle/schema'

export class TranscriptionRepositoryDrizzle implements ITranscriptionRepository {
  private toEntity(transcription: TranscriptionRow): TranscriptionEntity {
    return new TranscriptionEntity({
      id: transcription.id,
      videoId: transcription.videoId,
      duration: transcription.duration || 0,
      language: transcription.language,
      transcription: transcription.segments || [],
      source: transcription.source || 'none',
    })
  }

  async saveTranscription(transcription: TranscriptionEntity): Promise<TranscriptionEntity> {
    const [saved] = await db.insert(transcriptionsTable).values(transcription).returning()

    return this.toEntity(saved)
  }

  async getTranscription(videoId: string): Promise<TranscriptionEntity | null> {
    const transcription = await db.query.transcriptionsTable.findFirst({
      where: (ts, { eq }) => eq(ts.videoId, videoId),
    })

    if (!transcription) return null

    return this.toEntity(transcription)
  }

  async getAll(): Promise<TranscriptionEntity[]> {
    const qTranscriptions = await db.query.transcriptionsTable.findMany()

    const transcriptions = qTranscriptions.map((t) => this.toEntity(t))

    if (!transcriptions.length) return []

    return transcriptions
  }
}
