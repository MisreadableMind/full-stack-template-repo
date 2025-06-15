import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { exampleService, SearchParams } from '../api/exampleService';
import {
    Typography,
    Paper,
    TextField,
    Button,
    Grid,
    Box,
    Card,
    CardContent,
    Pagination,
    CircularProgress,
    Chip,
    useTheme,
    useMediaQuery,
    Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';

const ExamplePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Form state
    const [formValues, setFormValues] = useState({
        searchTerm: '',
    });

    // Search parameters
    const [searchParams, setSearchParams] = useState<SearchParams>({
        page: 1,
        limit: 10,
    });

    const [hasSearched, setHasSearched] = useState(false);

    // Handle URL query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const search = queryParams.get('search');

        if (search) {
            setFormValues({ searchTerm: search });
            setSearchParams({
                page: 1,
                limit: 10,
                searchTerm: search
            });
            setHasSearched(true);
        }
    }, [location.search]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['examples', searchParams],
        queryFn: () => exampleService.search(searchParams),
        enabled: hasSearched,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({
            ...searchParams,
            page: 1,
            searchTerm: formValues.searchTerm || undefined
        });
        setHasSearched(true);

        // Update URL
        const queryParams = new URLSearchParams();
        if (formValues.searchTerm) queryParams.set('search', formValues.searchTerm);

        navigate({
            pathname: '/examples',
            search: queryParams.toString()
        }, { replace: true });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setSearchParams(prev => ({ ...prev, page }));
    };

    const clearSearch = () => {
        setFormValues({ searchTerm: '' });
        setSearchParams({ page: 1, limit: 10 });
        setHasSearched(false);
        navigate('/examples', { replace: true });
    };

    return (
        <Container maxWidth="lg">
            {/* Search Section */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    mb: 4,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                        fontWeight: 500,
                        mb: 3
                    }}
                >
                    Examples
                </Typography>

                <form onSubmit={handleSearch}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8} md={9}>
                            <TextField
                                fullWidth
                                label="Search examples"
                                name="searchTerm"
                                value={formValues.searchTerm}
                                onChange={handleInputChange}
                                placeholder="Enter search term..."
                                variant="outlined"
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                flexDirection: isMobile ? 'column' : 'row'
                            }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon />}
                                    fullWidth={isMobile}
                                    sx={{
                                        backgroundColor: '#4a90e2',
                                        '&:hover': {
                                            backgroundColor: alpha('#4a90e2', 0.8),
                                        },
                                    }}
                                >
                                    Search
                                </Button>
                                {hasSearched && (
                                    <Button
                                        variant="outlined"
                                        onClick={clearSearch}
                                        size="small"
                                        sx={{
                                            borderColor: '#4a90e2',
                                            color: '#4a90e2',
                                        }}
                                    >
                                        Clear
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </form>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                            borderColor: '#4a90e2',
                            color: '#4a90e2',
                            '&:hover': {
                                backgroundColor: alpha('#4a90e2', 0.05),
                                borderColor: '#4a90e2',
                            }
                        }}
                    >
                        Add Example
                    </Button>
                </Box>
            </Paper>

            {/* Results Section */}
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress sx={{ color: '#4a90e2' }} />
                </Box>
            ) : error ? (
                <Paper
                    sx={{
                        p: 3,
                        bgcolor: alpha('#f44336', 0.1),
                        color: 'error.main',
                        border: '1px solid',
                        borderColor: alpha('#f44336', 0.3),
                        borderRadius: '8px'
                    }}
                >
                    <Typography>Error loading results. Please try again.</Typography>
                </Paper>
            ) : data ? (
                <Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{
                                fontSize: { xs: '1.4rem', sm: '1.5rem', md: '1.75rem' },
                                fontWeight: 500
                            }}
                        >
                            Results ({data.total} found)
                        </Typography>

                        {hasSearched && formValues.searchTerm && (
                            <Chip
                                label={`Search: "${formValues.searchTerm}"`}
                                onDelete={clearSearch}
                                sx={{
                                    backgroundColor: alpha('#4a90e2', 0.1),
                                    color: '#4a90e2'
                                }}
                            />
                        )}
                    </Box>

                    {data.results.length === 0 ? (
                        <Paper
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px'
                            }}
                        >
                            <Typography>No results found. Try different search criteria.</Typography>
                        </Paper>
                    ) : (
                        <>
                            {/* Results Grid */}
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                {data.results.map((example) => (
                                    <Grid item xs={12} sm={6} md={4} key={example.id}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px',
                                                boxShadow: 'none',
                                                transition: 'transform 0.2s ease-in-out',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 3 }}>
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    gutterBottom
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {example.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {example.description}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Created: {new Date(example.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Pagination */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                                <Pagination
                                    count={Math.ceil(data.total / searchParams.limit!)}
                                    page={searchParams.page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size={isMobile ? "small" : "medium"}
                                    siblingCount={isMobile ? 0 : 1}
                                />
                            </Box>
                        </>
                    )}
                </Box>
            ) : hasSearched ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress sx={{ color: '#4a90e2' }} />
                </Box>
            ) : (
                <Paper
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                    }}
                >
                    <Typography>Enter search criteria and click Search to find examples</Typography>
                </Paper>
            )}
        </Container>
    );
};

export default ExamplePage;