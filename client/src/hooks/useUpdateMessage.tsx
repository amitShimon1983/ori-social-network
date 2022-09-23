import { gql, useMutation, useQuery } from '@apollo/client'
const UPDATE_MESSAGE = gql`
mutation UpdateMessage($isRead:Boolean, $id:String){
    updateMessage(args:{isRead: $isRead, id: $id}){
        isRead
        _id
    }
}
`;
export function useUpdateMessage() {
    const [updateMessageMutation, { data, error, loading }] = useMutation(UPDATE_MESSAGE)
    const updateMessage = async (messageId: string, skip: boolean) => {
        if (!skip) {
            await updateMessageMutation({
                variables: {
                    isRead: true,
                    id: messageId
                }
            })
        }
    }
    return { data, error, loading, updateMessage }
}
