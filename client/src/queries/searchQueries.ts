import { gql } from "@apollo/client";

const SEARCH_CONTACTS = gql`
query SearchContacts($queryString:String){
    searchContacts(args:{queryString:$queryString}){
        _id
        name
        email
        lastSeen
        file {
            _id
            originalname
        }  
    }
}
`;
const searchQueries = { SEARCH_CONTACTS };
export default searchQueries;