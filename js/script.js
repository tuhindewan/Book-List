//Book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
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
    console.log(book);

    e.preventDefault();
}