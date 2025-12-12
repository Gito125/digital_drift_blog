# Digital Drift Blog - Administrator Login Guide

## Setting Up Your Environment

Before logging in as an administrator, make sure you have:

1. A running MongoDB instance
2. Proper environment variables configured (see `.env.local`)

## Creating an Administrator Account

### Option 1: Using the Seed Script (Recommended)

The project includes a script to automatically create a sample admin user:

```bash
pnpm seed-admin
```

This creates an admin user with the following credentials:
- **Email**: `admin@digitaldrift.com`
- **Password**: `AdminPass123!`

### Option 2: Register as Admin via API

If you have an existing admin account, you can create new admin users via the API:

1. Ensure you're logged in as an admin
2. Send a POST request to `/api/users` with the `role` field set to `"admin"`

## Logging In as Administrator

### Via Login Page

1. Start your development server: `pnpm dev`
2. Navigate to `http://localhost:3000/login`
3. Enter the admin credentials:
   - Email: `admin@digitaldrift.com`
   - Password: `AdminPass123!`
4. Click "Sign In"
5. You will be redirected to the admin dashboard at `/admin/dashboard`

### Via Code (For Development)

If you need to programmatically log in for testing, you can use the credentials with the NextAuth `signIn` function:

```javascript
import { signIn } from 'next-auth/react';

// In a component or function
const handleLogin = () => {
  signIn('credentials', {
    email: 'admin@digitaldrift.com',
    password: 'AdminPass123!',
    callbackUrl: '/admin/dashboard'
  });
};
```

## Admin Dashboard Access

Once logged in as an admin, you will see an "Admin" link in the navigation bar that takes you to the admin dashboard at `/admin/dashboard`. Here you can manage:
- Posts
- Categories 
- Comments
- Other site content

## Security Best Practices

1. **Change Default Password**: The default password is only for initial setup. Please change it immediately after first login.

2. **Use Strong Passwords**: Always use strong, unique passwords for admin accounts.

3. **Environment Variables**: Never commit credentials or secret keys to version control.

4. **Session Security**: The application uses NextAuth with JWT tokens. Make sure to properly configure `NEXTAUTH_SECRET` in production.

## Troubleshooting

### Issue: "Invalid credentials"
**Solution**: Verify that:
- You used the correct email and password
- The admin user exists in the database
- Run `pnpm seed-admin` to ensure the admin user is created

### Issue: "Access denied" after login
**Solution**: 
- Verify the user's role is set to "admin" in the database
- Check that the session is correctly stored after login

### Issue: "Database connection error"
**Solution**:
- Ensure MongoDB is running
- Check your `MONGODB_URI` environment variable
- Verify your connection string is correct

## Environment Variables Required

Make sure these environment variables are set in your `.env.local` file:

```
MONGODB_URI=mongodb://localhost:27017/digital_drift
NEXTAUTH_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Additional Notes

- Admin accounts have full access to create, edit, and delete content
- Regular users can read content and post comments (pending approval)
- All admin actions are logged in the database for security auditing
- The admin panel is responsive and works on all device sizes

For additional help, please refer to the main README or contact the development team.