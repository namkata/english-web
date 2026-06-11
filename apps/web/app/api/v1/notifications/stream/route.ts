/**
 * Server-Sent Events stream for realtime notifications.
 *
 * On connect it flushes any pending notifications, then pushes a periodic
 * "nudge" (streak reminder / daily challenge) every interval. The client
 * consumes this via EventSource in `useNotifications`. In production these
 * events would originate from the gamification/social services via a broker.
 */
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

interface Notification {
  id: string
  type: 'streak' | 'challenge' | 'community' | 'system'
  title: string
  body: string
  at: string
}

const INITIAL: Omit<Notification, 'id' | 'at'>[] = [
  { type: 'challenge', title: 'Thử thách hôm nay', body: 'Hoàn thành 1 bài đọc và 5 thẻ từ vựng để nhận 50 XP.' },
  { type: 'streak', title: 'Giữ chuỗi học!', body: 'Bạn chưa học hôm nay. Học 5 phút để giữ chuỗi ngày của mình.' },
  { type: 'community', title: 'Vy Hoàng vừa đăng bài', body: '“Consistency beats intensity...” — ghé xem trong Cộng đồng.' },
]

const NUDGES: Omit<Notification, 'id' | 'at'>[] = [
  { type: 'challenge', title: 'Sắp hết hạn thử thách', body: 'Còn vài giờ để hoàn thành thử thách hôm nay.' },
  { type: 'community', title: 'Có người theo dõi bạn', body: 'Một người học khác vừa theo dõi bạn.' },
  { type: 'system', title: 'Mẹo học tập', body: 'Ôn lại từ vựng bằng chế độ SM-2 để nhớ lâu hơn.' },
]

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  let interval: ReturnType<typeof setInterval> | undefined
  let counter = 0

  const stream = new ReadableStream({
    start(controller) {
      const send = (n: Notification) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(n)}\n\n`))
      }
      const make = (base: Omit<Notification, 'id' | 'at'>): Notification => ({
        ...base,
        id: `ntf-${Date.now()}-${counter++}`,
        at: new Date().toISOString(),
      })

      // Flush initial notifications immediately.
      INITIAL.forEach(n => send(make(n)))

      // Push a periodic nudge.
      interval = setInterval(() => {
        const base = NUDGES[counter % NUDGES.length]!
        send(make(base))
      }, 45_000)

      // Clean up when the client disconnects.
      req.signal.addEventListener('abort', () => {
        if (interval) clearInterval(interval)
        try {
          controller.close()
        } catch {
          /* already closed */
        }
      })
    },
    cancel() {
      if (interval) clearInterval(interval)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
