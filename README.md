# 🚀 XplorationX Web Project

**XplorationX** is an interactive web application that visualizes and explores real-time data from the SpaceX program. Built with modern web technologies including **TypeScript**, **React**, and **Prisma**, this project offers users a sleek interface to view and save information about **launches**, **launchpads**, **crews**, **landpads**, and **payloads** from the [SpaceX public API](https://github.com/r-spacex/SpaceX-API).

---

## 🌌 Features

- 🔭 **Real-time SpaceX Data**: Fetches data on launches, launchpads, crew, landpads, and payloads
- 📒 **User Notes**: Authenticated users can write and save personal notes on launches
- ⭐ **Favorites**: Mark and save favorite launches for quick access
- 🔐 **Authentication**: Secure login and signup using **JWT-based authentication**
- 🎯 **RESTful API**: Backend communication follows RESTful API standards

---

## 🛠️ Tech Stack

| Layer         | Technologies                                                  |
|---------------|---------------------------------------------------------------|
| **Frontend**  | React, TypeScript, HTML, CSS                                  |
| **Backend**   | RESTful APIs, Prisma (ORM)                                    |
| **Auth**      | JWT (JSON Web Token)                                          |
| **Data Source** | [SpaceX Public API](https://github.com/r-spacex/SpaceX-API) |

---

## 🚀 Live Features Preview

- View upcoming and past **SpaceX launches**
- Browse details of **launchpads**, **crews**, **landpads**, and **payloads**
- Create a personal account to **write notes** and **save favorites**
- Mobile-friendly and responsive interface

---

## 📂 Project Repository

> GitHub: [XplorationX_Web](https://github.com/deshinikanchana/XplorationX_Web.git)

---

## 🧪 Getting Started

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/deshinikanchana/XplorationX_Web.git
cd XplorationX_Web
```
#

### 2.📦 Install Dependencies
```bash
npm install
```
#

### 3. ⚙️ Set Up Environment Variables
Create a .env file and define necessary variables such as:
```bash
VITE_API_BASE_URL=https://api.spacexdata.com/v4
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_prisma_database_url
```
Adjust according to your local or production configuration.
#


### 4. 🔧 Set Up Prisma (if applicable)
```bash
npx prisma generate
npx prisma migrate dev
```
#

### 5.  ▶️ Run the Development Server
```bash
npm run dev
```
The app will be available at http://localhost:3000.

---
## 📚 API Reference

- This project uses the SpaceX REST API to retrieve all space-related data.

  - Endpoints used include:
  
      - /launches
      
      - /launchpads
      
      - /crew
      
      - /landpads
      
      - /payloads

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](License) file for details.
