import commentQueries from './commentQueries';
import messagesQueries from './messagesQueries';
import followQueries from './followQueries';
import inboxQueries from './inboxQueries';
import postQueries from './postQueries';
import searchQueries from './searchQueries';
import userQueries from './userQueries';

const apolloQueries = {
    commentQueries,
    followQueries,
    inboxQueries,
    messagesQueries,
    postQueries,
    searchQueries,
    userQueries
};

export default apolloQueries;