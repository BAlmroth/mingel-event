# Talk the Stalk

An interactive networking platform where students and companies can create profiles, search for each other, and mark favorites for later contact.

## Features

- **LinkedIn Login** - Simple authentication with LinkedIn
- **Profile Creation** - Create a personal profile with picture, description, and fun fact
- **Search & Filter** - Search by name, company, or program. Filter by student or industry category
- **Favorite Marking** - Save interesting profiles for later

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- GitHub account
- Supabase account
- LinkedIn Developer account

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/BAlmroth/mingel-event.git
cd mingel-event
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) follow the setup instructions and create a new project
2. Create the following tables in your Supabase database through SQL Editor:

**users table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  picture TEXT,
  description TEXT,
  fun_fact TEXT,
  role TEXT NOT NULL ('student' or 'industry'),
  linkedin_id TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  liker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  liked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, liked_id)
);
```


### Step 4: Set Up LinkedIn OAuth

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers)
2. Create a new app:
   - App name: "Mingel Event"
   - LinkedIn Page: Select or create a Linkedin page [(linkedin.com/company/setup/new)](https://www.linkedin.com/company/setup/new/)
   - App logo: Upload a logo
   - Legal agreement: Accept terms
3. In the app settings, go to **Auth** tab:
   - Add Authorized redirect URLs:
     - `http://localhost:4000/auth/linkedin/callback` (development)
4. Go to **Application credentials** and copy:
   - Client ID
   - Client Secret

5. Go to **Products** and request access for "Sign In with LinkedIn using OpenID Connect"

### Step 5: Set Up Environment Variables

1. Copy your Supabase URL (Project Settings > Data API) and Secret API key from (Project Settings > API Keys > PUBLISHABLE Keys)

**Frontend (.env):**
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-PUBLISHABLE-key
VITE_API_URL=http://localhost:4000
```

**Backend (.env):**

1. Find Linkedin credentials under the "Auth" tab in Linkedin Developer Portal
2. Copy your Supabase URL (Project Settings > Data API) and API key from (Project Settings > API Keys > SECRET Keys)

```env

LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:4000/auth/linkedin/callback

FRONTEND_URL=http://localhost:5173

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_SECRET_supabase_key

SESSION_SECRET=your_session_secret

```

3. in your server (backend) terminal run:
```bash

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

```
4. copy the generated hex code and paste as SESSION_SECRET in .env

### Step 6: Start Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on `http://localhost:4000`

### Step 7: Start Frontend (in a new terminal)

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## DONE! View your work on [localhost:](http://localhost:5173/)

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express
- **Database:** Supabase (PostgreSQL)
- **Authentication:** LinkedIn OAuth 2.0
- **Styling:** CSS Modules

## Project Structure

```
src/
├── components/         # React components
│   ├── Mingle/        # Feed and profile viewing
│   ├── MyProfile/     # User's own profile
│   ├── ProfileStartup/# Profile creation
│   └── Navigation/    # Navigation components
├── hooks/             # Custom React hooks
├── assets/            # Images and icons
└── lib/              # Configuration (Supabase, etc)
```

## Troubleshooting

### LinkedIn login not working
- Verify Client ID and Client Secret are correct
- Check that redirect URLs are added in LinkedIn Developer Portal
- Make sure CORS is enabled in backend

### Database connection error
- Verify Supabase URL and API key
- Check that the `users` table exists
- Ensure your IP is not blocked by Supabase

### Session not persisting
- Check that `credentials: "include"` is set in fetch requests
- Verify session secret is set in `.env`
- Ensure cookies have correct `SameSite` policy

## License

This project is licensed under the MIT License.

## Authors

Eddie Johansson & Benita Almroth

## Support

Have questions? Open an issue on GitHub or contact the project owner.