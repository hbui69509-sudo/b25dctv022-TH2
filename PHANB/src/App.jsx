// src/App.jsx
import { useState, useEffect } from "react";
import { fetchBooks, initialBooks } from "./data/books";
import Header from "./components/Header";
import Section from "./components/Section";
import GenreFilter from "./components/GenreFilter";
import BookList from "./components/BookList";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi dữ liệu từ MockAPI khi trang vừa tải
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("Không gọi được MockAPI, đang hiển thị dữ liệu dự phòng.");
        setBooks(initialBooks);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Tạo danh sách thể loại bằng Set
  const genres = ["Tất cả", ...new Set(books.map((book) => book.genre))];

  // Bật/tắt yêu thích
  const handleToggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId],
    );
  };

  // Lọc sách theo thể loại
  const filteredBooks =
    selectedGenre === "Tất cả"
      ? books
      : books.filter((book) => book.genre === selectedGenre);

  return (
    <div className="app-wrapper">
      <Header favoriteCount={favorites.length} />

      <main className="container main-content">
        <Section title="Lọc theo thể loại">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
          <p className="status-line">
            Đang hiển thị <strong>{filteredBooks.length}</strong> /{" "}
            {books.length} cuốn
          </p>
        </Section>

        <Section title="Danh sách sách">
          {error && (
            <p style={{ color: "#d97706", marginBottom: 12 }}>⚠️ {error}</p>
          )}
          {loading ? (
            <p className="empty-msg">Đang tải dữ liệu từ MockAPI...</p>
          ) : (
            <BookList
              books={filteredBooks}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </Section>
      </main>

      <Footer />
    </div>
  );
}
