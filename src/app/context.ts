import { createContext } from 'react'
import { AddToastAlert } from '@kotorieclair/ktrecl-ui-tools'

export const ToastAlertContext = createContext<{
  addToastAlert: AddToastAlert
}>({ addToastAlert: (...args: Parameters<AddToastAlert>) => {} })
