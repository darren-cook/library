const tableFull = document.querySelector("#bookTable");
const newBookForm = document.querySelector("#formContainer");
const tableTotals = document.querySelector("#tableTotals");

const addButton = document.querySelector("#addButton");
const submitButton = document.querySelector("#submitButton");
const editButton = document.querySelector("#editButton")
const actionButtons = document.querySelectorAll(".actionButton");
const actionCol = document.querySelector("#actions");

const newBookTitleForm = document.querySelector("#newBookTitle");
const newBookAuthorForm = document.querySelector("#newBookAuthor");
const newBookPagesForm = document.querySelector("#newBookPages");
const newBookReadForm = document.querySelector("#newBookRead");
const newBookRatingForm = document.querySelector("#newBookRating");

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

function displayBook(libraryArrayIndex){
    const tableRow = document.createElement("tr");
    tableRow.dataset.index = myLibrary.length-1;
    tableRow.className = "tableRow";

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

    const editButton = document.createElement("input");
    const deleteButton = document.createElement("input");

    editButton.type = "button";
    editButton.className = "actionButton";
    editButton.dataset.index = myLibrary.length-1;
    editButton.value = "edit";

    deleteButton.type = "button";
    deleteButton.className = "actionButton";
    deleteButton.dataset.index = myLibrary.length-1;
    deleteButton.value = "del";

    tableRow.appendChild(titleData);
    tableRow.appendChild(authorData);
    tableRow.appendChild(pagesData);
    tableRow.appendChild(readData);
    tableRow.appendChild(ratingData);
    tableRow.appendChild(editButton);
    tableRow.appendChild(deleteButton);

    tableFull.appendChild(tableRow)
}

addButton.addEventListener("click", function(){
    displaySubmitForm();
    hideTableTotals();
})

submitButton.addEventListener("click", function(){
    hideSubmitForm();
    gatherData();
    clearData();
    displayBook(myLibrary[myLibrary.length-1]);
    displayTableTotals();
})

function displaySubmitForm() {
    newBookForm.style.display = "flex";
    addButton.style.display = "none";
    submitButton.style.display = "inline-block"
    editButton.style.display = "none";
}

function hideSubmitForm() {
    newBookForm.style.display = "none";
    addButton.style.display = "inline-block";
    submitButton.style.display = "none";
    editButton.style.display = "none";
}

function gatherData() {
    const newBookTitleData = newBookTitleForm.value;
    const newBookAuthorData = newBookAuthorForm.value;
    const newBookPagesData = newBookPagesForm.value;
    const newBookReadData = newBookReadForm.value === "true" ? "Read":"Not Read";
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

function hideTableTotals() {
    if (myLibrary.length === 0){
        tableTotals.textContent = "";
    }
}

function displayTableTotals() {
    const bookTotal = myLibrary.length;
    const authorTotal = tallyAuthors(myLibrary);
    const pagesTotal = tallyPages(myLibrary);
    const averageRating = tallyAverageRating(myLibrary);

    tableTotals.textContent = `Book Count: ${bookTotal} | Author Count: ${authorTotal} | Page Total: ${pagesTotal} | Average Rating: ${averageRating}` 
}

function tallyAuthors(libraryArray) {
    const uniqueAuthors = [];
    libraryArray.forEach(function(item){
        const author = item.author.toLowerCase();
        if (uniqueAuthors.includes(author)) {
            // break
        } else {
            uniqueAuthors.push(author);
        }
    })
    return uniqueAuthors.length;
}

function tallyPages(libraryArray) {
    let pageCount = 0;
    libraryArray.forEach(function(item){
        pageCount += Number(item.pages);
    })
    return pageCount;
}

function tallyAverageRating(libraryArray) {
    let totalRating = 0;
    let numOfRatings = libraryArray.length;
    libraryArray.forEach(function(item){
        totalRating += Number(item.rating);
    })
    return (totalRating/numOfRatings).toFixed(1);
}

tableFull.addEventListener("click", function(e){
    if (e.target.classList.contains("actionButton")){
        if (e.target.value === "del"){
            deleteBook(e.target.dataset.index);
        } else {
            editBook(e.target.dataset.index);
        }
    }   
})

function deleteBook(libraryIndex) {
    myLibrary.splice(libraryIndex, 1);
    resetLibraryDisplay();
    clearData();
    hideSubmitForm();
}

function resetLibraryDisplay(){
    const tableBody = document.querySelector("#bookTable");
    while (tableBody.childNodes.length) {
        tableBody.removeChild(tableBody.childNodes[0]);
    }
    tempMyLibrary = myLibrary;
    myLibrary = [];
    tempMyLibrary.forEach(function(item){
        myLibrary.push(item);
        displayBook(item);
    })
    displayTableTotals();
}

function editBook(libraryIndex){
    displayEditForm(myLibrary[libraryIndex].title, myLibrary[libraryIndex].author, myLibrary[libraryIndex].pages, myLibrary[libraryIndex].read, myLibrary[libraryIndex].rating, libraryIndex);
}

function displayEditForm(title, author, pages, read, rating, index){
    newBookTitleForm.value = title;
    newBookAuthorForm.value = author;
    newBookPagesForm.value = pages;
    newBookReadForm.value = read === "Read" ? true : false;
    newBookRatingForm.value = rating;

    newBookForm.style.display = "flex";
    addButton.style.display = "none";
    submitButton.style.display = "none"
    editButton.style.display = "inline-block";
    editButton.dataset.index = index;
}

editButton.addEventListener("click", function(){
    const editedBookTitleData = newBookTitleForm.value;
    const editedBookAuthorData = newBookAuthorForm.value;
    const editedBookPagesData = newBookPagesForm.value;
    const editedBookReadData = newBookReadForm.value === "true" ? "Read":"Not Read";
    const editedBookRatingData = newBookRatingForm.value;

    myLibrary[editButton.dataset.index].title = editedBookTitleData;
    myLibrary[editButton.dataset.index].author = editedBookAuthorData;
    myLibrary[editButton.dataset.index].pages = editedBookPagesData;
    myLibrary[editButton.dataset.index].read = editedBookReadData;
    myLibrary[editButton.dataset.index].rating = editedBookRatingData;


    clearData();
    hideSubmitForm();
    resetLibraryDisplay();
    displayTableTotals();
})

