import { v4 as uuidv4 } from 'uuid'

interface TranscriptionSegment {
  text: string
  duration: number
  offset: number
}

interface Transcription {
  text: string
  offset: number
  duration: number
}

interface TranscriptionEntityProps {
  id?: string
  videoId: string
  transcription: Transcription[]
  source: string
  language: string
  duration: number
}

export class TranscriptionEntity {
  public readonly id: string
  public readonly videoId: string
  public readonly segments: TranscriptionSegment[]
  public readonly source: string
  public readonly language: string
  public readonly duration: number

  constructor(props: TranscriptionEntityProps) {
    if (!props.id) {
      this.id = uuidv4()
    } else {
      this.id = props.id
    }

    this.videoId = props.videoId
    this.segments = this.transcriptionToSegments(props.transcription)
    this.source = props.source
    this.language = props.language
    this.duration = props.duration
  }

  transcriptionToSegments(transcriptions: Transcription[]): TranscriptionSegment[] {
    return transcriptions.map((transcription): TranscriptionSegment => ({
      text: transcription.text,
      offset: transcription.offset,
      duration: transcription.duration,
    }))
  }

  getFullText(): string {
    return this.segments.map((s) => s.text).join(' ')
  }
}
