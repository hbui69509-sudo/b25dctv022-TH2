// src/components/BookList.jsx
import BookCard from "./BookCard";

export default function BookList({
  books = [],
  favorites = [],
  favoriteIds,
  onToggleFavorite,
}) {
  // Đảm bảo danh sách yêu thích luôn là mảng, tránh lỗi undefined.includes()
  const favList = Array.isArray(favoriteIds) ? favoriteIds : favorites;

  if (books.length === 0) {
    return (
      <p className="empty-msg">Không có cuốn sách nào thuộc thể loại này.</p>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favList.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
