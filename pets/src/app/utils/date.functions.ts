import { DateTime } from 'luxon';

export const dateToSeconds = (date: null | string) => {
    return date ? DateTime.fromFormat(date, 'yyyy-MM-dd').toSeconds() :null;
}

export const dateToString = (date: null | number): null | string => {
    return date ? DateTime.fromSeconds(date).toFormat('yyyy-MM-dd') : null;
};