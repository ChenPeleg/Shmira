import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {LanguageUtilities} from '../../services/language-utilities';
import {SketchEditActionEnum} from '../../models/SketchEditAction.enum';


interface PendingPreferenceMenuProps {
    PendingPreferenceMenuAnchor: Element | ((element: Element) => Element) | null | undefined;
    PendingPreferenceMenuId: string,
    isPendingPreferenceMenuOpen: boolean,
    handlePendingPreferenceMenuClick: (event: React.MouseEvent<HTMLElement>, date: string) => void
    handlePendingPreferenceMenuClose: () => void,
    dates: { timeStamp: string, name: string }[]
}

export const PendingPreferenceMenu = (props: PendingPreferenceMenuProps) => {
    const {
        PendingPreferenceMenuAnchor,
        PendingPreferenceMenuId,
        isPendingPreferenceMenuOpen,
        handlePendingPreferenceMenuClick,
        handlePendingPreferenceMenuClose,
        dates
    } = props;

    let pendingPreferencesActions: { action: SketchEditActionEnum, name: string, icon: string } [] = LanguageUtilities.buildSketchEditActionsArray();

    return (
        <Menu
            anchorEl={PendingPreferenceMenuAnchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={PendingPreferenceMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isPendingPreferenceMenuOpen}
            onClose={handlePendingPreferenceMenuClose}
        >
         
            {dates.map((date: { timeStamp: string, name: string }, i: number) => <MenuItem key={i}
                                                                                           onClick={(e) => handlePendingPreferenceMenuClick(e, date.timeStamp)}>

                {date.name}
            </MenuItem>)}


        </Menu>
    );


}
