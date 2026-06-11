import { NextResponse } from 'next/server'

import { COMMUNITY_POSTS, COMMUNITY_AUTHORS } from '@/lib/seed-data/community'

export async function GET() {
  const items = COMMUNITY_POSTS.map(post => {
    const author = COMMUNITY_AUTHORS.find(a => a.id === post.authorId)
    return {
      ...post,
      author: author ? { id: author.id, name: author.name, level: author.level } : null,
    }
  })
  return NextResponse.json({ success: true, data: { items, total: items.length } })
}
