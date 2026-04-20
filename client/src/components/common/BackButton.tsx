import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

type BackButtonProps = {
    fallbackPath: string
    allowHistoryBack?: boolean
}

export const BackButton = ({ fallbackPath, allowHistoryBack = false }: BackButtonProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        if (allowHistoryBack && window.history.length > 1) {
            navigate(-1)
        } else {
            navigate(fallbackPath)
        }
    }
    
    return (
    <Button onClick={handleBack} variant="secondary">
      ← Back
    </Button>
  )
}

