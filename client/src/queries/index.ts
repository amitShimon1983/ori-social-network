import appMetadataQueries from './appMetadataQueries';
import commentQueries from './commentQueries';
import messagesQueries from './messagesQueries';
import followQueries from './followQueries';
import inboxQueries from './inboxQueries';
import postQueries from './postQueries';
import searchQueries from './searchQueries';
import userQueries from './userQueries';
import liveQueries from './liveQueries';

const apolloQueries = {
    appMetadataQueries,
    commentQueries,
    followQueries,
    inboxQueries,
    messagesQueries,
    postQueries,
    searchQueries,
    userQueries,
    liveQueries
};

export default apolloQueries;