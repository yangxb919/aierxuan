/**
 * 便捷的联系表单钩子
 * 可以在任何页面中使用联系表单弹窗
 */

import { useAppStore } from '@/store/useAppStore'

export function useContactForm() {
  const { contactModalOpen: isOpen, setContactModalOpen } = useAppStore()

  const openContactModal = () => {
    setContactModalOpen(true)
  }

  const closeContactModal = () => {
    setContactModalOpen(false)
  }

  return {
    isOpen,
    openContactModal,
    closeContactModal
  }
}