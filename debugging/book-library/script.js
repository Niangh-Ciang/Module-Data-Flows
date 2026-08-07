let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
document.getElementById("submitBtn").addEventListener("click", submit);
function submit(event) {
  event.preventDefault();
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = Number(pagesInput.value);
  if (titleValue === "" || authorValue === "" || pagesValue <= 0) {
    alert("Please fill all fields!");
    return false;
  }

  if (isNaN(pagesValue) || pagesValue <= 0) {
    alert("Pages must be a positive number!");
    return false;
  } else {
    const book = new Book(
      titleValue,
      authorValue,
      pagesValue,
      checkInput.checked
    );
    myLibrary.push(book);
    render();
    document.getElementById("bookForm").reset();
    $("#demo").collapse("hide");
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");

  table.tBodies[0].innerHTML = "";

  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(-1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.className = "btn btn-success";
    wasReadCell.appendChild(toggleReadBtn);
    toggleReadBtn.textContent = myLibrary[i].check ? "Yes" : "No";

    toggleReadBtn.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const deleteBtn = document.createElement("button");
    deleteCell.appendChild(deleteBtn);
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      const msg = document.createElement("div");
      msg.className = "alert alert-success";
      msg.textContent = `You've deleted title: ${deletedTitle}`;
      document.body.prepend(msg);
      setTimeout(() => msg.remove(), 3000);
    });
  }
}
