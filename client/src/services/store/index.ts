import { ApolloClient, from, NormalizedCacheObject, InMemoryCache, createHttpLink, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { authService } from '..';
import { appConfig } from '../../configuration';
const initialData = {
    user: {},
    isAuthenticate: false,
    loading: true
}
export const appContextVar = makeVar<{ [key: string]: any }>(initialData)
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
        const userAsString = localStorage.getItem('user');
        if (!!userAsString?.trim()) {
            const newValue = {
                user: JSON.parse(userAsString),
                isAuthenticate: true,
                loading: false
            }
            appContextVar(newValue)
        } else {
            this._tryRefresh()
        }
    }
    _tryRefresh() {
        authService.refresh((data: any) => {
            appContextVar({ user: data, isAuthenticate: true, loading: false })
        }, () => {
            appContextVar({ isAuthenticate: false, loading: false })
        });
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


