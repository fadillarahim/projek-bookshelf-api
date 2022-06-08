const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [
  // Route Untuk Menyimpan Buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },

  // Route Untuk Menampilkan Seluruh Buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },

  // Route Untuk Menampilkan Buku berdasarkan ID
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },

  // Route Untuk Mengubah Isi Data Buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },

  // Route Untuk Menghapus Buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
];

// Ekspor Routes
module.exports = routes;
