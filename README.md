# TDC Directory

> A full stack Next.js + Shadcn directory application

---

## 📋 Table of Contents

- [Features](#-features)
- [Development](#-development)
- [Adding Products](#-adding-products-to-the-directory)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Tech Stack](#️-tech-stack)

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
| Mobile Responsive | ✅ |
| Submit Product RSC | ✅ |
| Dark & Light Mode | ✅ |
| Product Filters | ✅ |
| Custom Color Themes | ✅ |
| Bulk AI Data Enrichment | ✅ |
| License | TDC Proprietary |

---



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




## 📦 Adding Products to the Directory

To add new products to your directory, simply visit the submission page:

**[Submit Products](http://localhost:3000/submit)**

### 🎉 Congratulations!

You now have a fully seeded database with all the data you need to start building your directory.

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

   - Any other environment variables specific to your project setup

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

- **AI**: Vercel AI SDK
- **Deployment**: Vercel
- **Styling**: Tailwind CSS, Framer Motion
- **Forms**: React Hook Form, Zod
- **Linting & Formatting**: Biome

---

**[⬆ Back to top](#tdc-directory)**