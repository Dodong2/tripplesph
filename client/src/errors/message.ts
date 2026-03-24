
export const API_ERRORS = {
    Unauthorized: 'You are not logged in.',
    forbidden: 'You do not have permission to do this.',
    notFound: 'The resource you are looking for does not exist.',
    serverError: 'Something went wrong. Please try again later.',
    network: 'Network error. Please check your connection.',
} as const 

export const VALIDATION_ERRORS = {
    required: (field: string) => `${field} is required`,
    minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
    maxLength: (field: string, max: number) => `${field} must not exceed ${max} characters`,
    invalidEmail: 'Please enter a valid email address.',
    invalidUrl: 'Please enter a valid URL.'
} as const

export const UI_MESSAGES = {
    loading: 'Loading...',
    noData: (entity: string) => `No ${entity} found.`,
    deleteConfirm: (entity: string) => `Are you sure you want to delete this ${entity}?`,
    success: (action: string, entity: string) => `${entity} ${action} successfully.`,
}