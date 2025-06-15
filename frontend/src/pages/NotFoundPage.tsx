import { Button, Typography, Paper, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Page Not Found
            </Typography>
            <Typography color="text.secondary" paragraph>
                The page you're looking for doesn't exist or has been moved.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/"
                    size="large"
                >
                    Go to Home
                </Button>
            </Box>
        </Paper>
    );
};

export default NotFoundPage;