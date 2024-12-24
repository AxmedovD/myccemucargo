import {
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  CheckIcon,
  ArrowUturnLeftIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

export const ORDER_STATUSES = {
  new: {
    label: 'New',
    icon: ClockIcon,
    iconColor: 'text-yellow-500',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  },
  accepted: {
    label: 'Accepted',
    icon: CheckCircleIcon,
    iconColor: 'text-blue-500',
    textColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  processing: {
    label: 'Processing',
    icon: ArrowPathIcon,
    iconColor: 'text-indigo-500',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
  },
  shipped: {
    label: 'Shipped',
    icon: TruckIcon,
    iconColor: 'text-purple-500',
    textColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  delivered: {
    label: 'Delivered',
    icon: CheckIcon,
    iconColor: 'text-green-500',
    textColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircleIcon,
    iconColor: 'text-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  },
  returned: {
    label: 'Returned',
    icon: ArrowUturnLeftIcon,
    iconColor: 'text-orange-500',
    textColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  }
}

export const getStatusConfig = (status) => {
  if (!status) {
    return {
      label: 'Unknown',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-gray-500',
      textColor: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const statusKey = status.toLowerCase()
  return ORDER_STATUSES[statusKey] || {
    label: status,
    icon: ExclamationTriangleIcon,
    iconColor: 'text-gray-500',
    textColor: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}