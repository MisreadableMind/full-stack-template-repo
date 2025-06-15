import { Outlet } from 'react-router-dom';
import {
    Box,
    Container,
    AppBar,
    Toolbar,
    Typography,
    Button,
    useMediaQuery,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const navLinks = [
        { text: 'HOME', path: '/' },
        { text: 'EXAMPLES', path: '/examples' }
    ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navLinks.map((link) => (
                    <ListItem
                        key={link.text}
                        component={RouterLink}
                        to={link.path}
                        sx={{
                            textAlign: 'center',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        <ListItemText
                            primary={link.text}
                            primaryTypographyProps={{
                                fontSize: '1rem',
                                fontWeight: 'medium'
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static" sx={{ backgroundColor: '#4a90e2' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }}
                    >
                        App Template
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={handleDrawerToggle}
                                sx={{
                                    '& .MuiDrawer-paper': {
                                        boxSizing: 'border-box',
                                        width: 240,
                                        backgroundColor: '#4a90e2',
                                        color: 'white'
                                    },
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex' }}>
                            {navLinks.map((link) => (
                                <Button
                                    key={link.text}
                                    component={RouterLink}
                                    to={link.path}
                                    sx={{
                                        color: 'white',
                                        borderRadius: '20px',
                                        px: 2,
                                        mx: 0.5,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                        }
                                    }}
                                >
                                    {link.text}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1, px: { xs: 2, sm: 3 } }}>
                <Outlet />
            </Container>

            <Box
                component="footer"
                sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    textAlign: 'center',
                    borderTop: '1px solid #eaeaea'
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © App Template {new Date().getFullYear()}
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;