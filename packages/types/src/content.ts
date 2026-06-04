import { z } from 'zod'

import { CEFRLevelSchema } from './common'

// ---- Reading ----
export const PassageLengthSchema = z.enum(['short', 'medium', 'long'])

export const QuestionTypeSchema = z.enum([
  'multiple_choice',
  'true_false',
  'fill_blank',
  'short_answer',
])

export const QuizQuestionSchema = z.object({
  id: z.string().uuid(),
  questionText: z.string(),
  type: QuestionTypeSchema,
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string().optional(),
  points: z.number().int().default(1),
})

export const ReadingPassageSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  level: CEFRLevelSchema,
  length: PassageLengthSchema,
  topic: z.string(),
  wordCount: z.number().int(),
  questionCount: z.number().int(),
  imageUrl: z.string().url().nullable(),
  createdAt: z.string().datetime(),
})

export const ReadingPassageDetailSchema = ReadingPassageSchema.extend({
  questions: z.array(QuizQuestionSchema),
})

// ---- Vocabulary ----
export const WordSchema = z.object({
  id: z.string().uuid(),
  word: z.string(),
  phonetic_uk: z.string().nullable(),
  phonetic_us: z.string().nullable(),
  partOfSpeech: z.enum(['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'other']),
  definition: z.string(),           // Vietnamese definition
  exampleSentence: z.string(),
  imageUrl: z.string().url().nullable(),
  audioUrl: z.string().url().nullable(),
})

export const VocabularySetSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  level: CEFRLevelSchema,
  totalWords: z.number().int(),
  learnedWords: z.number().int().default(0),
  progressPercent: z.number().min(0).max(100).default(0),
  lastStudiedAt: z.string().datetime().nullable(),
})

// ---- Quiz Exercise Types ----
export const ExerciseTypeSchema = z.enum([
  'choose_best_word',
  'conjugate_verb',
  'conditional',
  'indirect_speech',
  'fill_blank',
  'reading_comprehension',
  'grammar',
  'collocation',
  'synonym_antonym',
  'vocabulary',
  'identify_error',
  'word_form',
  'passive_voice',
  'relative_clause',
  'comparison',
  'inversion',
  'article',
  'preposition',
  'idiom',
  'synonym',
  'stress_pronunciation',
  'cloze_test',
  'connect_sentences',
  'choose_title',
  'complete_dialogue',
  'sentence_order',
  'find_meaning_in_context',
])

export type ReadingPassage = z.infer<typeof ReadingPassageSchema>
export type ReadingPassageDetail = z.infer<typeof ReadingPassageDetailSchema>
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>
export type VocabularySet = z.infer<typeof VocabularySetSchema>
export type Word = z.infer<typeof WordSchema>
export type ExerciseType = z.infer<typeof ExerciseTypeSchema>
export type PassageLength = z.infer<typeof PassageLengthSchema>
