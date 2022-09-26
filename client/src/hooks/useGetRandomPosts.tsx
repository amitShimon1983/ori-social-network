import { gql, useQuery } from "@apollo/client";

const GET_RANDOM_POSTS = gql`
 query GetRandomPosts{
     getRandomPosts{
         posts{
             _id
             title
             createdAt
             user {
                _id
                name
                email
                lastSeen
                file {
                    _id
                  originalname
                }        
             }
             file {
                _id
                 originalname
                 encoding
                 mimetype
                 filename
                 path
                 size
             }
         }
     }
 }
 `
export const useGetRandomPosts = () => {
    const { data, error, loading } = useQuery(GET_RANDOM_POSTS)
    return { data, error, loading };
}
