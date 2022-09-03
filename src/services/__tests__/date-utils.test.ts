import React from 'react';
import {Utils} from "../utils";


describe("date utils ", () => {
    it('turns date to time stamp correctly', () => {


        const dateStamp1 = Utils.Date.dateToDateStamp(new Date(2022, 1, 13));
        const dateStamp2 = Utils.Date.dateToDateStamp(new Date(2020, 12, 31));
        const dateStamp3 = Utils.Date.dateToDateStamp(new Date(1999, 7, 22));
        expect(dateStamp1).toBe('44603');
        expect(dateStamp2).toBe('44225');
        expect(dateStamp3).toBe('36392');
    })
    it('converts time-stamp correctly dateStampToDate ', () => {

        const dateStamp1 = Utils.Date.dateStampToDate('44603');
        const dateStamp2 = Utils.Date.dateStampToDate('44225');
        const dateStamp3 = Utils.Date.dateStampToDate('36392');
        expect(dateStamp1).toEqual(new Date(2022, 1, 13));
        expect(dateStamp2).toEqual(new Date(2020, 12, 31));
        expect(dateStamp3).toEqual(new Date(1999, 7, 22));
    })
    it('converts  DateStamp  to simple Date last', () => {

        const res1 = Utils.Date.simpleDateFromDateStamp('44603');
        const res2 = Utils.Date.simpleDateFromDateStamp('43649');
        console.log('converts  DateStamp  to simple Date ', res1, res2)
        expect(res1).toBe('13.2')
        expect(res2).toBe('5.7')
    })
    it('converts   time-stamp to get Week Day Number correctly ', () => {

        const res1 = Utils.Date.getWeekDayNumberFromTimeStamps(['44673']);
        const res2 = Utils.Date.getWeekDayNumberFromTimeStamps(['43649']);
        console.log('getDatOfWeekTextFromTimeStamp', res1[0], res2[0])
        expect(res1[0].dayNumber).toBe(1)
        expect(res2[0].dayNumber).toBe(6)

    })

})
