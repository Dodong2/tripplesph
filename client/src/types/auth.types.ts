export type UserRole = 'user' | 'writer' | 'admin' | 'super_admin'

export interface UserWithRole {
    id: string
    email: string
    name: string
    image?: string | null
    role: UserRole
}