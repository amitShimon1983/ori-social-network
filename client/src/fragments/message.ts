import { gql } from '@apollo/client';
import { CORE_USER_FIELDS } from './user';
import { CORE_FILE_FIELDS } from './file';

export const CORE_MESSAGE_FIELDS = gql`
  ${CORE_USER_FIELDS}
  ${CORE_FILE_FIELDS}
  fragment CoreMessageFields on Message {
    isRead
    _id
    type
    messageThreadId
    file {
     ...CoreFileFields
    }
    parentMessageId{
      _id
      content
      sender{
        ...CoreUserFields
      }
    }
    sender{
        ...CoreUserFields
    }
    recipient{
        ...CoreUserFields
    }
    content
    createdAt
  }
`;