# TDC Directory

> A full stack Next.js + Shadcn + Supabase directory application

---

## 📋 Table of Contents

- [Features](#features)
- [Supabase Setup](#supabase)
- [Development](#develop)
- [Adding Products](#adding-products-to-the-directory)
- [Admin Setup](#admin-setup)
- [Admin Dashboard](#accessing-the-admin-dashboard)
- [Customization](#customize)
- [Deployment](#deploy)
- [Tech Stack](#tech-stack)

---


## ✨ Features

| Feature | Status |
| --- | ------ |
| Next.js v16 | ✅ |
| React v19 | ✅ |
| /app Directory | ✅ |
| Tailwind CSS   | ✅ |
| Shadcn Components   | ✅ |
| Vercel AI SDK   | ✅ |
| Supabase Integration | ✅ |
| Mobile Responsive | ✅ |
| Submit Product RSC | ✅ |
| Dark & Light Mode | ✅ |
| User Authentication | ✅ |
| Product Filters | ✅ |
| Custom Color Themes | ✅ |
| Admin Dashboard | ✅ |
| Admin Analytics | ✅ |
| Bulk AI Data Enrichment | ✅ |
| License | TDC Proprietary |

---

## 🗄️ Supabase Setup

### Install the Supabase CLI

- **Mac:** `brew install supabase/tap/supabase`
- **Windows:**

  ```powershell
  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
  scoop install supabase
  ```

- **Linux:** `brew install supabase/tap/supabase`
- **NPM/Bun:** `npx supabase <command>`

<br/>



### Create a Supabase project

1. Create a Supabase project at [Supabase Dashboard](https://database.new), or via the CLI:

   ```shell
   npx supabase projects create -i "your-saas-app"
   ```

   Your Org ID can be found in the URL after [selecting an org](https://supabase.com/dashboard/org/_/general).

<br/>

### Link your CLI to the project

2. Link your CLI to the project:

   ```shell
   npx supabase init
   npx supabase link
   ```

   Select the project you just created.

<br/>

### Store Supabase URL & public anon key in `.env.local` for Next.js

3. Store Supabase URL & public anon key in `.env.local` for Next.js:

   ```shell
   NEXT_PUBLIC_SUPABASE_URL=<api-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   ```

   You can get the project API URL and anonymous key from the [API settings page](https://supabase.com/dashboard/project/_/settings/api).

<br/>

### Setup DB schema

4. Setup DB schema:

   > This will run all of the migrations located in the `supabase/migrations` directory

   ```shell
   supabase db push
   ```

## Ensure your `.env` variables are configured correctly

```bash
cp .env.local.example .env.local
```

```bash
# Example Supabase Config
NEXT_PUBLIC_SUPABASE_URL="https://examplesqnwerasdfaser.supabase.co"
SUPABASE_PROJECT_ID="examplesqnwerasdfaser"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.."
```

</div>

## 🚀 Development


### Install dependencies and run the Next.js client

In a separate terminal, run the following commands:

```shell
pnpm i
```

```shell
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000/) in your browser.

### ⚠️ Recommended: Turn off confirm email

> **Note:** The default SMTP rate limiting for Supabase is very low now.

Configure this in Providers Email - [API settings page](https://supabase.com/dashboard/project/_/auth/providers).


## 📦 Adding Products to the Directory

To add new products to your directory, simply visit the submission page:

**[Submit Products](http://localhost:3000/submit)**

### 🎉 Congratulations!

You now have a fully seeded database with all the data you need to start building your directory.

---

## 👨‍💼 Admin Setup

### 1. Sign up with the email you want for your admin account

#### ⚠️ Recommended: Turn off confirm email

> **Note:** The default SMTP rate limiting for Supabase is very low now.

- The rate was lowered to 4/hour for the built-in SMTP service
- Too low for production - you need to use your own SMTP service

Configure in Providers Email - [API settings page](https://supabase.com/dashboard/project/_/auth/providers).

If you need email confirmation, follow these guides:
- [How to Increase Supabase signup rate limit (3000 free emails / mo)](https://medium.com/@techalchimiste/how-to-increase-supabase-signup-rate-limit-3000-emails-mo-261289882cf4)
- [How to configure Supabase to send emails from your domain](https://resend.com/blog/how-to-configure-supabase-to-send-emails-from-your-domain)

**[Login to your account →](http://localhost:3000/login)**

### 2. Copy your newly created user's UID

Retrieve your user ID from the auth users table - [Auth Users page](https://supabase.com/dashboard/project/_/auth/users).

Copy the `SUPABASE_ADMIN_ID` variable from `.env.local` and paste it into the SQL Editor.

### 3. Assign Admin Rights

Go to the SQL Editor in Supabase - [SQL Editor](https://supabase.com/dashboard/project/_/sql/new).

```sql
UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
    coalesce(raw_app_meta_data, '{}'),
    '{claims_admin}',
    'true'::jsonb
)
WHERE id = 'USER_UUID';
```

To assign admin rights to a user, run the following SQL script. Replace `'USER_UUID'` with the same user ID you copied from the auth users table.

### 4. 3-Stage AI Bulk Enrichment Scripts

> **Note:** The seed script is comprehensive. Overview documentation is available at `supabase/seed/src/README.md`
> And docs for each stage:

1. `supabase/seed/src/stage-1-crawl/readme.md`
2. `supabase/seed/src/stage-2-enrich/readme.md`
3. `supabase/seed/src/stage-3-seed/readme.md`

I've tried to make it as cheap as possible to run. Depending on your API support level you can increase the performance of the scripts by playing with the concurrency and timeout values.

#### Option 1

You need either the `ANTHROPIC_API_KEY` or an `ANTHROPIC_API_KEY` in your `.env.local` file to run `supabase/seed/src/stage-2-enrich`.

1. If you have an API key, copy it to your `.env.local` file.
2. Optionally edit the `SEED_URLS` variable in `supabase/seed/src/main.ts` to include the URLs you want to scrape and enrich.
3. Run the script:

   ```shell
   pnpm run enrich-seed
   ```

#### Option 2

If you don't have an API key, I've included a pre-enriched data set of a previous run. You can see this in `supabase/seed/src/stage-2-enrich/__data__/enriched-20240611T210738.json`.

To use this data set instead of enriching using your keys:

1. Open the file at `supabase/seed/src/main.ts`.
2. Comment out lines `104 - 110`:

   ```ts
   // console.log("Step 1: Crawl and save raw data")
   // await crawlAndSave(SEED_URLS)
   // console.log("Step 1 completed successfully")

   // console.log("Step 2: Enrich the latest raw data")
   // await enrichLatestData()
   // console.log("Step 2 completed successfully")
   ```

3. Run the script:

   ```shell
   pnpm run enrich-seed
   ```

---

## 🎛️ Accessing the Admin Dashboard


Manage the content and users of your directory through the admin dashboard. Access it here:

**[Admin Dashboard →](http://localhost:3000/admin)**

---

## 🎨 Customization

### Custom Color Theme

To give your directory a unique look, create a custom color theme:

1. **Design Your Theme**

   Visit the [custom shadcn theme](https://www.cult-ui.com/themes) page to design your theme.

2. **Apply Your Theme**

   Once you have your theme, copy the relevant CSS and paste it into your `app/globals.css` file, replacing lines 5-67.

---

## 🚢 Deployment

1. **Create a new repository and push the project to GitHub.**

2. **Go to Vercel and import the GitHub repository: [Deploy](https://vercel.com/new).**

3. **Set up Environment Variables in Vercel**

   Go to your project settings on Vercel and set up the environment variables by copying the content from your `.env.local` file. Ensure the following variables are included:

   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase API URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `SUPABASE_PROJECT_ID` - Your Supabase project ID
   - `SUPABASE_ADMIN_ID` - Admin user ID for your application
   - Any other environment variables specific to your project setup

   Here's an example of what your environment variables might look like:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL="https://abcd1234.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   SUPABASE_PROJECT_ID="abcd1234"
   SUPABASE_ADMIN_ID="efgh5678"
   ```

4. **Deploy the Project**

   Once your environment variables are set, you can deploy your project. Vercel will handle the build and deployment process for you.

5. **Access Your Live Application**

   After deployment, you can access your live application through the URL provided by Vercel. Your application should now be live and ready to use.

---

## 🎯 Conclusion

Follow the steps outlined in this README to deploy and customize your directory app.


## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, Tailwind CSS, Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Vercel AI SDK
- **Deployment**: Vercel

---

**[⬆ Back to top](#tdc-directory)**