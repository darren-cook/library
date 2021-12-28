let myLibrary = [];

function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
    this.info = function() {
        return(`${title} by ${author} is ${pages} pages long. It ${read} been read.`)
    }
}

function addBookToLibrary(title, author, pages, read, rating){
    const bookToAdd = new Book(title, author, pages, read, rating);
    myLibrary.push(bookToAdd);
}

function displayLibrary(libraryArray) {
    const tableFull = document.querySelector("#bookTable");
    libraryArray.forEach(function(item){
        const tableRow = document.createElement("tr");

        const titleData = document.createElement("td");
        const authorData = document.createElement("td");
        const pagesData = document.createElement("td");
        const readData = document.createElement("td");
        const ratingData = document.createElement("td");

        titleData.textContent = item.title;
        authorData.textContent = item.author;
        pagesData.textContent = item.pages;
        readData.textContent = item.read;
        ratingData.textContent = item.rating;

        tableRow.appendChild(titleData);
        tableRow.appendChild(authorData);
        tableRow.appendChild(pagesData);
        tableRow.appendChild(readData);
        tableRow.appendChild(ratingData);

        tableFull.appendChild(tableRow)
    })
}

addBookToLibrary("The Hobbit", "Tolkien", "349", "Not Read", "4.5")
addBookToLibrary("LOTR", "JRR", "849", "Read", "3.0")
displayLibrary(myLibrary)
console.log(myLibrary)

