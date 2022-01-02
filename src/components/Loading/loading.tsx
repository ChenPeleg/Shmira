import {Box} from '@mui/material';
import {SxProps} from '@mui/system';
import {SecurityRounded, Shield, ShieldTwoTone, VerifiedUserTwoTone} from '@mui/icons-material';
import {useState} from 'react';

const loadingSx : SxProps = {
    position : 'absolute',
    top : '60px',
    left : '50px',
    height: '100px',
    width: '100px'
}
const sxShieldContainerBase  : SxProps= {
     position: 'absolute',
}
const getOpacityFromPosition  = (pos: 1| 2| 3, stage : number) : number => {
 //  const isstageForPosition
    return 0
}
const sxShieldBase : SxProps = {
 //   position: 'relative',
    height: '100px',
    width: '100px',
    color : 'green'
}
export const Loading = () => {
    const [animationStage, setAnimationStage] =  useState(5);

    setTimeout(() => {
        console.log( animationStage)
        if (animationStage < 100){
        setAnimationStage(animationStage + 3);

        }
    }, 50);

const sxShield1 : SxProps = {...sxShieldBase,
    color : '#52b90f',opacity :   animationStage  > 50 ? 0: 1
    }
const sxShield2 : SxProps = {...sxShieldBase , opacity : animationStage /100   }
    return (<Box sx={loadingSx} onClick={()=>setAnimationStage(0)}>
        <Box sx={sxShieldContainerBase} id={'shield1-container'}>

        <SecurityRounded sx={sxShield1}/>
        </Box>
        <Box id={'shield2-container'} sx={sxShieldContainerBase}>

            <VerifiedUserTwoTone sx={sxShield2}/>
        </Box>

    </Box>)
}
