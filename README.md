# Repkit

_**your reps, your kit, your way**_

Repkit is a full-stack web application designed to help you organise and track your workout sessions effortlessly. Create new workout sessions, give them custom names, and easily add exercises. For every exercise, a smart timer is automatically generated based on the sets, reps, and rest time you define. Stay focused, consistent, and in control throughout your workouts.

## Live Demo

[Start your workout journey with Repkit](https://repkit.vercel.app)

## Features

- User authentication with JWT
- Create and manage workout sessions and exercises
- Track sets, reps, and rest periods with an interactive timer
- Responsive UI optimised for desktop and mobile
- Secure user-specific data access

## Tech Stack

**Frontend**
- React (TypeScript)
- Vite
- Tailwind CSS
- Axios for API calls

**Backend**
- Spring Boot
- Spring Security with JWT
- PostgreSQL (via Spring Data JPA)
- RESTful API design

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Git

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/seansjlee/repkit.git
    cd repkit
    ```

2. **Frontend setup**
    ```bash
    cd frontend
    npm install
    ```

3. **Backend setup**
    ```bash
    cd ../backend
    ```

    Create environment variables for JWT configuration:
   ```bash
   export JWT_SECRET=your_jwt_secret_key
   export JWT_EXPIRATION=86400000
   export JWT_REFRESH_EXPIRATION=604800000
   ```
   
   Or create a `.env` file in the backend directory:
   ```
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=86400000
   JWT_REFRESH_EXPIRATION=604800000
   ```

### Running the Application

#### Local Development (uses H2 in-memory database)

1. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

2. **Start the backend server**
   ```bash
   cd backend
   ./gradlew bootRun --args='--spring.profiles.active=local'
   ```
   The backend will be available at `http://localhost:8080`
   
   **H2 Console**: Access the database console at `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa`
   - Password: (leave empty)

#### Production Setup (uses PostgreSQL)

For production deployment, you'll need to set additional environment variables:
```bash
export JDBC_DATABASE_URL=jdbc:postgresql://localhost:5432/repkit
export DB_USERNAME=your_database_username
export DB_PASSWORD=your_database_password
export PORT=8080
```

Then run with the production profile:
```bash
./gradlew bootRun --args='--spring.profiles.active=prod'
```

### Building for Production

**Frontend**
```bash
cd frontend
npm run build
```

**Backend**
```bash
cd backend
./gradlew build
```

### Environment Variables

**Required for all environments:**
- `JWT_SECRET`: Secret key for JWT token generation (use a strong, random string)
- `JWT_EXPIRATION`: JWT token expiration time in milliseconds (default: 86400000 = 24 hours)
- `JWT_REFRESH_EXPIRATION`: Refresh token expiration time in milliseconds (default: 604800000 = 7 days)

**Required for production only:**
- `JDBC_DATABASE_URL`: PostgreSQL connection URL
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `PORT`: Server port (optional, defaults to 8080)

### Database Information

- **Local Development**: Uses H2 in-memory database (no setup required)
- **Production**: Uses PostgreSQL database
- **Database schema**: Automatically created and updated by Hibernate (based on entity classes)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.