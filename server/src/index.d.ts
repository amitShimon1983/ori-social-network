import { PubSub } from "graphql-subscriptions";

declare global {
    namespace Express {
        interface Request {
            pubSub: PubSub
        }
    }
}