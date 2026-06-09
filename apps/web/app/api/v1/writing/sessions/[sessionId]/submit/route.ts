import { NextResponse } from 'next/server'

const FEEDBACK_POOLS = [
  {
    grammarErrors: [{ word: 'go', suggestion: 'goes', rule: 'Chủ ngữ ngôi thứ 3 số ít cần động từ chia đuôi -s/-es' }],
    vocabularyFeedback: 'Từ vựng phù hợp với ngữ cảnh. Bạn có thể thêm tính từ để câu sinh động hơn.',
    overallFeedback: 'Câu viết đúng ngữ pháp cơ bản. Nên thử dùng cấu trúc phức tạp hơn như mệnh đề quan hệ.',
    score: 72,
  },
  {
    grammarErrors: [],
    vocabularyFeedback: 'Lựa chọn từ vựng tốt, đặc biệt là cách dùng collocation.',
    overallFeedback: 'Câu viết tốt! Cấu trúc rõ ràng, từ vựng đa dạng. Có thể mở rộng thêm chi tiết.',
    score: 88,
  },
  {
    grammarErrors: [
      { word: 'doesn\'t', suggestion: 'don\'t', rule: 'Với chủ ngữ số nhiều, dùng do not hoặc don\'t' },
      { word: 'childs', suggestion: 'children', rule: 'Danh từ bất quy tắc: child → children' },
    ],
    vocabularyFeedback: 'Có một số từ chưa phù hợp. Hãy kiểm tra lại cách dùng từ.',
    overallFeedback: 'Cần chú ý hơn về sự hòa hợp chủ ngữ - động từ và danh từ bất quy tắc.',
    score: 55,
  },
]

let feedbackIndex = 0

export async function POST(req: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params
  const body = await req.json().catch(() => ({}))
  const userSentence = body.userSentence || ''

  const feedback = FEEDBACK_POOLS[feedbackIndex % FEEDBACK_POOLS.length]!
  feedbackIndex++

  return NextResponse.json({
    success: true,
    data: {
      sentenceId: `sent-${Date.now()}`,
      sessionId,
      userSentence,
      score: feedback.score,
      grammarErrors: feedback.grammarErrors,
      vocabularyFeedback: feedback.vocabularyFeedback,
      overallFeedback: feedback.overallFeedback,
      improvedVersion: userSentence,
    },
  })
}
