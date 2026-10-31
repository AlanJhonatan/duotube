import { v4 } from 'uuid'

export interface Questions {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

interface QuizEntityProps {
  id?: string
  videoId: string
  questions: Questions[]
}

export class QuizEntity {
  public readonly id: string
  public readonly videoId: string
  public questions: Questions[]
  constructor(props: QuizEntityProps) {
    if (!props.id) {
      this.id = v4()
    } else {
      this.id = props.id
    }

    if (!props.videoId) throw new Error("Quiz must have an 'Video' associated.")

    if (!props.questions.length) throw new Error("Quiz must have 'questions' associated.")

    this.videoId = props.videoId
    this.questions = props.questions
  }
}
