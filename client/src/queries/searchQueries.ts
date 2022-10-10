import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../fragments";

const SEARCH_CONTACTS = gql`
${CORE_USER_FIELDS}
query SearchContacts($queryString:String){
    searchContacts(args:{queryString:$queryString}){
        ...CoreUserFields
    }
}
`;
const searchQueries = { SEARCH_CONTACTS };
export default searchQueries;