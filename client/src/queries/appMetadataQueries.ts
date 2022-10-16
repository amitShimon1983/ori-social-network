import { gql } from "@apollo/client";

const GET_APP_REACTIONS = gql`
query GetAppReactions{
    getAppReactions{
        reactions{
            _id
            emoji
        }
    }
}
`;

const appMetadataQueries = { GET_APP_REACTIONS };

export default appMetadataQueries;