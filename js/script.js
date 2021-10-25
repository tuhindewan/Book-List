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

    static addToBookList(book) {
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

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static removeBookFromList(target){
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove(); 
            Validation.showAlert("Book removed!", 'success');
        }
    }
}

// Validation class

class Validation {

    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form  =document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// Store class

class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static storeBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(book => {
            List.addToBookList(book);
        });
    }

    static removeBookFromStore(isbn){
        let books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Get the form element

let form = document.querySelector("#book-form");
let book_list = document.querySelector('#book-list');
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listener

form.addEventListener('submit', newBook);
book_list.addEventListener('click', removeBook);

// Define functions

function newBook(e) {
    let title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    let book = new Book(title, author, isbn);

    if (title === '' || author === '' || isbn === '') {
        Validation.showAlert("Please fill all the fields!", 'error');
    }else{
        List.addToBookList(book);
        Store.storeBook(book);
        List.clearFields();
        Validation.showAlert("Book added!", 'success');
    }    
    

    e.preventDefault();
}

// Remove book
function removeBook(e) {
    List.removeBookFromList(e.target);
    Store.removeBookFromStore(e.target.parentElement.previousElementSibling.textContent.trim());
    e.preventDefault();
}