import { gql, useQuery } from '@apollo/client';
import { FunctionComponent } from 'react';
import Me from '../../me';
import PostList from '../../post/PostList';
import classes from './Wall.module.css';
interface WallProps {
    user: any;
}
const GET_My_POSTS = gql`
query GetMyPosts{
    getMyPosts{
        posts{
            _id
            user
            title
            createdAt
            file {
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
const Wall: FunctionComponent<WallProps> = ({ user }) => {
    const { data, error, loading } = useQuery(GET_My_POSTS)
    return (<>
        <Me styles={{ imageClass: classes.image }} user={user} />
        <div className={classes.container}>
            {!loading && <PostList posts={data?.getMyPosts?.posts} postClassName={classes.post} />}
        </div>
    </>
    );
}

export default Wall;