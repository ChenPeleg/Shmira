import {Box} from '@mui/material';
import {SxProps} from '@mui/system';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ActionsTypes} from '../../store/types.actions';


const sxShieldContainerBase: SxProps = {
    position: 'absolute',
}
const getOpacityFromPosition = (pos: 1 | 2 | 3, stage: number): number => {
    //  const isstageForPosition
    return 0
}
const sxShieldBase: SxProps = {
    //   position: 'relative',
    height: '100px',
    width: '100px',
    color: 'green'
}
export const LoadingShield = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const inter: any = setInterval(() => {
            dispatch({
                type: ActionsTypes.STOP_LOADING_ANIMATION,
                payload: null

            })
        }, 2000);
        return () => {
            clearInterval(inter)
        }
    }, [])


    return (<Box>


            <svg id="svg-container " viewBox="0 0 24 24" className="svg-componenet-shadow">
                <path className="path2" fill="transparent" stroke="grey" stroke-width="2"
                      d="M 12 3 L 3 5 v 6 c 0 5.55 3.84 10.74 9 12 c 5.16 -1.26 9 -6.45 9 -12 V 5 l -9 -2 z"/>
                <path id="svg-animated-path" className="finish-animation" fill="transparent" stroke="black"
                      stroke-width="1"
                      d="M 12 3 L 3 5 v 6 c 0 5.55 3.84 10.74 9 12 c 5.16 -1.26 9 -6.45 9 -12 V 5 l -9 -2 z"/>

            </svg>


        </Box>
    )
}
