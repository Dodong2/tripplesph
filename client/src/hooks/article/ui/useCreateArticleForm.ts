import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCreateArticle } from "../mutations/useCreateArticles"
import { UI_MESSAGES, VALIDATION_ERRORS } from "../../../errors/message"
import type { ArticleStatus, ArticleTag } from "../../../types/index.types"
import toast from "react-hot-toast"

export const useCreateArticleForm = () => {
    const navigate = useNavigate()
    const { mutateAsync: createAsync, isPending, error } = useCreateArticle()

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState<ArticleStatus>('DRAFT')
    const [scheduledAt, setScheduledAt] = useState('')
    const [selectedTags, setSelectedTags] = useState<ArticleTag[]>([])

    const toggleTag = (tag: ArticleTag) => {
        setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
    }

    const handleSubmit = async () => {
        if (!title.trim()) return alert('Title is required')
        if (!content.trim()) return alert('Content is required')
        if (selectedTags.length === 0) return alert('Select at least one tag')
        if (status === 'SCHEDULED' && !scheduledAt) {
            return toast.error(VALIDATION_ERRORS.required('Schedule date'))
        }

        await toast.promise(createAsync({
            title,
            subtitle: subtitle || undefined,
            content,
            status,
            scheduleAt: scheduledAt || undefined,
            tags: selectedTags
        }), {
            loading: 'Creating article...',
            success: UI_MESSAGES.success('created', 'Article'),
            error: (err: Error) => err.message
        }
        )

        navigate('/writer')
    }

    return {
        title, setTitle,
        subtitle, setSubtitle,
        content, setContent,
        status, setStatus,
        scheduledAt, setScheduledAt,
        selectedTags,
        isPending, error,
        toggleTag,
        handleSubmit
    }
}

