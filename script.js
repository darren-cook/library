const tableFull = document.querySelector("#bookTable");
const newBookForm = document.querySelector("#formContainer");

const addButton = document.querySelector("#addButton");
const submitButton = document.querySelector("#submitButton")

const newBookTitleForm = document.querySelector("#newBookTitle");
const newBookAuthorForm = document.querySelector("#newBookAuthor");
const newBookPagesForm = document.querySelector("#newBookPages");
const newBookReadForm = document.querySelector("#newBookRead");
const newBookRatingForm = document.querySelector("#newBookRating");


let myLibrary = [];

addBookToLibrary("Sample Title", "Sample Author", "xxx", "Not Read", "x/5")
displayLibrary(myLibrary);

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

function displayBook(libraryArrayIndex){
    const tableRow = document.createElement("tr");

    const titleData = document.createElement("td");
    const authorData = document.createElement("td");
    const pagesData = document.createElement("td");
    const readData = document.createElement("td");
    const ratingData = document.createElement("td");

    titleData.textContent = libraryArrayIndex.title;
    authorData.textContent = libraryArrayIndex.author;
    pagesData.textContent = libraryArrayIndex.pages;
    readData.textContent = libraryArrayIndex.read;
    ratingData.textContent = libraryArrayIndex.rating;

    tableRow.appendChild(titleData);
    tableRow.appendChild(authorData);
    tableRow.appendChild(pagesData);
    tableRow.appendChild(readData);
    tableRow.appendChild(ratingData);

    tableFull.appendChild(tableRow)
}

addButton.addEventListener("click", function(){
    displaySubmitForm();
})

submitButton.addEventListener("click", function(){
    hideSubmitForm();
    gatherData();
    clearData();
    displayBook(myLibrary[myLibrary.length-1]);
})

function displaySubmitForm() {
    newBookForm.style.display = "flex";
    addButton.style.display = "none";
    submitButton.style.display = "inline-block"
}

function hideSubmitForm() {
    newBookForm.style.display = "none";
    addButton.style.display = "inline-block";
    submitButton.style.display = "none"
}

function gatherData() {
    const newBookTitleData = newBookTitleForm.value;
    const newBookAuthorData = newBookAuthorForm.value;
    const newBookPagesData = newBookPagesForm.value;
    const newBookReadData = newBookReadForm.value;
    const newBookRatingData = newBookRatingForm.value;

    addBookToLibrary(newBookTitleData, newBookAuthorData, newBookPagesData, newBookReadData, newBookRatingData);
}

function clearData() {
    newBookTitleForm.value = "";
    newBookAuthorForm.value = "";
    newBookPagesForm.value = "";
    newBookReadForm.value = "";
    newBookRatingForm.value = "";
}

