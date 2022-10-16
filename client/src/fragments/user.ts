import { gql } from '@apollo/client';
import { CORE_FILE_FIELDS } from './file';

export const CORE_USER_FIELDS = gql`
${CORE_FILE_FIELDS}
  fragment CoreUserFields on User {
    _id
    name
    lastSeen
    email
    file {
        ...CoreFileFields
    }
    followers
    following
  }
`;