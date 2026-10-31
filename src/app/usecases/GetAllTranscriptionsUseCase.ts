import { TranscriptionEntity } from "../../domain/entities/TranscriptionEntity";
import { ITranscriptionRepository } from "../../domain/repository/ITranscriptionRepository";

export class GetAllTranscriptionsUseCase {
  private transcriptionRepository: ITranscriptionRepository;

  constructor(transcriptionRepository: ITranscriptionRepository) {
    this.transcriptionRepository = transcriptionRepository;
  }

  async excecute(): Promise<TranscriptionEntity[]> {
    const transcriptions = await this.transcriptionRepository.getAll();
    return transcriptions;
  }
}
