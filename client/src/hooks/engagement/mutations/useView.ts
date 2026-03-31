import { useMutation } from "@tanstack/react-query";
import { addView } from "../../../services/engagement.service";

export const useView = (articleId: string, enabled: boolean) => {
    return useMutation({
        mutationFn: () => addView(articleId)
    })
}