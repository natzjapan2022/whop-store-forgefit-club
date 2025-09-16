export interface User {
  id: string
  name: string
  email: string
  datePurchased: string
  status: 'Active' | 'Inactive' | 'Pending'
  [key: string]: string | number | boolean
}

export interface Column {
  id: string
  name: string
  type: 'text' | 'email' | 'date' | 'select' | 'textarea'
  required: boolean
  options?: string[]
}

export interface PlanConfig {
  id: string
  name: string
  price: number
  productId: string
  features: string[]
  popular?: boolean
}

export interface FormData {
  [key: string]: string | number | boolean
}