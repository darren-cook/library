let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return(`${title} by ${author} is ${pages} pages long. It ${read} been read.`)
    }
}

function addBookToLibrary(title, author, pages, read){
    const bookToAdd = new Book(title, author, pages, read);
    myLibrary.push(bookToAdd);
}

function displayLibrary(libraryArray) {
    const bookContainer = document.querySelector("#bookContainer");
    libraryArray.forEach(function(item){
        const bookDetails = document.createElement("div");
        bookDetails.textContent = item.info();
        bookContainer.appendChild(bookDetails)
    })
}

addBookToLibrary("The Hobbit", "Tolkien", "349", "has not")
addBookToLibrary("LOTR", "JRR", "849", "has")
displayLibrary(myLibrary)

