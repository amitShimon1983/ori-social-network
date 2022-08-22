export const getPostDate = (date: Date) => {
    let timeDiff;
    let pattern = '';
    const today = new Date();
    const difInSeconds = (today.getTime() - date.getTime()) / 1000;
    timeDiff = difInSeconds;
    pattern = ' second';
    if (difInSeconds > 60) {
        const difInMinutes = (difInSeconds) / 60;
        timeDiff = difInMinutes;
        pattern = ' minutes';
        if (difInMinutes > 60) {
            const difInHours = (difInMinutes) / 60;
            timeDiff = difInHours;
            pattern = ' hours';
            if (difInHours > 24) {
                const difInDays = (difInHours) / 24;
                timeDiff = difInDays;
                pattern = ' days';
                if (difInDays > 30) {
                    const difInMonths = (difInDays) / 24;
                    timeDiff = difInMonths;
                    pattern = ' months';
                    if (difInMonths > 12) {
                        const difInYears = (difInMonths) / 24;
                        timeDiff = difInYears;
                        pattern = ' years';

                    }
                }
            }
        }
    }
    return Math.floor(timeDiff) + pattern + ' ago';
}