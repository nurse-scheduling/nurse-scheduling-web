import React, { useContext } from "react";
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
    AppBar,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListIcon from "@mui/icons-material/List";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/userContext";
import { Menu } from "@mui/icons-material";
const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

function SideBar(props: Props) {
    const { setAuthenticated } = useContext(UserContext);
    const styles = {
        logo: {
            display: "flex",
            flex: 1,
            margin: "5px",
        },
        logoText: {
            alignSelf: "center",
            fontFamily: "Kanit",
            marginLeft: "10px",
        },
    };
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box>
            <Toolbar>
                <Box sx={styles.logo}>
                    <img
                        style={{ width: "60px", height: "auto", margin: "5px" }}
                        alt="logo"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW5LAvOq3edlBl2EfC9yZosEEp4TZ_KP2xqNHaQOoQZg&s"
                    ></img>
                    <Typography sx={styles.logoText} variant="h6">
                        E-Hemşire
                    </Typography>
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {[{
                    text: "Ana Sayfa", icon: <HomeIcon />, onClick: () => {
                        navigate("/dashboard")
                    }
                },
                    {
                        text: "Çalişma Takvimi", icon: <CalendarMonthIcon />, onClick: () => {
                            navigate("/dashboard")
                        }
                    },
                    {
                        text: "Profil", icon: <PersonIcon />, onClick: () => {
                            navigate("/profile")
                        }
                    },
                    {
                        text: "İzin İstekleri", icon: <ListIcon />, onClick: () => {
                            navigate("/off-day-requests")
                        }
                    },
                    {
                        text: "Vardiya Değişimi", icon: <ListIcon />, onClick: () => {
                            navigate("/change-shifts")
                        }
                    },
                    {
                        text: "Çıkış Yap", icon: <ExitToAppIcon />, onClick: () => {
                            setAuthenticated(false);
                            navigate("/login")
                        }
                    },].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {(isMobile) && (
                <AppBar position="fixed" color={'default'}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            )}
            <Box
                component="nav"
                sx={{
                    width: { sm: isMobile ? 0 : drawerWidth },
                    flexShrink: { sm: 0 },
                }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block'},
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'none',md: 'block'},
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default SideBar;
