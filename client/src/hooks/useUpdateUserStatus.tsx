import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import apolloQueries from "../queries";

export function useUpdateUserStatus() {
    const [updateUserStatusMutation, { loading, data, error }] = useMutation(apolloQueries.userQueries.UPDATE_USER_CONNECTIVITY_STATUS);
    useEffect(() => {
        const timer = setInterval(() => {
            updateUserStatusMutation()
        }, 30000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return { updateUserStatusMutation, loading, data, error }
}
