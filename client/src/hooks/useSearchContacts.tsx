import { useLazyQuery } from "@apollo/client";
import apolloQueries from "../queries";
export const useSearchContacts = () => {
    const [searchContactsQuery, { data, error, loading }] = useLazyQuery(apolloQueries.searchQueries.SEARCH_CONTACTS)
    return { data, error, loading, searchContactsQuery }
}

