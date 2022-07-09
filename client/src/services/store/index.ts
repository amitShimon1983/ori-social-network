import { ApolloClient, from, NormalizedCacheObject, InMemoryCache, createHttpLink, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { appConfig } from '../../configuration';
const initialData = {
    user: {},
    isAuthenticate: false
}
export const appContextVar = makeVar<{ [key: string]: any }>({
    ...initialData,
    loading: true,
})
class ApolloProvider {
    client?: ApolloClient<NormalizedCacheObject>;
    static instance: ApolloProvider;

    constructor() {
        this._initializeApolloClient();
    }
    static getInstance() {
        if (!ApolloProvider.instance) {
            ApolloProvider.instance = new ApolloProvider();
        }
        return ApolloProvider.instance;
    }
    _initializeApolloClient() {
        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            link: this._createApolloLinks()
        });
        this._getUser();
    }
    _getUser() {
        let newValue: { [key: string]: any } = { isAuthenticate: false, loading: false };
        const userAsString = localStorage.getItem('user');
        if (!!userAsString?.trim()) {
            newValue = {
                user: JSON.parse(userAsString),
                isAuthenticate: true,
                loading: false
            }
        }
        appContextVar(newValue)
    }
    _createApolloLinks() {
        const httpLink = this._createHttpLink();
        const authLink = this._createAuthMiddleware();
        const errorLink = this._createErrorMiddleware()
        return from([errorLink, authLink, httpLink])
    }
    _createHttpLink() {
        return createHttpLink({
            uri: `${appConfig.serverUrl}/api/graphql`,
            credentials: 'include'
        })
    }
    _createAuthMiddleware() {
        return setContext((_, { headers }) => {
            return {
                headers: { ...headers },
            }
        })
    }
    _createErrorMiddleware() {
        return onError(({
            graphQLErrors,
            networkError,
            response,
            operation,
            forward
        }) => {
            if (graphQLErrors?.find(({ extensions }) => {
                if (extensions.code === 'UNAUTHENTICATED') {
                    return true;
                }
            })) {
                this._resetUser()
            }

            forward(operation)
        })
    }

    _resetUser() {
        localStorage.setItem('user', '');
        appContextVar(initialData);
    }

}
export default ApolloProvider.getInstance();


