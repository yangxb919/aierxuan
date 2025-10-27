'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'

interface RFQStatusUpdaterProps {
  rfqId: string
  currentStatus: string
}

const statusOptions = [
  { value: 'new', label: 'New', color: 'blue' },
  { value: 'contacted', label: 'Contacted', color: 'yellow' },
  { value: 'quoted', label: 'Quoted', color: 'purple' },
  { value: 'closed', label: 'Closed', color: 'green' },
  { value: 'spam', label: 'Spam', color: 'red' },
]

export default function RFQStatusUpdater({ rfqId, currentStatus }: RFQStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  
  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return
    
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      const response = await fetch(`/api/admin/rfqs/${rfqId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setStatus(newStatus)
        setSuccess(true)
        
        // Refresh the page data
        router.refresh()
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(data.error || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Update Status
      </label>
      
      <div className="space-y-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            disabled={loading || status === option.value}
            className={`
              w-full text-left px-4 py-2 rounded-md border transition-colors
              ${status === option.value
                ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }
              ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option.label}</span>
              {status === option.value && (
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="text-sm text-gray-500 flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Updating status...
        </div>
      )}
      
      {success && (
        <div className="text-sm text-green-600 flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Status updated successfully!
        </div>
      )}
      
      {error && (
        <div className="text-sm text-red-600 flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}
