export const isExpired = (token: string) => {
    const { exp } = JSON.parse(window.atob(token.split(".")[1])) as {exp: number};
    return Date.now() >= exp * 1000;
}