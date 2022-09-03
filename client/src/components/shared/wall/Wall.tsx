import { gql, useQuery } from '@apollo/client';
import { FunctionComponent, useEffect, useState } from 'react';
import useFollow from '../../../hooks/useFollow';
import { appContextVar } from '../../../services/store';
import Me from '../../me';
import PostList from '../../post/PostList';
import classes from './Wall.module.css';
interface WallProps {
    user: any;
}
const GET_My_POSTS = gql`
query GetMyPosts($userId: String){
    getMyPosts(args:{ userId: $userId }){
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
    const [userState, setUserState] = useState<any>();
    useEffect(() => {
        setUserState(user)
    }, [user])

    const { data, loading } = useQuery(GET_My_POSTS, { variables: { userId: user._id } })
    const { user: me } = appContextVar();
    const { followMutation } = useFollow()
    const isMe = me._id === user._id

    const isFollowedByMe = !!me?.following?.find((follower: any) => {
        console.log({ isMe, follower, me: user._id });
        return follower === user._id
    });

    console.log({ isFollowedByMe });
    const handleFollow = async () => {
        followMutation({
            variables: {
                userId: user._id
            }
        })
        appContextVar({
            ...me,
            following: [...me.following, user._id]
        });
    }
    return (<>
        <Me styles={{ imageClass: classes.image }} user={user} />
        <div className={`${classes.following_container}`}>
            <div className={`${classes.following}`}>
                followers {user?.followers?.length || 0}
            </div>
            <div className={`${classes.following}`}>
                following {user?.following?.length || 0}
            </div>
        </div>
        {!isMe && !isFollowedByMe &&
            <div onClick={handleFollow} className={`${classes.following_link}`}>Follow me...</div>}
        <div className={classes.container}>
            {!loading && <PostList posts={data?.getMyPosts?.posts} styles={{ postContainerClassName: classes.post }} />}
        </div>
    </>
    );
}

export default Wall;