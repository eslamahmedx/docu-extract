<div align="center">

# 📄 Docu-Extract

### Intelligent Document Processing & Extraction Web Application

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)
![Axios](https://img.shields.io/badge/Axios-API%20Client-green)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Styling-38bdf8?logo=tailwindcss)

</div>

---

## 📌 Overview

Docu-Extract is a modern web application built with **React + TypeScript** that allows users to process and analyze documents efficiently through API-powered extraction and summarization.

The system helps reduce manual review time and automate document workflows.

---

## ✨ Features

✔ Upload documents (PDF, DOCX, Excel)  
✔ Contract summarization  
✔ Invoice extraction  
✔ Sheet data extraction (downloadable output)  
✔ Real-time queue status tracking  
✔ Dark / Light mode toggle  
✔ Centralized Axios API configuration  
✔ Environment-based API setup  
✔ Clean and scalable architecture  

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| React | Frontend Library |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Axios | API Requests |
| Tailwind CSS | Styling |
| REST API | Backend Communication |

---

## 📂 Project Structure

```
src/
 ├── api/
 │    ├── client.ts
 │    └── documentApi.ts
 │
 ├── components/
 ├── pages/
 ├── config/
 ├── layout/
 └── main.tsx
```

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd docu-extract
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## ⚙ Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=<your-backend-url>
VITE_API_TIMEOUT=400000
```

⚠️ Do not commit your `.env` file to GitHub.

---

# 📸 Application Screenshots

## 📄 Document Processing Dashboard

![Dashboard](./docs/1.png)

---

## 📊 Extracted Data View

![Extraction Result](./docs/2.png)
![Extraction Result](./docs/3.png)
![Extraction Result](./docs/4.png)
---

---

## 🚀 Future Improvements

- Advanced progress indicators  
- Drag & Drop upload  
- Authentication system  
- Role-based access control  
- Deployment with Docker  
- Performance monitoring  

---

## 🧑‍💻 Author

Developed as part of an internship task.


---

<div align="center">

⭐ If you like this project, consider giving it a star!

</div>