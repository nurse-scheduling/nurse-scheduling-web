import React, {useContext} from "react"
import {
    Box,
    CssBaseline,
    Toolbar,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListIcon from '@mui/icons-material/List';
import {useNavigate} from 'react-router-dom';
import UserContext from "../contexts/userContext";

function SideBar() {
    const {setAuthenticated} = useContext(UserContext);
    const styles = {
        logo: {
            display: "flex",
            flex: 1,
            margin: "5px"
        },
        logoText: {
            alignSelf: "center",
            fontFamily: "Kanit",
            marginLeft: "10px"
        }
    }
    const navigate = useNavigate();

    const drawerWidth = 300;
    return (
        <Box>


            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Toolbar>
                        <Box sx={styles.logo}>
                            <img
                                style={{width: "70px", height: "auto", margin: "5px"}}
                                alt="logo"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW5LAvOq3edlBl2EfC9yZosEEp4TZ_KP2xqNHaQOoQZg&s">
                            </img>
                            <Typography sx={styles.logoText} variant="h5">
                                E-Hemşire
                            </Typography>
                        </Box>
                    </Toolbar>
                    <Divider/>
                    <List>
                        {[{
                            text: "Ana Sayfa", icon: <HomeIcon/>, onClick: () => {
                                navigate("/dashboard")
                            }
                        },
                            {
                                text: "Çalişma Takvimim", icon: <CalendarMonthIcon/>, onClick: () => {
                                    navigate("/dashboard")
                                }
                            },
                            {
                                text: "Profil", icon: <PersonIcon/>, onClick: () => {
                                    navigate("/profile")
                                }
                            },
                            {
                                text: "İzin İstekleri", icon: <ListIcon/>, onClick: () => {
                                    navigate("/off-day-requests")
                                }
                            },
                            {
                                text: "Çıkış Yap", icon: <ExitToAppIcon/>, onClick: () => {
                                    setAuthenticated(false);
                                    navigate("/login")
                                }
                            },].map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={item.onClick}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </Box>
    )
}

export default SideBar;
