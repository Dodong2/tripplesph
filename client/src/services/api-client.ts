import axios, { AxiosError } from 'axios'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

// response interceptors
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {

        if(error.response) {
            const status = error.response.status
            const message = (error.response.data as { message: string })?.message || "Something went wrong"

            if(import.meta.env.DEV) {
                console.error(`API Error: ${status} - ${message}`)
            }

            return Promise.reject(new Error(message))
        }

        if(error.request) {
            if(import.meta.env.DEV) {
                console.error("Network error. Server did not respond.")
            } 

            return Promise.reject(new Error("Network error. Please try again."))
        }

        if(import.meta.env.DEV) {
            console.error("Unexpected error:", error.message)
        }
        
        return Promise.reject(new Error(error.message))
    }
)





