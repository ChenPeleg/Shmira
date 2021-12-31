import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import {Archive, Delete, DriveFileRenameOutline, FileCopy, ImportContacts, ListAlt} from '@mui/icons-material';
import {translations} from '../../services/translations';
import {ShmiraListActionType} from '../../models/ShmiraListMenuClickActionType.enum';


interface shmiraListMenuProps {
    shmiraListMoreAnchorEl: Element | ((element: Element) => Element) | null | undefined;
    shmiraListMenuId: string,
    isShmiraListMenuOpen: boolean,
    handleShmiraListMenuClick: (event: React.MouseEvent<HTMLElement>, clickAction: ShmiraListActionType) => void
    handleShmiraListMenuClose: () => void
}

export const ShmiraListMenu = (props: shmiraListMenuProps) => {
    const {
        shmiraListMoreAnchorEl,
        shmiraListMenuId,
        isShmiraListMenuOpen,
        handleShmiraListMenuClick,
        handleShmiraListMenuClose
    } = props;
    return (
        <Menu
            anchorEl={shmiraListMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={shmiraListMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isShmiraListMenuOpen}
            onClose={handleShmiraListMenuClose}
        >

            <MenuItem onClick={(e) => handleShmiraListMenuClick(e, ShmiraListActionType.Rename)}>

                <DriveFileRenameOutline/>&nbsp;
                {translations.Rename}
            </MenuItem>
            <MenuItem onClick={(e) => handleShmiraListMenuClick(e, ShmiraListActionType.Delete)}>

                <Delete/>&nbsp;
                {translations.Delete}
            </MenuItem>
            <MenuItem onClick={(e) => handleShmiraListMenuClick(e, ShmiraListActionType.CreateCopy)}>

                <FileCopy/>&nbsp;
                {translations.CreateCopy}
            </MenuItem>
            <MenuItem onClick={(e) => handleShmiraListMenuClick(e, ShmiraListActionType.Archive)}>
                <Archive/> &nbsp;
                {translations.Archive}
            </MenuItem>
            <MenuItem onClick={(e) => handleShmiraListMenuClick(e, ShmiraListActionType.ImportOrders)}>

                <ImportContacts/>&nbsp;
                {translations.ImportOrders}
            </MenuItem>
            <MenuItem onClick={(e) => handleShmiraListMenuClick(e, ShmiraListActionType.ManageShmiraListim)}>

                <ListAlt/>&nbsp;
                {translations.ManageAllSidrurim}
            </MenuItem>
        </Menu>
    );


}
