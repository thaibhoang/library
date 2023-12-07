
function Book(title, author, pages, imgUrl, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.imgUrl = imgUrl;
    this.infor = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead ? 'aldready read' : 'not read yet'}`;
    }
};
const book1 = new Book("Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming", 'Marijn Haverbeke Author', 472, "https://m.media-amazon.com/images/I/91asIC1fRwL._SL1500_.jpg", false);
const book2 = new Book("JavaScript: The Definitive Guide: Master the World's Most-Used Programming Language", 'David Flanagan', 704, "https://m.media-amazon.com/images/I/91hUer84PpL._SL1500_.jpg", false);
const book3 = new Book("JavaScript and jQuery: Interactive Front-End Web Development", 'Jon Duckett', 640, "https://m.media-amazon.com/images/I/61u7pEHMZUL._SL1500_.jpg", false);


const myLibrary = [];
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

const main = document.querySelector('main');
function addCard(book, serial) {
    const img = document.createElement('img');
    const divImg = document.createElement('div');
    const divTitle = document.createElement('div');
    const divAuthor = document.createElement('div');
    const divPage = document.createElement('div');
    const readButton = document.createElement('button');
    const divCard = document.createElement('div');
    const removeButton = document.createElement('button');

    divImg.appendChild(img);
    divCard.appendChild(divImg);
    divCard.appendChild(divTitle);
    divCard.appendChild(divAuthor);
    divCard.appendChild(divPage);
    divCard.appendChild(readButton);
    divCard.appendChild(removeButton);
    main.appendChild(divCard)

    img.setAttribute("src", book.imgUrl);
    img.setAttribute("style", "height: 400px; width: 300px;");
    divTitle.textContent = book.title;
    divAuthor.textContent = `By ${book.author}`;
    divPage.textContent = `${book.pages} pages`;
    readButton.textContent = `${book.isRead ? 'Already read' : 'Not read yet'}`;
    readButton.setAttribute('type', 'button');
    readButton.setAttribute('data-bookid', `${serial}`);
    removeButton.textContent = 'Remove Book';
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('class', 'removeBook');
    removeButton.setAttribute('data-bookid', `${serial}`);
    divCard.className = 'card';
    addRemoveFunction(removeButton);
    addReadStatusFunction(readButton);
}
function loadCard(){
    for (let i = 0; i < myLibrary.length; i++) {
        addCard(myLibrary[i], i);    
    }
}
loadCard();

function deleteAllCard() {
    main.textContent = '';
}

function addBookToLibrary(book) {
    if (myLibrary.includes(book)) {return;}
    else {
        myLibrary.push(book);
    }
}

const AddBookButton = document.querySelector("#addABook");
const addBookForm = document.querySelector("#addBookForm");
const submitButton = document.querySelector("#submitButton");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const imgUrlInput = document.querySelector("#imgUrl");
const isReadInput = document.querySelector("#isRead");
AddBookButton.addEventListener('click', () => {
    addBookForm.className = 'addBook';
});

function resetAddBook() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    imgUrlInput.value = '';
    isReadInput.checked = false;
}
addBookForm.addEventListener('click', (event) => {
    if ((event.target.id === "addBookForm" && event.target.id !== "bookForm") || event.target.id === "closeForm") {
        addBookForm.className = 'displayNone';
        resetAddBook();
    }
});
addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let imgUrl = imgUrlInput.value;
    let isRead = (isReadInput.value === 'true') ? true : false;
    const newBook = new Book(title, author, pages, imgUrl, isRead);
    addBookToLibrary(newBook);
    addCard(newBook, myLibrary.length);
});

function removeBook(bookId) {
    myLibrary.splice(bookId, 1);
}

function addRemoveFunction(button) {
    button.addEventListener('click', () => {
        const bookId = Number(button.dataset.bookid);
        removeBook(bookId);
        deleteAllCard();
        loadCard();
    });
}

function UpdateIsreadForBook(bookId) {
    const book = myLibrary[bookId]
    book.isRead = book.isRead ? false : true;
}
function addReadStatusFunction(readButton) {
    readButton.addEventListener('click', () => {
        const bookId = Number(readButton.dataset.bookid);
        UpdateIsreadForBook(bookId);
        readButton.textContent = (readButton.textContent === 'Already read') ? 'Not read yet' : 'Already read';
    });
}