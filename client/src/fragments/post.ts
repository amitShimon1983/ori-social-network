import { gql } from '@apollo/client';
import { CORE_USER_FIELDS } from './user';
import { CORE_FILE_FIELDS } from './file';

export const CORE_POST_FIELDS = gql`
${CORE_USER_FIELDS}
${CORE_FILE_FIELDS}
  fragment CorePostFields on Post {
  _id
  title
  createdAt
  views
  user {
    ...CoreUserFields
  }
  file {
    ...CoreFileFields
  }
}
`;