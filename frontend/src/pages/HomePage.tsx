import { useState } from 'react';
import {
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Box,
    useTheme,
    useMediaQuery,
    TextField,
    Button,
    Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { exampleService } from '../api/exampleService';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import { alpha } from '@mui/material/styles';

const HomePage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [quickSearch, setQuickSearch] = useState('');

    // Get health status
    const { data: healthData } = useQuery({
        queryKey: ['health'],
        queryFn: exampleService.healthCheck,
    });

    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (quickSearch.trim()) {
            navigate(`/examples?search=${encodeURIComponent(quickSearch.trim())}`);
        }
    };

    const features = [
        {
            icon: <DashboardIcon sx={{ fontSize: 40, color: '#4a90e2' }} />,
            title: 'Modern Dashboard',
            description: 'Clean and responsive interface built with Material-UI and React'
        },
        {
            icon: <CodeIcon sx={{ fontSize: 40, color: '#4a90e2' }} />,
            title: 'TypeScript Ready',
            description: 'Full TypeScript support for better development experience'
        },
        {
            icon: <SearchIcon sx={{ fontSize: 40, color: '#4a90e2' }} />,
            title: 'Advanced Search',
            description: 'Powerful search and filtering capabilities'
        }
    ];

    return (
        <Container maxWidth="lg">
            {/* Hero Section */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 6 },
                    mb: 4,
                    textAlign: 'center',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        fontWeight: 500,
                        mb: 2
                    }}
                >
                    Welcome to App Template
                </Typography>
                <Typography
                    variant="h5"
                    color="text.secondary"
                    paragraph
                    sx={{
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                        maxWidth: '800px',
                        margin: '0 auto',
                        mb: 4
                    }}
                >
                    A modern React + NestJS template with TypeScript, Material-UI, and best practices
                </Typography>

                {/* Quick Search */}
                <Box
                    component="form"
                    onSubmit={handleQuickSearch}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        maxWidth: '600px',
                        mx: 'auto'
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search examples..."
                        value={quickSearch}
                        onChange={(e) => setQuickSearch(e.target.value)}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '30px',
                                backgroundColor: 'white',
                            }
                        }}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size={isMobile ? "small" : "medium"}
                        disabled={!quickSearch.trim()}
                        sx={{
                            borderRadius: '30px',
                            px: 3,
                            py: isMobile ? 1 : 1.5,
                            backgroundColor: '#4a90e2',
                            '&:hover': {
                                backgroundColor: alpha('#4a90e2', 0.8),
                            },
                            minWidth: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        Search
                    </Button>
                </Box>
            </Paper>

            {/* Features Section */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                boxShadow: 'none',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                <Box sx={{ mb: 2 }}>
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    gutterBottom
                                    sx={{ fontWeight: 500 }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Status Section */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: 'white'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InfoIcon sx={{ mr: 1, color: '#4a90e2' }} />
                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 500 }}
                    >
                        System Status
                    </Typography>
                </Box>

                {healthData ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Status
                                </Typography>
                                <Typography variant="h6" color="success.main">
                                    {healthData.status.toUpperCase()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Memory Usage
                                </Typography>
                                <Typography variant="body1">
                                    {healthData.memoryUsage?.heapUsed || 'N/A'}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Last Updated
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(healthData.timestamp).toLocaleTimeString()}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/examples')}
                                sx={{
                                    borderRadius: '20px',
                                    borderColor: '#4a90e2',
                                    color: '#4a90e2',
                                    '&:hover': {
                                        backgroundColor: 'rgba(74, 144, 226, 0.05)',
                                        borderColor: '#4a90e2',
                                    }
                                }}
                            >
                                View Examples
                            </Button>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography color="text.secondary">
                        Loading system status...
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default HomePage;