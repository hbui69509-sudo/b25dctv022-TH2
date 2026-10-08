// src/data/books.js

// DÁN LINK MOCKAPI CỦA BẠN VÀO ĐÂY:
export const API_URL = "https://6ac70236bea0e72cf5c962d5.mockapi.io/books";

// Hàm lấy danh sách sách từ MockAPI bằng fetch + async/await
export async function fetchBooks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(
      `Lỗi khi tải dữ liệu từ MockAPI (Status: ${response.status})`,
    );
  }
  const data = await response.json();
  return data;
}

// Giữ lại initialBooks phòng trường hợp mất mạng hoặc link API lỗi
export const initialBooks = [
  {
    id: "B01",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Công nghệ",
    year: 2008,
  },
  {
    id: "B02",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    genre: "Công nghệ",
    year: 2015,
  },
  {
    id: "B03",
    title: "Thiết Kế Hệ Thống Lớn",
    author: "Alex Xu",
    genre: "Công nghệ",
    year: 2020,
  },
  {
    id: "B04",
    title: "Lược Sử Thời Gian",
    author: "Stephen Hawking",
    genre: "Khoa học",
    year: 1988,
  },
  {
    id: "B05",
    title: "Vũ Trụ (Cosmos)",
    author: "Carl Sagan",
    genre: "Khoa học",
    year: 1980,
  },
  {
    id: "B06",
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    genre: "Văn học",
    year: 1941,
  },
  {
    id: "B07",
    title: "Mắt Biếc",
    author: "Nguyễn Nhật Ánh",
    genre: "Văn học",
    year: 1990,
  },
  {
    id: "B08",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    genre: "Văn học",
    year: 1988,
  },
  {
    id: "B09",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    genre: "Kỹ năng sống",
    year: 1936,
  },
  {
    id: "B10",
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    genre: "Kỹ năng sống",
    year: 2011,
  },
];
