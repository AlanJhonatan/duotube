import { fetchTranscript } from 'youtube-transcript'
import { ITranscriptionAdapter } from '../../domain/adapter/ITranscriptionAdapter'
import { TranscriptionEntity } from '../../domain/entities/TranscriptionEntity'

// await writeFile(
//   `./transcriptions/trasncription-${videoId}.json`,
//   JSON.stringify(response),
//   'utf-8',
// )

export class TranscriptionAdapter implements ITranscriptionAdapter {
  async generateTranscription(videoId: string): Promise<TranscriptionEntity> {
    const response = await fetchTranscript(videoId)

    console.log('generate transcription', response)

    if (!response.length) throw new Error('No transcription was found for this video.')

    const language = response[0].lang || 'en-us'

    const lastDuration = response.at(-1)?.duration || 0
    const lastOffset = response.at(-1)?.offset || 0

    const totalDuration = lastDuration + lastOffset

    const transcription = new TranscriptionEntity({
      videoId,
      language,
      source: 'youtube-transcript',
      duration: totalDuration,
      transcription: response,
    })

    return transcription
  }
}
