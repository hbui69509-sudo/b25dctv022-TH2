# Bài thực hành 02 - Lập trình Web (RIPT1306)

- **Họ và tên:** Bùi Huy Hoàng
- **Mã sinh viên:** B25DCTV022
- **Nội dung:** Xây dựng trang web quản lý Thư viện lớp bằng JavaScript thuần (Phần A) và React cơ bản (Phần B).

---

## 1. Cấu trúc thư mục

- `phan-a-js-thuan/`: Ứng dụng viết bằng HTML5 Semantic, CSS Flexbox và Vanilla JavaScript (ES Modules).
- `phan-b-react/`: Ứng dụng khởi tạo bằng Vite + React (Component, Props, Children, useState).

---

## 2. Hướng dẫn chạy chương trình

- **Phần A (JavaScript thuần):** Mở thư mục `phan-a-js-thuan` trong VS Code, chuột phải vào `index.html` và chọn **Open with Live Server**.
- **Phần B (React cơ bản):** Mở terminal tại thư mục `phan-b-react`, chạy lệnh `npm install` và `npm run dev`.

---

## 3. So sánh cách làm giao diện bằng DOM thuần (Phần A) và React (Phần B)

| Tiêu chí | Phần A – JavaScript thuần (DOM) | Phần B – React cơ bản |
| :--- | :--- | :--- |
| **Cách tiếp cận** | **Imperative (Mệnh lệnh):** Phải chỉ định từng bước thao tác trực tiếp lên cây DOM (`document.createElement`, `textContent`, `appendChild`, xóa node cũ trước khi vẽ lại). | **Declarative (Khai báo):** Chỉ cần mô tả giao diện mong muốn bằng cú pháp JSX dựa trên trạng thái (`state`). React tự động cập nhật DOM khi dữ liệu thay đổi. |
| **Quản lý trạng thái (State)** | Dữ liệu (`books`, `favoriteIds`) lưu trong biến JS tách rời với giao diện; mỗi khi dữ liệu đổi phải chủ động gọi lại hàm `renderBooks()` và `updateFavCounter()` thủ công. | Quản lý tập trung qua hook `useState`. Khi gọi `setFavoriteIds` hoặc `setSelectedGenre`, các component liên quan (`Header`, `BookList`, `BookCard`) tự động re-render đồng bộ. |
| **Tổ chức & Tái sử dụng** | Giao diện viết chung trong `index.html` kết hợp hàm tạo thẻ dài dòng trong JS; khó tách nhỏ và khó tái sử dụng khi cấu trúc phức tạp. | Chia nhỏ giao diện thành các Component độc lập (`Header`, `Section`, `GenreFilter`, `BookList`, `BookCard`, `Footer`), truyền dữ liệu linh hoạt qua `props` và `children`. |
| **Xử lý sự kiện** | Phải truy vấn phần tử DOM và gắn `addEventListener` thủ công; cần dùng kỹ thuật **Event Delegation** (`e.target.closest`) trên lưới sách để bắt sự kiện cho các thẻ sinh động. | Gắn sự kiện trực tiếp trên JSX (`onClick`) và truyền hàm xử lý từ component cha (`App`) xuống component con (`BookCard`, `GenreFilter`) qua `props` trực quan. |

**Kết luận:**
- **DOM thuần (Phần A):** Giúp nắm vững bản chất cách trình duyệt tạo phần tử, quản lý sự kiện và cập nhật giao diện, phù hợp với trang web nhỏ ít thay đổi trạng thái.
- **React (Phần B):** Giúp mã nguồn có cấu trúc rõ ràng theo từng component, tự động đồng bộ giữa dữ liệu (`state`) và giao diện (UI), dễ mở rộng và bảo trì hơn.
