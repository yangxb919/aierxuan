'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BlogListActionsProps {
  postId: string
  slug: string
}

export default function BlogListActions({ postId, slug }: BlogListActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    if (!showConfirm) {
      setShowConfirm(true)
      return
    }

    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete post')
      }

      // Refresh the page to show updated list
      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete post')
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        href={`/blog/${slug}`}
        target="_blank"
        className="text-blue-600 hover:text-blue-900"
      >
        View
      </Link>
      <Link
        href={`/admin/blog/${postId}/edit`}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit
      </Link>
      
      {!showConfirm ? (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 hover:text-red-900 disabled:opacity-50"
        >
          Delete
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Confirm?'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isDeleting}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

