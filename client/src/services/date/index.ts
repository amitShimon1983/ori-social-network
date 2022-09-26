export const getPostDate = (date: Date) => {
    let timeDiff;
    let pattern = '';
    let displayDiff = false;
    const today = new Date();
    const difInSeconds = (today.getTime() - date.getTime()) / 1000;
    timeDiff = difInSeconds;
    pattern = ' second';
    if (difInSeconds > 60) {
        const difInMinutes = (difInSeconds) / 60;
        timeDiff = difInMinutes;
        pattern = ' minute';
        if (difInMinutes > 60) {
            const difInHours = (difInMinutes) / 60;
            timeDiff = difInHours;
            pattern = ' hour';
            if (difInHours > 24) {
                const difInDays = (difInHours) / 24;
                displayDiff = true;
                timeDiff = difInDays;
                pattern = ' yesterday';
                if (difInDays > 1) {
                    return `${date.toLocaleDateString()} ${' ' + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
                }
            }
        }
    }
    const diff = Math.floor(timeDiff);
    const p = diff > 1 ? pattern + 's' : pattern
    return (displayDiff ? diff + p + ' at ' : '') + date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}