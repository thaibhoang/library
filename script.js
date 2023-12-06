function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.infor = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead ? 'aldready read' : 'not read yet'}`;
    }
}

const harryPotter1 = new Book("Harry Potter and the Philosopher's Stone",'J. K. Rowling',200, false);
harryPotter1.infor();