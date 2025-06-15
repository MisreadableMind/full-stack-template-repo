# Full-Stack Application Template

A modern, production-ready template for building full-stack applications with React, NestJS, TypeScript, and Material-UI.

## 🚀 Features

### Backend (NestJS)
- **TypeScript** - Full type safety
- **NestJS** - Scalable Node.js framework
- **Swagger/OpenAPI** - Auto-generated API documentation
- **Class Validation** - Request/response validation
- **TypeORM** - Database ORM (ready to configure)
- **Environment Configuration** - Centralized config management
- **Memory Monitoring** - Built-in memory usage tracking
- **CORS Support** - Cross-origin resource sharing
- **Health Check** - API status monitoring

### Frontend (React)
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Material-UI (MUI)** - Modern React component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client with interceptors
- **Responsive Design** - Mobile-first approach
- **Form Handling** - React Hook Form integration ready
- **Error Boundaries** - Graceful error handling

## 📁 Project Structure

```
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── dto/            # Data transfer objects
│   │   ├── utils/          # Utility functions
│   │   ├── configuration.ts # Environment config
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   └── README.md
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── api/           # API service layer
│   │   ├── hooks/         # Custom React hooks
│   │   ├── theme.ts       # MUI theme configuration
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Application entry point
│   ├── package.json
│   └── README.md
│
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (optional, for database features)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start development server**
```bash
npm run start:dev
```

The API will be available at `http://localhost:4000`
Swagger documentation at `http://localhost:4000/api`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=4000
NODE_ENV=development

# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=your_database

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# Features
ENABLE_SWAGGER=true
ENABLE_CORS=true
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## 📚 API Documentation

Once the backend is running, visit `http://localhost:4000/api` to view the interactive Swagger documentation.

### Example Endpoints

- `GET /examples` - Get all examples
- `POST /examples/search` - Search examples
- `POST /examples` - Create new example
- `GET /examples/:id` - Get example by ID
- `GET /examples/health` - Health check

## 🎨 Customization

### Backend Customization

1. **Add new entities/models** in `src/entities/`
2. **Create controllers** in `src/controllers/`
3. **Add services** in `src/services/`
4. **Define DTOs** in `src/dto/`
5. **Update app.module.ts** to include new modules

### Frontend Customization

1. **Modify theme** in `src/theme.ts`
2. **Add pages** in `src/pages/`
3. **Create components** in `src/components/`
4. **Add API services** in `src/api/`
5. **Update routing** in `src/App.tsx`

## 🛠️ Development Scripts

### Backend
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run tests
npm run lint         # Lint code
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

## 📦 Deployment

### Backend Deployment

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm run start:prod
```

### Frontend Deployment

1. **Build for production**
```bash
npm run build
```

2. **Deploy the `dist` folder** to your hosting service

### Environment-specific considerations

- Set `NODE_ENV=production` for backend
- Configure database connection for production
- Set proper CORS origins
- Use environment variables for sensitive data

## 🔒 Security Features

- **Input validation** using class-validator
- **CORS configuration** for cross-origin requests
- **Environment-based configuration**
- **JWT token handling** (ready to implement)
- **Request/response interceptors**

## 🧪 Testing

### Backend Testing
```bash
npm run test         # Unit tests
npm run test:e2e     # End-to-end tests
npm run test:cov     # Coverage report
```

### Frontend Testing
```bash
npm run test         # Run tests
```

## 📈 Performance

- **Memory monitoring** built into backend
- **React Query** for efficient data fetching
- **Code splitting** ready for implementation
- **Optimized bundle** with Vite
- **Responsive design** for all devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚧 Roadmap

- [ ] Authentication system
- [ ] Database migrations
- [ ] File upload handling
- [ ] Email service integration
- [ ] Caching layer
- [ ] Rate limiting
- [ ] Logging system
- [ ] Docker configuration
- [ ] CI/CD pipeline

## 💡 Tips

- Use the health check endpoint to monitor API status
- Swagger documentation is auto-generated from your DTOs
- Material-UI theme can be customized in `theme.ts`
- API client includes automatic token handling
- All components are responsive by default

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 4000 is available
- Verify environment variables
- Ensure Node.js version is 18+

**Frontend can't connect to API:**
- Verify VITE_API_BASE_URL in .env
- Check if backend is running
- Ensure CORS is properly configured

**Database connection issues:**
- Check database credentials
- Ensure PostgreSQL is running
- Verify database exists

## 📞 Support

For questions and support:
- Create an issue in the repository
- Check existing documentation
- Review example implementations