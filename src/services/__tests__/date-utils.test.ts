import React from 'react';
import {Utils} from "../utils";



describe("date utils ",()=>{
    it('turns date to time stamp correctly', ()=>{


        const dateStamp1 = Utils.Date.dateToDateStamp(new Date(2022,1,13));
        const dateStamp2 = Utils.Date.dateToDateStamp(new Date(2020,12,31));
        const dateStamp3 = Utils.Date.dateToDateStamp(new Date(1999,7,22));
        expect(dateStamp1).toBe('44603');
        expect(dateStamp2).toBe('44225');
        expect(dateStamp3).toBe('36392');
    })
})
