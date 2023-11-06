import React from "react"
import { AppBar, Box, CssBaseline, Toolbar, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function SideBar() {
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

    const drawerWidth = 300;
    return (
        <Box>


            <Box sx={{ display: "flex" }} >
                <CssBaseline />
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
                                style={{ width: "70px", height: "auto", margin: "5px" }}
                                alt="logo"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW5LAvOq3edlBl2EfC9yZosEEp4TZ_KP2xqNHaQOoQZg&s">
                            </img>
                            <Typography sx={styles.logoText} variant="h5">
                                E-Hemşire
                            </Typography>
                        </Box>
                    </Toolbar>
                    <Divider />
                    <List>
                        {[{ text: "Ana Sayfa", icon: <HomeIcon /> },
                        { text: "Çalişma Takvimim", icon: <CalendarMonthIcon /> },
                        { text: "Profil", icon: <PersonIcon /> },
                        { text: "Çıkış Yap", icon: <ExitToAppIcon /> },].map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
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