export const setTokenCookie = (token:string): void => {
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/;`;
}