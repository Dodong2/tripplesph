// ── User Types ────────────────────────────────────────────

export type Role = "user" | "writer" | "admin" | "super_admin"

interface UserTypes {
    id: string
    email: string
    name: string | null
    image?: string | null
    role: Role
    banned: boolean | null
    createAt: string
}

export type UserResponse = {
    data: UserTypes[]
    pagination: {
        total: string
        page: number
        limit: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}

