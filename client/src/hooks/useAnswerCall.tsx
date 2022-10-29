import { useMutation } from '@apollo/client'
import apolloQueries from '../queries'

export  function useAnswerCall() {
    const [answerCallMutation, { data, loading, error }] = useMutation(apolloQueries.liveQueries.ANSWER_CALL)
    return { answerCallMutation, data, loading, error }
}
