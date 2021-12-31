import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {LanguageUtilities} from '../../services/language-utilities';
import {SketchEditActionEnum} from '../../models/SketchEditAction.enum';
import {Icons} from '../Icons/icons';


interface PendingPreferenceMenuProps {
    PendingPreferenceMenuAnchor: Element | ((element: Element) => Element) | null | undefined;
    PendingPreferenceMenuId: string,
    isPendingPreferenceMenuOpen: boolean,
    handlePendingPreferenceMenuClick: (event: React.MouseEvent<HTMLElement>, action: SketchEditActionEnum) => void
    handlePendingPreferenceMenuClose: () => void
}

export const PendingPreferenceMenu = (props: PendingPreferenceMenuProps) => {
    const {
        PendingPreferenceMenuAnchor,
        PendingPreferenceMenuId,
        isPendingPreferenceMenuOpen,
        handlePendingPreferenceMenuClick,
        handlePendingPreferenceMenuClose
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
            {pendingPreferencesActions.map((item, i: number) => <MenuItem key={i} onClick={(e) => handlePendingPreferenceMenuClick(e, item.action)}>
                {Icons[item.icon] as React.ReactElement} &nbsp;
                {item.name}
            </MenuItem>)}


        </Menu>
    );


}
