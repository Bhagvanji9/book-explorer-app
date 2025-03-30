# 📚 Book Explorer

Book Explorer is a **React (Vite) application** that allows users to search for books using the **Google Books API**, view details, and manage a favorites list.

## ✨ Features

- ✅ **Search Books**: Search by title, author, or genre.
- ✅ **Book Details Page**: View book descriptions, authors, and other details.
- ✅ **Favorites Management**: Add/remove books from favorites (stored in global state).
- ✅ **Dark Mode Support**: Toggle between light and dark themes.
- ✅ **Responsive UI**: Fully mobile-friendly design using MUI and Tailwind CSS.
- ✅ **React Router Navigation**: Navigate between search, details, and favorites pages.

## 🛠️ Technologies Used

- **React (Vite)** - Frontend framework
- **Redux Toolkit** - State management
- **React Hook Form + Yup** - Form handling and validation
- **Axios** - API requests
- **Google Books API** - Fetch book data
- **Material UI (MUI) & Tailwind CSS** - Styling and UI components

## 📂 Folder Structure

```
📦 book-explorer
├── 📁 src
│   ├── 📁 components     # Reusable UI components
│   ├── 📁 pages          # Main application pages
│   ├── 📁 store         # Redux state management
│   ├── 📁 hooks         # Custom React hooks
│   ├── 📁 assets        # Static images and icons
│   ├── 📄 App.jsx       # Main application entry
│   ├── 📄 index.js      # Renders the app
│   └── 📄 styles.css    # Global styles
└── 📄 README.md
```

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/book-explorer.git
cd book-explorer
```

### 2️⃣ Install Dependencies

```sh
yarn install  # or npm install
```

### 3️⃣ Start the Development Server

```sh
yarn dev  # or npm run dev
```

## 📌 Available Routes

| Route        | Description            |
| ------------ | ---------------------- |
| `/`          | Home/Search Page       |
| `/book/:id`  | Book Details Page      |
| `/favorites` | List of Favorite Books |

## 👨‍💻 Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request 🎉

## 📜 License

This project is **open-source** under the **MIT License**
