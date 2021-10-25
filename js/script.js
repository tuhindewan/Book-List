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

// Validation class

class Validation {
    constructor(){

    }

    showAlert(message, className){
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
    let validation = new Validation();

    if (title === '' || author === '' || isbn === '') {
        validation.showAlert("Please fill all the fields!", 'error');
    }else{
        list.addToBookList(book);
        list.clearFields();
        validation.showAlert("Book added!", 'success');
    }    
    

    e.preventDefault();
}