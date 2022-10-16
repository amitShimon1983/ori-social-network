import { gql } from '@apollo/client';

export const CORE_FILE_FIELDS = gql`

fragment CoreFileFields on File {
   _id
   originalname
   encoding
   mimetype
   filename
   path
   size
}
`;