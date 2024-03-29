export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const isOverflow = (element: any) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

export const addMinutes = (minutes: number) => {
    return new Date(new Date().getTime() + (minutes * 60000));
}