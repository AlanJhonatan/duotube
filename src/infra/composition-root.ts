import { GenerateQuizzFromVideoUseCase } from "../app/usecases/GenerateQuizzFromVideoUseCase";
import { GetAllTranscriptionsUseCase } from "../app/usecases/GetAllTranscriptionsUseCase";
import { TranscriptionAdapter } from "./adapter/TranscriptionAdapter";
import { TranscriptionRepositoryDrizzle } from "./repository/TranscriptionRepositoryDrizzle";
import { QuizGeneratorServiceGemini } from "./services/QuizGeneratorServiceGemini";

const transcriptionRepository = new TranscriptionRepositoryDrizzle();
const transcriptionAdapter = new TranscriptionAdapter();
const quizGeneratorService = new QuizGeneratorServiceGemini();

const getAllTranscriptionsUseCase = new GetAllTranscriptionsUseCase(
  transcriptionRepository,
);

const generateQuizzFromVideoUseCase = new GenerateQuizzFromVideoUseCase(
  transcriptionAdapter,
  transcriptionRepository,
  quizGeneratorService,
);

export const root = {
  getAllTranscriptionsUseCase,
  generateQuizzFromVideoUseCase,
  transcriptionRepository,
};
