import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { dedupExchange, makeOperation } from "urql";
import {
  GetTweetsDocument,
  GetTweetsQuery,
  RefreshTokenDocument,
} from "../generated/graphql";
import { isExpired } from "./isExpired";
import { isServer } from "./isServer";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "https://twitterapi.arsaiz.xyz/graphql/",
  // url: "http://localhost:8000/graphql/",
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            const key = "Query";
            cache
              .inspectFields(key)
              .forEach((field) => cache.invalidate(key, field.fieldKey));
          },
          logout: (_result, args, cache, info) => {
            const key = "Query";
            cache
              .inspectFields(key)
              .forEach((field) => cache.invalidate(key, field.fieldKey));
          },
          register: (_result, args, cache, info) => {
            const key = "Query";
            cache
              .inspectFields(key)
              .forEach((field) => cache.invalidate(key, field.fieldKey));
          },
          deleteTweet: (_result, args, cache, info) => {
            const key = "Query";
            cache
              .inspectFields(key)
              .filter(
                (field) =>
                  field.fieldName === "tweets" || field.fieldName === "tweet"
              )
              .forEach((field) => {
                cache.invalidate(key, field.fieldKey);
              });
          },
          postTweet: (_result, args, cache, info) => {
            const key = "Query";
            if (args?.commentTo) {
              cache
                .inspectFields(key)
                .filter(
                  (field) =>
                    field.fieldName === "tweets" &&
                    field.arguments?.commentToPk === args?.commentTo
                )
                .forEach((field) => {
                  cache.invalidate(key, field.fieldKey);
                });
            } else {
              const tweets = [];
              const caches = cache
                .inspectFields(key)
                .filter((field) => field.fieldName === "tweets");
              caches.forEach((field) => {
                cache.invalidate(key, field.fieldKey);
              });
            }
          },
          follow: (_result, args, cache, info) => {
            const key = "Query";

            if (!(_result as any)?.follow?.success) {
              return;
            }
            cache
              .inspectFields(key)
              .filter(
                (field) =>
                  field.fieldName === "user" ||
                  field.fieldName === "followers" ||
                  field.fieldName === "following" ||
                  field.fieldName === "tweets" ||
                  field.fieldName === "unfollowed"
              )
              .forEach((field) => cache.invalidate(key, field.fieldKey));
          },

          refetch: (_result, args, cache, info) => {
            const key = "Query";
            const data = JSON.parse((args?.data as string) || "");
            console.log(data);
            cache
              .inspectFields(key)
              .filter((field) => {
                const yes =
                  field.fieldName === data?.query &&
                  field?.arguments?.id === data?.id;
                console.log(yes);
                return yes;
              })
              .forEach((field) => cache.invalidate(key, field.fieldKey));
          },
          likeTweet: (_result, args, cache, info) => {
            const tweetId = info.variables.tweetId as number;
            const isLiked = (info as any).parent.likeTweet.isLiked;
            const increment = isLiked ? 1 : -1;
            // cache.updateQuery({query: GetTweetsDocument}, data => {
            //   const newData = {...data, edges: (data?.edges as any[])?.map(edge => edge.node.pk === tweetId ? {...edge, node: {...edge.node, isLiked, likesCount: isLiked ? edge.node.likesCount + 1 : edge.node.likesCount - 1}} : edge) || []}
            //   return newData as any
            // })
            const key = "Query";
            cache
              .inspectFields(key)
              .filter((field) => field.fieldName === "tweets")
              .forEach((field) => {
                const qInput = {
                  query: GetTweetsDocument,
                  variables: field.arguments,
                };
                const data = cache.readQuery(qInput) as GetTweetsQuery;
                const likeEdge = data.tweets?.edges?.find(
                  (edge) => edge?.node?.pk === tweetId
                );
                if (likeEdge) {
                  cache.updateQuery(qInput, (data: GetTweetsQuery | null) => {
                    if (data) {
                      const newData = { ...data };
                      newData.tweets?.edges?.forEach((edge) => {
                        if (edge?.node?.pk === tweetId) {
                          edge.node.isLiked = isLiked;
                          edge.node.likesCount! += increment;
                        }
                      });
                      return newData as any;
                    }
                    return data as any;
                  });
                }
              });
          },
        },
      },
    }),
    ssrExchange,
    authExchange({
      addAuthToOperation: ({ authState, operation }) => {
        // the token isn't in the auth state, return the operation without changes
        if (!authState || !(authState as any).token) {
          return operation;
        }

        // fetchOptions can be a function (See Client API) but you can simplify this based on usage
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `JWT ${(authState as any).token}`,
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (isServer()) return false;
        const token = localStorage.getItem("token");
        if (!token) return false;
        if (!authState) return true;
        return isExpired(token);
      },
      getAuth: async ({ authState, mutate }) => {
        if (!isServer()) {
          let token = localStorage.getItem("token");
          let refreshToken = localStorage.getItem("refreshToken");
          if (token && isExpired(token)) {
            const result = await mutate(RefreshTokenDocument, {
              refreshToken: refreshToken,
            });
            if (result?.data?.refreshToken?.success) {
              token = result.data.refreshToken.token;
              refreshToken = result.data.refreshToken.refreshToken;
              localStorage.setItem("token", token as string);
              localStorage.setItem("refreshToken", refreshToken as string);
              return { token, refreshToken };
            }
          }
          if (!authState) {
            if (token && refreshToken) {
              return { token, refreshToken };
            } else {
              return null;
            }
          }
        }
        return null;
      },
    }),
    multipartFetchExchange,
  ],
});
