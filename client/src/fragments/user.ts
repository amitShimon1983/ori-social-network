import { gql } from '@apollo/client';

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    _id
    name
    lastSeen
    email
    file {
        _id
        originalname
    }
    followers
    following
  }
`;