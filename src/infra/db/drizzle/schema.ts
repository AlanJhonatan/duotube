import { integer, jsonb, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { timestamps } from './columns.helpers'

interface segments {
  text: string
  offset: number
  duration: number
}

export const transcriptionsTable = pgTable('transcriptions', {
  id: uuid().defaultRandom().primaryKey(),
  videoId: varchar({ length: 255 }).unique().notNull(),
  language: varchar({ length: 5 }).notNull(),
  source: varchar({ length: 50 }).notNull(), // 'youtube_captions' | 'whisper'
  segments: jsonb().$type<segments[]>().default([]), // [{ start, end, text }]
  duration: integer(),
  ...timestamps,
})

interface Questions {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type TranscriptionRow = typeof transcriptionsTable.$inferSelect
export type NewTranscriptionRow = typeof transcriptionsTable.$inferInsert

export const quizzesTable = pgTable('quizzes', {
  id: uuid().defaultRandom().primaryKey(),
  videoId: varchar({ length: 255 }).notNull(),
  questions: jsonb().$type<Questions[]>().default([]),
})

export type QuizRow = typeof quizzesTable.$inferSelect
export type NewQuizRow = typeof quizzesTable.$inferInsert
