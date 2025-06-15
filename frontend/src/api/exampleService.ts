import { apiClient } from './apiClient';

export interface Example {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface SearchParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
}

export interface CreateExampleParams {
    name: string;
    description: string;
}

export interface SearchResponse {
    results: Example[];
    total: number;
    page: number;
    limit: number;
}

// Example service functions
export const exampleService = {
    // Get all examples
    getAll: async (): Promise<Example[]> => {
        const response = await apiClient.get('/examples');
        return response.data;
    },

    // Get example by ID
    getById: async (id: string): Promise<Example> => {
        const response = await apiClient.get(`/examples/${id}`);
        return response.data;
    },

    // Search examples
    search: async (params: SearchParams): Promise<SearchResponse> => {
        const response = await apiClient.post('/examples/search', params);
        return response.data;
    },

    // Create example
    create: async (data: CreateExampleParams): Promise<Example> => {
        const response = await apiClient.post('/examples', data);
        return response.data;
    },

    // Update example
    update: async (id: string, data: Partial<CreateExampleParams>): Promise<Example> => {
        const response = await apiClient.put(`/examples/${id}`, data);
        return response.data;
    },

    // Delete example
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/examples/${id}`);
    },

    // Health check
    healthCheck: async () => {
        const response = await apiClient.get('/examples/health');
        return response.data;
    }
};

// Auth service functions
export const authService = {
    // Login
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    },

    // Register
    register: async (email: string, password: string, name: string) => {
        const response = await apiClient.post('/auth/register', { email, password, name });
        return response.data;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('authToken');
    },

    // Get current user
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    }
};