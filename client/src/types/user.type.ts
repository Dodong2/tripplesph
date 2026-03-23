import type { PageBasedResponse } from "./pagination.types";

export type Role = "user" | "writer" | "admin" | "super_admin"

export interface User {
    id: string
    email: string
    name: string | null
    image?: string | null
    role: Role
    banned: boolean | null
    createdAt: string
}

export type UserResponse = PageBasedResponse<User>

