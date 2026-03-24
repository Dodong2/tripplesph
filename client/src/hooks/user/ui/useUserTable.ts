import { useState } from "react";
import { useUpdateUser } from "../mutations/useUpdateUser";
import { useDeleteUser } from "../mutations/useDeleteUser";
import { useAuth } from "../../useAuth";
import type { Role } from "../../../types/index.types"


export const useUserTable = () => {
    const { user: currentUser } = useAuth()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editRole, setEditRole] = useState<Role | ''>('')

    const { mutate: update, isPending: isUpdating } = useUpdateUser()
    const { mutate: remove, isPending: isDeleting } = useDeleteUser()

    const roleOptions = currentUser?.role === 'super_admin'
        ? ['user', 'writer', 'admin'] : ['writer']

    const handleSearchChange = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    const handleRoleFilterChange = (value: string) => {
        setRoleFilter(value)
        setPage(1)
    }

    const startEdit = (id: string, role: Role) => {
        setEditingId(id)
        setEditRole(role)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditRole('')
    }

    const handleUpdate = (id: string) => {
        if (!editRole) return
        update(
            { id, data: { role: editRole } },
            {
                onSuccess: cancelEdit,
                onError: (err) => alert(err.message)
            }
        )
    }

    const handleDelete = (id: string, name: string | null) => {
        if (!confirm(`Delete user ${name ?? id}?`)) return
        remove(id, {
            onError: (err) => alert(err.message)
        })
    }

    return {
        // pagination
        page, setPage,
        // search + filter
        search, handleSearchChange,
        roleFilter, handleRoleFilterChange,
        // edit state
        editingId, editRole, setEditRole,
        startEdit, cancelEdit,
        // handlers
        handleUpdate, handleDelete,
        roleOptions,
        // loading states
        isUpdating, isDeleting
    }
}