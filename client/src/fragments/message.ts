import { gql } from '@apollo/client';
import { CORE_USER_FIELDS } from './user';

export const CORE_MESSAGE_FIELDS = gql`
  ${CORE_USER_FIELDS}
  fragment CoreMessageFields on Message {
    isRead
    _id
    type
    messageThreadId
    file {
      _id
      originalname
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