export function getFetchInitProps(body?: any): RequestInit {
    const res: RequestInit = {
        body: undefined,
        credentials: "include",
        headers: new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
        }),
        method: "POST",
        mode: "same-origin",
    };

    if (body) {
        res.body = body;
    }

    return res;
}

export function cutLabel(label: string, length: number): string {
    if (label && label.length > length) {
        label = label.substr(0, length);
        label += "...";
    }
    return label;
}
