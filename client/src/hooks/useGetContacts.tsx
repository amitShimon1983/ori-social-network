import { gql, useLazyQuery } from "@apollo/client";

const GET_CONTACTS = gql`
query GetContacts($queryString:String){
    getContacts(args:{queryString:$queryString}){
        user {
            _id
            name
            email
            file {
              originalname
            }  
        }
    }
}
`;

export const useGetContacts = () => {
    const [getUserContactsQuery, { data, error, loading }] = useLazyQuery(GET_CONTACTS)
    return { data, error, loading, getUserContactsQuery }
}

