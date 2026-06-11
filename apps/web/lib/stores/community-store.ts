/**
 * Client-side community state (persisted): which authors the learner follows
 * and which posts they've liked. Backend-independent so the feed is interactive
 * without the gamification/social services running.
 */
'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CommunityState {
  following: string[]
  likedPostIds: string[]
  toggleFollow: (authorId: string) => void
  toggleLike: (postId: string) => void
}

export const useCommunityStore = create<CommunityState>()(
  persist(
    set => ({
      following: [],
      likedPostIds: [],
      toggleFollow: authorId =>
        set(state => ({
          following: state.following.includes(authorId)
            ? state.following.filter(id => id !== authorId)
            : [...state.following, authorId],
        })),
      toggleLike: postId =>
        set(state => ({
          likedPostIds: state.likedPostIds.includes(postId)
            ? state.likedPostIds.filter(id => id !== postId)
            : [...state.likedPostIds, postId],
        })),
    }),
    { name: 'englishweb-community' },
  ),
)
