import { useState } from "react";
import { useUpdateUser } from "../mutations/useUpdateUser";
import { useDeleteUser } from "../mutations/useDeleteUser";
import { useAuth } from "../../useAuth";
import type { Role } from "../../../types/index.types"
import toast from "react-hot-toast";
import { UI_MESSAGES } from "../../../errors/message";


export const useUserTable = () => {
    const { user: currentUser } = useAuth()
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [roleFilter, setRoleFilter] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editRole, setEditRole] = useState<Role | ''>('')

    const { mutateAsync: updateAsync, isPending: isUpdating } = useUpdateUser()
    const { mutateAsync: removeAsync, isPending: isDeleting } = useDeleteUser()

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
        
        toast.promise(updateAsync({ id, data: { role: editRole } }), {
            loading: 'Updating role...',
            success: () => {
                cancelEdit()
                return UI_MESSAGES.success('updated', 'User')
            },
            error: (err: Error) => err.message
        })
    }

    const handleDelete = (id: string, name: string | null) => {
        if (!confirm(`Delete user ${name ?? id}?`)) return
        
        toast.promise(removeAsync(id), {
            loading: 'Deleting user...',
            success: UI_MESSAGES.success('deleted', 'User'),
            error: (err: Error) => err.message  
        })
    }

    const canEditRole = (targetUser: { id: string, role: Role }) => {
        if (!currentUser) return false
        // Hindi pwedeng i-edit ang sarili
        if (targetUser.id === currentUser?.id) return false
        // Hindi pwedeng i-edit ang super_admin
        if (targetUser.role === 'super_admin') return false
        // Admin — pwede lang mag-edit ng user at writer
        if (currentUser?.role === 'admin' && targetUser.role === 'admin') return false
        return true
    }

    const canDelete = (targetUser: { id: string, role: Role }) => {
        if (!currentUser) return false
        // Hindi pwedeng i-delete ang sarili
        if (targetUser.id === currentUser?.id) return false
        // Hindi pwedeng i-delete ang super_admin
        if (targetUser.role === 'super_admin') return false
        // Admin — hindi pwedeng i-delete ang kapwa admin
        if (currentUser?.role === 'admin' && targetUser.role === 'admin') return false
        return true
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
        isUpdating, isDeleting,
        canEditRole, canDelete
    }
}