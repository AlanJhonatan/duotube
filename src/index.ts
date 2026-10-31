import { root } from './infra/composition-root'

try {
  const quiz = await root.generateQuizzFromVideoUseCase.execute(
    'https://www.youtube.com/watch?v=rKk4XJYzSQA&t',
  )

  console.log('quiz', quiz)
} catch (e) {
  console.error(e)
  process.exit(0)
}
