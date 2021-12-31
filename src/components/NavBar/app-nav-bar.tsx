import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {translations} from '../../services/translations';
import {useDispatch, useSelector} from 'react-redux';
import {Select, SelectChangeEvent} from '@mui/material';
import {Edit} from '@mui/icons-material';
import {ProfileMenu} from './profile-menu';
import {ActionsTypes} from '../../store/types.actions';
import {ShmiraListMenu} from './shmiraList-menu';
import {ShmiraListActionType} from '../../models/ShmiraListMenuClickActionType.enum';
import {ProfileMenuClickActionType} from '../../models/profile-menu-click-action-type.enum';
import {Utils} from '../../services/utils';
import {FileUploadType, ShmiraListRecord, ShmiraListStore} from '../../store/store.types';
import {FileUploadDialog} from '../Dialogs/file-uplaod-dialog';
import {OrderImportDialog} from '../Dialogs/orders-import-dialog';
import {ToggleButtons} from '../buttons/toggle-button-group';
import {RenameDialog} from '../Dialogs/rename-dialog';
import {ShmiraListManagementDialog} from '../Dialogs/shmira-list-management-dialog';


export const AppNavBar = () => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [RenameOpen, setRenameOpen] = React.useState(false);
    const [UploadOpen, setUploadOpen] = React.useState(false);
    const [ManageShmiraListimOpen, setManageShmiraListimOpen] = React.useState(false);
    const [importOrdersOpen, setImportOrdersOpen] = React.useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    const [shmiraListMoreAnchorEl, setShmiraListMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const shmiraListId = useSelector((state: ShmiraListStore) => state.shmiraListId);
    const shmiraListCollection = useSelector((state: ShmiraListStore) => state.shmiraListCollection);
    const shmiraListSelected = shmiraListCollection.find((shmiraListRecord: ShmiraListRecord) => shmiraListRecord.id === shmiraListId);
    const nextShmiraListId = Utils.getNextId(shmiraListCollection.map(c => c.id));

    const shmiraListName = shmiraListSelected?.Name || '';


    const isProfileMenuOpen = Boolean(anchorEl);
    const isShmiraListMenuOpen = Boolean(shmiraListMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRenameClose = (value: string | null) => {
        setRenameOpen(false);
        const id = shmiraListId;
        if (value) {
            dispatch({
                type: ActionsTypes.RENAME_SIDUR,
                payload: {
                    value,
                    id
                }
            })
        }
    };
    const handleUploadClose = (result: { uploadType: FileUploadType, fileAsString: string } | null): void => {
        setUploadOpen(false);
        if (result) {
            dispatch({
                type: ActionsTypes.IMPORT_FILE_UPLOADED,
                payload: {...result}
            })
        }
    };
    const handleShmiraListMenuClick = (event: React.MouseEvent<HTMLElement>, clickAction: ShmiraListActionType) => {

        switch (clickAction) {

            case ShmiraListActionType.CreateCopy:
                dispatch({
                    type: ActionsTypes.CLONE_SIDUR,
                    payload: {id: shmiraListId}
                })
                break;
            case ShmiraListActionType.Archive:
                dispatch({
                    type: ActionsTypes.ARCHIVE_SIDUR,
                    payload: {id: shmiraListId}
                })
                break;
            case ShmiraListActionType.Delete:
                dispatch({
                    type: ActionsTypes.DELETE_SIDUR,
                    payload: {id: shmiraListId}
                })
                break;
            case ShmiraListActionType.Rename:
                setRenameOpen(true);
                break;
            case ShmiraListActionType.ManageShmiraListim:
                setManageShmiraListimOpen(true);
                break;
            case ShmiraListActionType.ImportOrders:
                setImportOrdersOpen(true);
                break;

            default:
        }
        handleShmiraListMenuClose()
    };
    const handleShmiraListMenuClose = () => {
        setShmiraListMoreAnchorEl(null);
    };

    const handleProfileMenuClose = (result: any, action?: ProfileMenuClickActionType) => {
        setAnchorEl(null);
        switch (action) {
            case ProfileMenuClickActionType.MyProfile:
                dispatch({
                    type: ActionsTypes.OPEN_MY_PROFILE,
                    payload: null
                })
                break;
            case ProfileMenuClickActionType.Export:
                dispatch({
                    type: ActionsTypes.EXPORT_ALL,
                    payload: null
                })
                break;
            case ProfileMenuClickActionType.Import:
                setUploadOpen(true)
                break;
            case null:
            case undefined:
                break;
            default:
        }
        handleShmiraListMenuClose();
    };

    const handleShmiraListMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setShmiraListMoreAnchorEl(event.currentTarget);
    };
    const handleShmiraListChanged = (event: any, child: React.ReactNode) => {

        const chosenShmiraList = event.target.value as string;
        if (chosenShmiraList === 'NEW') {
            dispatch({
                type: ActionsTypes.ADD_NEW_SIDUR,
                payload: null
            });
        } else {
            dispatch({
                type: ActionsTypes.CHOOSE_SIDUR,
                payload: {id: chosenShmiraList}
            })
        }


    }
    const menuId = 'primary-search-account-menu';
    const shmiraListMenuId = 'primary-search-account-menu-mobile';
    return (
        <Box dir="rtl"
        >
            <AppBar position="static" sx={{
                mr: 0,
                ml: 0,
                'div.MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular': {
                    margin: 0
                }
            }}>
                <Toolbar sx={{
                    mr: 0,
                    ml: 0
                }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 0}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'block'
                            }
                        }}
                    >    &nbsp; &nbsp;
                        {translations.ShmiraList}
                        <Select dir={'rtl'} disableUnderline={true} variant={'standard'} value={shmiraListId}
                                sx={{
                                    color: 'white',
                                    fontSize: '1.25rem',
                                    fontWeight: 'normal'
                                }}
                                onChange={(event: SelectChangeEvent<any>, child: React.ReactNode) => {
                                    handleShmiraListChanged(event, child)
                                }}>
                            <MenuItem key={'NEW'}
                                      value={'NEW'}> &nbsp;&nbsp;<b>{translations.NewShmiraList}</b> &nbsp;&nbsp;</MenuItem>
                            {shmiraListCollection.map((shmiraListRecord: ShmiraListRecord) => <MenuItem key={shmiraListRecord.id}
                                                                                         value={shmiraListRecord.id}> &nbsp;&nbsp;{shmiraListRecord.Name} &nbsp;&nbsp;</MenuItem>)}
                        </Select>
                    </Typography>
                    <IconButton
                        size="small"
                        aria-label="show more"
                        aria-controls={shmiraListMenuId}
                        aria-haspopup="true"
                        onClick={handleShmiraListMenuOpen}
                        color="inherit"
                    >
                        <Edit/>
                    </IconButton>
                    <Box sx={{
                        width: '20px',
                        height: '5px'
                    }}/>
                    <ToggleButtons/>

                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{
                        display: {
                            xs: 'none',
                            md: 'flex'
                        }
                    }}>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: {
                            xs: 'flex',
                            md: 'none'
                        }
                    }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={shmiraListMenuId}
                            aria-haspopup="true"
                            onClick={handleShmiraListMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <ShmiraListMenu shmiraListMoreAnchorEl={shmiraListMoreAnchorEl} shmiraListMenuId={shmiraListMenuId} isShmiraListMenuOpen={isShmiraListMenuOpen}
                       handleShmiraListMenuClick={handleShmiraListMenuClick} handleShmiraListMenuClose={handleShmiraListMenuClose}/>
            <ProfileMenu menuId={menuId} anchorEl={anchorEl} handleMenuClose={handleProfileMenuClose} isMenuOpen={isProfileMenuOpen}/>
            <RenameDialog open={RenameOpen} onClose={handleRenameClose} selectedValue={shmiraListName}/>
            <FileUploadDialog open={UploadOpen} onClose={handleUploadClose} selectedValue={''}/>
            <ShmiraListManagementDialog open={ManageShmiraListimOpen} onClose={() => {
                setManageShmiraListimOpen(false)
            }}/>
            <OrderImportDialog open={importOrdersOpen} onClose={() => {
                setImportOrdersOpen(false)
            }}/>

        </Box>
    );
}
