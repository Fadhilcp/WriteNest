export const API_ROUTES = {
    AUTH: {
        REGISTER: "/auth/register",
        VERIFY_REGISTER: "/auth/verify-register",
        LOGIN: "/auth/login",
        REFRESH: "/auth/refresh",
        LOGOUT: "/auth/logout",
    },
    POSTS: {
        GET_ALL: "/posts",
        CREATE: "/posts",
        GET_BY_ID: (postId: string) => `/posts/${postId}`,
        UPDATE: (postId: string) => `/posts/${postId}`,
        DELETE: (postId: string) => `/posts/${postId}`,
        PUBLISH: (postId: string) => `/posts/${postId}/publish`, 
        GET_MY_POSTS: (isPublished: boolean) => `/posts/me?published=${isPublished}`,
    },
}