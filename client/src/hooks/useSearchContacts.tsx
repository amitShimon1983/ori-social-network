import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_CONTACTS = gql`
query SearchContacts($queryString:String){
    searchContacts(args:{queryString:$queryString}){
        _id
        name
        email
        file {
            _id
            originalname
        }  
    }
}
`;

export const useSearchContacts = () => {
    const [searchContactsQuery, { data, error, loading }] = useLazyQuery(SEARCH_CONTACTS)
    return { data, error, loading, searchContactsQuery }
}

