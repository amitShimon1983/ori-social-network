import { gql, useMutation } from "@apollo/client"
import { useEffect } from "react"


const UPDATE_USER_CONNECTIVITY_STATUS = gql`
   mutation UpdateUserStatus{
    updateUserStatus
   }
`

export function useUpdateUserStatus() {
    const [updateUserStatusMutation, { loading, data, error }] = useMutation(UPDATE_USER_CONNECTIVITY_STATUS);
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
