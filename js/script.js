//Book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// List class

class List {
    constructor() {
        
    }

    addToBookList(book) {
        let book_list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='delete'>X</a></td>
        `;
        book_list.appendChild(row);
    }

    clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Get the form element

let form = document.querySelector("#book-form");

// Event listener

form.addEventListener('submit', newBook);

// Define functions

function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
    
    let book = new Book(title, author, isbn);
    let list = new List();
    list.addToBookList(book);
    list.clearFields();

    e.preventDefault();
}