# Setup Guide for ATIA Landing Page

## Environment Variables Setup

To make the image upload functionality work, you need to set up the following environment variables:

### 1. Create a `.env.local` file in the root directory

Create a file named `.env.local` in the root directory of your project with the following content:

```env
# Cloudinary Configuration
# Get these from your Cloudinary dashboard: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NextAuth Configuration
# Generate a random secret: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key_here

# Database Configuration
# For development, you can use SQLite
DATABASE_URL="file:./dev.db"

# For production, use a proper database like PostgreSQL
# DATABASE_URL="postgresql://username:password@localhost:5432/atia_db"
```

### 2. Get Cloudinary Credentials

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Sign up or log in to your account
3. From your dashboard, copy:

   - **Cloud Name**
   - **API Key**
   - **API Secret**

4. Replace the placeholder values in your `.env.local` file with your actual Cloudinary credentials.

### 3. Generate NextAuth Secret

Run this command to generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Copy the output and replace `your_nextauth_secret_key_here` in your `.env.local` file.

### 4. Restart the Development Server

After setting up the environment variables, restart your development server:

```bash
npm run dev
```

## Troubleshooting

### Image Upload Not Working

If image upload is still not working:

1. **Check Environment Variables**: Make sure all Cloudinary environment variables are set correctly
2. **Check Console**: Open browser developer tools and check the console for any error messages
3. **Check Network Tab**: Look for failed requests to `/api/upload`
4. **Check Server Logs**: Look at the terminal where you're running `npm run dev` for any error messages

### Common Issues

1. **"No file provided"**: Make sure you're selecting a file before uploading
2. **"Invalid file type"**: Only JPG, PNG, WebP, and GIF files are supported
3. **"File too large"**: Maximum file size is 5MB
4. **"Unauthorized"**: Make sure you're logged in as an admin user

### Testing the Upload

1. Go to the admin events page (`/admin/events`)
2. Click "Nouvel Événement"
3. Try uploading an image in the "Image de l'événement" section
4. The image should upload successfully and show a preview

## Database Setup

If you haven't set up the database yet:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (if you have seed data)
npx prisma db seed
```
