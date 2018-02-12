export function getCookie(name: string): string {
    const matches: RegExpMatchArray = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string): void {
    document.cookie = `${name}=${value}`;
}
