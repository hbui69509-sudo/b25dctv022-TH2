const API_URL = 'https://64a022f4ed3c41bdd7a718d7.mockapi.io/api/books';
let books = [];
let favorites = JSON.parse(localStorage.getItem('favs')) || [];

const bookList = document.getElementById('bookList');
const status = document.getElementById('status');
const favCount = document.getElementById('favCount');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');
const form = document.getElementById('addBookForm');

async function loadBooks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error();
    books = await res.json();
    updateGenres();
    render();
  } catch {
    status.textContent = "Lỗi khi tải dữ liệu";
  }
}

function updateGenres() {
  const genres = [...new Set(books.map(b => b.genre))];
  genreSelect.innerHTML = '<option value="">Tất cả thể loại</option>' + 
    genres.map(g => `<option value="${g}">${g}</option>`).join('');
}

function render() {
  const q = searchInput.value.toLowerCase();
  const g = genreSelect.value;
  const filtered = books.filter(b => 
    b.name.toLowerCase().includes(q) && (g === "" || b.genre === g)
  );

  status.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
  favCount.textContent = favorites.length;
  
  bookList.innerHTML = '';
  filtered.forEach(b => {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.id = b.id;
    
    const title = document.createElement('h3');
    title.textContent = b.name;
    
    const info = document.createElement('p');
    info.textContent = `${b.author} - ${b.genre} (${b.year})`;
    
    const btnFav = document.createElement('button');
    btnFav.className = 'btn-fav';
    btnFav.textContent = favorites.includes(b.id) ? 'Bỏ thích' : 'Yêu thích';
    
    const btnDel = document.createElement('button');
    btnDel.className = 'btn-del';
    btnDel.textContent = 'Xóa';

    div.append(title, info, btnFav, btnDel);
    bookList.append(div);
  });
}

bookList.addEventListener('click', async (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = card.dataset.id;

  if (e.target.classList.contains('btn-fav')) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(fid => fid !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem('favs', JSON.stringify(favorites));
    render();
  }

  if (e.target.classList.contains('btn-del')) {
    if (confirm('Xác nhận xóa?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      books = books.filter(b => b.id !== id);
      render();
    }
  }
});

searchInput.addEventListener('input', render);
genreSelect.addEventListener('change', render);

function validate() {
  let isValid = true;
  const name = document.getElementById('name');
  const author = document.getElementById('author');
  const genre = document.getElementById('genre');
const year = document.getElementById('year');

  const check = (el, errId, cond, msg) => {
    const err = document.getElementById(errId);
    if (!cond) { err.textContent = msg; el.classList.add('invalid'); isValid = false; }
    else { err.textContent = ''; el.classList.remove('invalid'); }
  };

  check(name, 'nameErr', name.value.trim().length >= 3, 'Tên >= 3 ký tự');
  check(author, 'authorErr', author.value.trim().length > 0, 'Bắt buộc');
  check(genre, 'genreErr', genre.value.trim().length > 0, 'Bắt buộc');
  
  const y = Number(year.value);
  check(year, 'yearErr', y >= 1900 && y <= new Date().getFullYear(), 'Năm không hợp lệ');

  return isValid;
}

['name', 'author', 'genre', 'year'].forEach(id => {
  document.getElementById(id).addEventListener('input', validate);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) return;
  
  const newBook = {
    name: document.getElementById('name').value.trim(),
    author: document.getElementById('author').value.trim(),
    genre: document.getElementById('genre').value.trim(),
    year: Number(document.getElementById('year').value)
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  });
  const data = await res.json();
  books.unshift(data);
  updateGenres();
  render();
  form.reset();
});

loadBooks();
