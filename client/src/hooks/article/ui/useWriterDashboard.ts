import { useState } from "react"
import { TAGS, STATUS_OPTIONS } from "../../../constants/article.constants"
import { useDeleteArticle } from "../mutations/useDeleteArticles"
import { UI_MESSAGES } from "../../../errors/message"
import toast from 'react-hot-toast'

export const useWriterDashboard = () => {
    const [searchInput, setSearchInput] = useState('')
    const [activeSearch, setActiveSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [tagFilter, setTagFilter] = useState('')

    const { mutateAsync: removeAsync, isPending: isDeleting } = useDeleteArticle()

    const handleDelete = (id: string) => {
        if (!confirm(UI_MESSAGES.deleteConfirm('article'))) return

        toast.promise(removeAsync(id), {
            loading: 'Deleting article...',
            success: UI_MESSAGES.success('deleted', 'Article'),
            error: (err: Error) => err.message
        })
    }

    const handleSearch = () => setActiveSearch(searchInput)

    const handleClear = () => {
        setSearchInput('')
        setActiveSearch('')
        setTagFilter('')
    }

    return {
        TAGS, STATUS_OPTIONS,
        searchInput, setSearchInput,
        activeSearch,
        statusFilter, setStatusFilter,
        tagFilter, setTagFilter,
        handleDelete, isDeleting,
        handleSearch,
        handleClear,
    }
}

