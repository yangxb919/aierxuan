'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface FAQListActionsProps {
  faqId: string
}

export default function FAQListActions({ faqId }: FAQListActionsProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleDelete = async () => {
    if (!confirming) {
      setConfirming(true)
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/faq/${faqId}`, { method: 'DELETE' })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to delete FAQ')
      }

      router.refresh()
    } catch (err) {
      console.error('Delete FAQ error:', err)
      alert(err instanceof Error ? err.message : 'Failed to delete FAQ')
      setIsDeleting(false)
      setConfirming(false)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <Link
        href={`/admin/faq/${faqId}/edit`}
        className="text-sm text-orange-600 hover:text-orange-800 font-medium"
      >
        Edit
      </Link>
      {!confirming ? (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
        >
          Delete
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm text-red-600 hover:text-red-800 font-semibold disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Confirm?'}
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={isDeleting}
            className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

