import { TranscriptionEntity } from "../entities/TranscriptionEntity";

export interface ITranscriptionRepository {
  saveTranscription(
    transcription: TranscriptionEntity,
  ): Promise<TranscriptionEntity>;
  getTranscription(videoId: string): Promise<TranscriptionEntity | null>;
  getAll(): Promise<TranscriptionEntity[]>;
}
