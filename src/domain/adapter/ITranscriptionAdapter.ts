import { TranscriptionEntity } from "../entities/TranscriptionEntity";

export interface ITranscriptionAdapter {
  generateTranscription(videoId: string): Promise<TranscriptionEntity>;
}
