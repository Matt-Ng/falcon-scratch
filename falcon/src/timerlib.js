import dayjs from 'dayjs'

export function getRemainingTime(timeMS) {
    const time = dayjs(timeMS+60000*5);
    const cur = dayjs();

    if(time.isBefore(cur)) {
        return {
            seconds : '00',
            minutes : '00'
        }
    }
    return {
        seconds : getRemainingSec(cur,time),
        minutes : getRemainingMin(cur,time)
    }
}

function getRemainingSec (cur, time) {
    const sec = time.diff(cur, 'seconds') % 60;
    return sec;
}

function getRemainingMin (cur, time) {
    const min = time.diff(cur, 'minutes') % 60;
    return min;
}