import { useNavigate } from "react-router-dom"
import { useAuth } from "../../useAuth"
import { useParams } from "react-router-dom"
import { useState, useEffect, } from "react"
import { useGetArticle } from "../queries/useGetArticle"
import { useUpdateArticle } from "../mutations/useUpdateArticles"
import { useSubmitForApproval } from "../mutations/useSubmitForApproval"
import type { ArticleStatus, ArticleTag } from "../../../types/index.types"
import { UI_MESSAGES, VALIDATION_ERRORS } from "../../../errors/message"
import toast from 'react-hot-toast'

export const useUpdateArticleForm = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { data: article, isLoading, error } = useGetArticle(id!)
    const { mutateAsync: updateAsync, isPending } = useUpdateArticle()
    const { mutateAsync: submitAsync, isPending: isSubmitting } = useSubmitForApproval()

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState<ArticleStatus>('DRAFT')
    const [scheduledAt, setScheduledAt] = useState('')
    const [selectedTags, setSelectedTags] = useState<ArticleTag[]>([])
    const [initialized, setInitialized] = useState(false)

    // ── Populate form once article is fetched ─────────
    useEffect(() => {
        if (article) {
            setTitle(article.title)
            setSubtitle(article.subtitle ?? '')
            setContent(article.content)
            setStatus(article.status)
            setScheduledAt(
                article.scheduledAt ? new Date(article.scheduledAt).toISOString().split('T')[0]
                    : ''
            )
            setSelectedTags(article.tags?.map(t => t.tag) ?? [])
            setInitialized(true)
        }
    }, [article?.id, article?.updatedAt, article?.approvalStatus])

    // ── Change detection ──────────────────────────────
    const hasChanges = article && initialized && (
        title !== article.title ||
        subtitle !== (article.subtitle ?? '') ||
        content !== article.content ||
        status !== article.status ||
        scheduledAt !== (article.scheduledAt
            ? new Date(article.scheduledAt).toISOString().split('T')[0]
            : '') ||
        JSON.stringify([...selectedTags].sort()) !==
        JSON.stringify([...(article.tags?.map(t => t.tag) ?? [])].sort())
    )

    // ── Tag toggle ────────────────────────────────────
    const toggleTag = (tag: ArticleTag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    // ── Permission check ──────────────────────────────
    const canEdit = article && (
        user?.role === 'admin' ||
        user?.role == 'super_admin' ||
        (user?.role === 'writer' && article.authorId === user.id)
    )

    // ── Submit ────────────────────────────────────────
    const handleSubmit = async () => {
        if (!title.trim()) return toast.error(VALIDATION_ERRORS.required('Title'))
        if (!content.trim()) return toast.error(VALIDATION_ERRORS.required('Content'))
        if (selectedTags.length === 0) return toast.error(VALIDATION_ERRORS.required('Select at least one tag'))
        if (status === 'SCHEDULED' && !scheduledAt) {
            return toast.error(VALIDATION_ERRORS.required('Schedule date'))
        }

        await toast.promise(updateAsync({
            id: id!,
            input: {
                title,
                subtitle: subtitle || undefined,
                content,
                status,
                scheduleAt: scheduledAt || undefined,
                tags: selectedTags
            }
        }), {
            loading: 'Saving changes...',
            success: UI_MESSAGES.success('updated', 'Article'),
            error: (err: Error) => err.message
        })

        setInitialized(false)
    }

    const handleSubmitForApproval = async () => {
        await toast.promise(
            submitAsync(id!),
            {
                loading: 'Sending for approval...',
                success: UI_MESSAGES.success('Article', 'approval'),
                error: (err: Error) => err.message
            }
        )
        setInitialized(false)
        navigate('/writer')
    }

    const isApproved = article?.approvalStatus === 'APPROVED'

    return {
        isLoading, error,
        isPending,
        title, setTitle,
        subtitle, setSubtitle,
        content, setContent,
        status, setStatus,
        scheduledAt, setScheduledAt,
        selectedTags,
        initialized,
        hasChanges, toggleTag,
        canEdit, handleSubmit,
        isSubmitting,
        handleSubmitForApproval,
        article, isApproved, user
    }

}

