const dialog = document.getElementById("dialog");
dialog.addEventListener('click', () => {
  dialog.close();
  dialogForm.reset();
});

const dialogForm = document.getElementById("form");
dialogForm.addEventListener('click', (event) => event.stopPropagation());

const openButton = document.getElementById("open");
openButton.addEventListener("click", () => {
  dialog.returnValue = "";
  dialog.showModal();
});

const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  dialog.close();
  dialogForm.reset();
});

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", () => {

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const numOfPages = document.getElementById("num-of-pages").value;
  const isRead = document.getElementById("is-read").checked;

  addBookToLibrary(title, author, numOfPages, isRead);
  dialog.close();
  dialogForm.reset();
});

function checkform() {
    const f = document.forms["form"].elements;
    let formElements = [f[1], f[2], f[3]]
    let cansubmit = true;

    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].value.length == 0) cansubmit = false;
    }

    document.getElementById('submitButton').disabled = !cansubmit;
    
    if (!cansubmit) document.getElementById('submitButton').title = "Please fill out all input fields."
    else document.getElementById('submitButton').title = "";
};

const myLibrary = [];

const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;

const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
`;

const eyeOffIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
`;

// Book Constructor
function Book(id, title, author, pages, read) {
  if (!new.target) console.log("You need to create the object using the 'New' declaration");
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages, read) {
  const bookId = crypto.randomUUID();

  const newBook = new Book(bookId, title, author, pages, read); 

  myLibrary.push(newBook);
  generateAndRenderBook();
};

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);

  myLibrary.splice(index, 1);

  const bookshelfElement = document.querySelector(".bookshelf");
  const bookElements = bookshelfElement.querySelectorAll(".book")

  bookElements.forEach((book) => {
    if (book.dataset.id === id) {
      bookshelfElement.removeChild(book);
    };
  });

  const bookElement = document.querySelectorAll(`[data-id="${id}"]`);
};

Book.prototype.toggleBookisRead = function() {
  this.read ? this.read = false : this.read = true;
};

/* Add dummy data... */
addBookToLibrary("Drone Adventures", "Pearl", 67, true);
addBookToLibrary("The Art of Turf War", "Callie", 248, true);
addBookToLibrary("Keeping It Fresh", "Marie", 196, false);
addBookToLibrary("How to Win Every Splatfest", "Frye", 182, false);
addBookToLibrary("Big Man's Guide to Good Vibes", "Big Man", 94, true);
addBookToLibrary("Breaking Beats with DJ Octavio", "DJ Octavio", 276, false);
addBookToLibrary("Surviving Salmon Run", "Mr. Grizz", 312, false);
addBookToLibrary("The Squid Research Files", "Cap'n Cuttlefish", 403, true);
addBookToLibrary("Rollers, Chargers & Chaos", "Sheldon", 255, true);
addBookToLibrary("The Great Zapfish Mystery", "Agent 3", 287, false);
addBookToLibrary("The Science of Super Jumping", "Marina", 191, true);

function generateAndRenderBook() {
  const bookshelfElement = document.querySelector(".bookshelf");
  const currentIndex = myLibrary.length - 1;
  const CardElement = document.createElement("div");
  CardElement.classList.add(`book`);
  CardElement.dataset.id = myLibrary[currentIndex].id;
  CardElement.innerHTML = `
                          <div>
                          <div>
                          <h2>${myLibrary[currentIndex].title}</h2>
                          <h3>by ${myLibrary[currentIndex].author}</h3>
                          </div>
                          <div>
                          <p>${myLibrary[currentIndex].pages} pages</p>
                          <p>Read?: <span class="book-read-status">${myLibrary[currentIndex].read === true ? "yes" : "no"}</span></p>
                          </div>
                          </div>
                          <div class="book-btn-container">
                          ${myLibrary[currentIndex].read === true
                            ? `<button type"button" class="book-isread-btn">${eyeOffIcon}</button>`
                            : `<button type"button" class="book-isread-btn">${eyeIcon}</button>`
                          }
                          <button type="button" class="book-remove-btn">${trashIcon}</button>
                          </div>`;

  const bookRemoveBtn = CardElement.querySelector("button.book-remove-btn");
  const bookIsReadBtn = CardElement.querySelector("button.book-isread-btn");

  bookRemoveBtn.addEventListener(("click"), () => {
    removeBookFromLibrary(CardElement.dataset.id);
  });

  bookIsReadBtn.addEventListener(("click"), () => {
    
    const selectedBook = myLibrary.find((selectedBook) => selectedBook.id === CardElement.dataset.id);
    selectedBook.toggleBookisRead();

    const bookIsReadButton = CardElement.querySelector(".book-isread-btn");
    if (selectedBook.read) bookIsReadButton.innerHTML = eyeOffIcon;
    else if (!selectedBook.read) bookIsReadButton.innerHTML = eyeIcon;

    const bookReadStatus = CardElement.querySelector("p span.book-read-status");
    selectedBook.read
    ? bookReadStatus.textContent = "yes"
    : bookReadStatus.textContent = "no";
  });

  bookshelfElement.appendChild(CardElement);
};