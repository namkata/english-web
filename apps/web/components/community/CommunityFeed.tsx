'use client'

import { useQuery } from '@tanstack/react-query'
import { Heart, MessageCircle, PenLine, HelpCircle, UserPlus, UserCheck } from 'lucide-react'

import { cn } from '@/lib/utils'
import { apiClient, type CommunityFeedPost } from '@/lib/api-client'
import { useCommunityStore } from '@/lib/stores/community-store'
import { useHasHydrated } from '@/lib/stores/learning-store'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3_600_000)
  if (h < 1) return 'vừa xong'
  if (h < 24) return `${h} giờ trước`
  return `${Math.floor(h / 24)} ngày trước`
}

function PostCard({ post }: { post: CommunityFeedPost }) {
  const hydrated = useHasHydrated()
  const likedPostIds = useCommunityStore(s => s.likedPostIds)
  const following = useCommunityStore(s => s.following)
  const toggleLike = useCommunityStore(s => s.toggleLike)
  const toggleFollow = useCommunityStore(s => s.toggleFollow)

  const liked = hydrated && likedPostIds.includes(post.id)
  const isFollowing = hydrated && !!post.author && following.includes(post.author.id)
  const initial = post.author?.name.charAt(0).toUpperCase() ?? '?'

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold border border-brand-200">
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{post.author?.name ?? 'Ẩn danh'}</span>
            <span className="text-[11px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">{post.author?.level}</span>
          </div>
          <p className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</p>
        </div>
        {post.author && post.author.id !== 'demo' && (
          <button
            onClick={() => toggleFollow(post.author!.id)}
            className={cn(
              'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors',
              isFollowing ? 'text-muted-foreground hover:bg-muted' : 'text-primary border-primary hover:bg-primary/5',
            )}
          >
            {isFollowing ? <UserCheck size={13} /> : <UserPlus size={13} />}
            {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
          </button>
        )}
      </div>

      <div className="mt-3 flex items-start gap-2">
        <span
          className={cn(
            'flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium flex-shrink-0',
            post.type === 'writing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700',
          )}
        >
          {post.type === 'writing' ? <PenLine size={11} /> : <HelpCircle size={11} />}
          {post.type === 'writing' ? 'Bài viết' : 'Câu hỏi'}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{post.content}</p>

      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <button
          onClick={() => toggleLike(post.id)}
          className={cn('flex items-center gap-1.5 hover:text-red-500 transition-colors', liked && 'text-red-500')}
        >
          <Heart size={15} className={liked ? 'fill-current' : ''} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <span className="flex items-center gap-1.5">
          <MessageCircle size={15} /> {post.comments}
        </span>
      </div>
    </div>
  )
}

export function CommunityFeed({ onlyFollowing = false }: { onlyFollowing?: boolean }) {
  const hydrated = useHasHydrated()
  const following = useCommunityStore(s => s.following)

  const { data, isLoading } = useQuery({
    queryKey: ['community', 'feed'],
    queryFn: () => apiClient.community.getFeed(),
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  let posts = data?.items ?? []
  if (onlyFollowing) {
    posts = hydrated ? posts.filter(p => p.author && following.includes(p.author.id)) : []
  }

  if (!posts.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-muted p-8 text-center">
        <p className="font-medium text-sm">{onlyFollowing ? 'Chưa theo dõi ai' : 'Chưa có bài đăng'}</p>
        <p className="text-xs text-muted-foreground">
          {onlyFollowing ? 'Theo dõi người học khác để xem bài của họ ở đây.' : 'Hãy quay lại sau nhé.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map(p => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  )
}
