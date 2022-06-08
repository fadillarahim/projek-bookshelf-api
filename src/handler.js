const { nanoid } = require('nanoid');
const books = require('./books');

// Handler untuk Menambahkan Buku
const addBookHandler = (request, h) => {
  // Data yang berasal dari Body Request
  const {
    name,
    year,
    author,
    summary,
    publisher,
    readPage,
    pageCount,
    reading,
  } = request.payload;

  // Nilai ID
  const id = nanoid(16);

  // Finished
  const finished = pageCount === readPage;

  // Waktu Insert dan Update
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Respon gagal apabila client tidak melampirkan name buku
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // Respon gagal apabila ukuran readPage lebih besar dari pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  // memasukkan objek atau value
  books.push(newBook);

  // Menentukan apakah newBook sudah masuk kedalam array books
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

// Handler untuk Mendapatkan seluruh data buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const book = books.filter(
      (buku) => buku.name.toLowerCase().includes(name.toLowerCase()),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: book.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (reading !== undefined) {
    const book2 = books.filter(
      (buku2) => Number(buku2.reading) === Number(reading),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: book2.map((bb) => ({
          id: bb.id,
          name: bb.name,
          publisher: bb.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (finished !== undefined) {
    const book3 = books.filter(
      (buku3) => Number(buku3.finished) === Number(finished),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: book3.map((bbb) => ({
          id: bbb.id,
          name: bbb.name,
          publisher: bbb.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

// Handler untuk mendapatkan data buku berdasarkan ID
const getBookByIdHandler = (request, h) => {
  // mendapatkan ID
  const { bookId } = request.params;
  // mendapatkan Objek dari array Books
  const book = books.filter((b) => b.id === bookId)[0];

  // Memastikan books tidak undefined
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler Untuk mengedit Isi Data Book
const editBookByIdHandler = (request, h) => {
  // Mendapatkan ID
  const { bookId } = request.params;

  // Mendapatkan Data Dari Body
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Nilai Update diperbaharui
  const updatedAt = new Date().toISOString();

  // Finished
  const finished = pageCount === readPage;

  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

// Handler Untuk Menghapus Buku
const deleteBookByIdHandler = (request, h) => {
  // Mendapatkan ID
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Pengeksporan menggunakan Objek Literal
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
