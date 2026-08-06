let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
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
function submit() {
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = Number(pagesInput.value);
  if (
    titleValue === "" ||
    authorValue === "" ||
    pagesInput.value.trim() === ""
  ) {
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
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    checkInput.checked = false;
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
  const rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
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
    const DeleteBtn = document.createElement("button");
    deleteCell.appendChild(DeleteBtn);
    DeleteBtn.className = "btn btn-warning";
    DeleteBtn.textContent = "Delete";
    DeleteBtn.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
window.submit = submit;
