import { refreshMenus, popupBox, popup, setEditValues, resetEditValues } from "./utils.js";



//BRINGING HTML ELEMENTS TO JS


const openBtn = document.querySelector(".add-box");

var notes = [];

document.addEventListener("DOMContentLoaded", () => {
    // we want to render the notes when the page loads


    // get the notes from LOCAL STORAGE when the page loads

    notes = JSON.parse(localStorage.getItem("notes")) || [];

    renderNotes();
    refreshMenus(notes, renderNotes);

});

// we want to display the notes on the page when it loads

const renderNotes = () => {

    document.querySelectorAll(".note").forEach((note) => note.remove());

    for (let note of notes) {
        const newNote = `
            <div class="note">
            <div class="details">
                <h2 class="title">${note.title}</h2>
                <p class="description">${note.description}</p>
            </div>

            <div class="bottom">
                <span class="date">${note.date}</span>

                <div class="settings">
                    <!-- BUTTON -->
                    <i class='bx  bx-dots-horizontal-rounded menu-btn'></i> 

                    <ul class="menu">
                        <li class="edit-btn" data-id="${note.id}">
                            <i class='bx bx-edit'></i>
                            Edit
                        </li>
                        <li class="delete-btn" data-id="${note.id}">
                            <i class='bx bx-trash'></i>
                            Delete
                        </li>
                    </ul>   
                </div>
            </div>

        </div>
    `;

        openBtn.insertAdjacentHTML("afterend", newNote);
    }
};



// ADDING A NEW NOTE
//1. we need to get the title and description values from the popup box
// 2. we need to get the form element when the user submits the form
//3. when the user submits the form I want to:
// 4. to create a new note in JS 
// 5. then replace the default title, description and date with the user input values
// 6. then add or inject this html into notes container

const titleInput = document.querySelector("#title-input");
const descInput = document.querySelector("#description-input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {

    // in html pages refresh after form submission, but we dont want that, so we will prevent the default behaviour of the form

    e.preventDefault();

    // stop empty notes
    if (titleInput.value.trim() === "" || descInput.value.trim() === "") {
        alert("Please fill in both fields");
        return;
    }

    // if we are editing, update old note
    if (setEditValues.isEditMode) {
        const noteIndex = notes.findIndex((note) => note.id == setEditValues.editNoteId);

        if (noteIndex !== -1) {
            notes[noteIndex].title = titleInput.value;
            notes[noteIndex].description = descInput.value;
            notes[noteIndex].date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
        }
    }

    // if we are not editing, create a brand new note
    else {
        const noteId = Date.now();

        notes.push({
            title: titleInput.value,
            description: descInput.value,
            date: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
            id: noteId // Unique identifier for each note
        });
    }

    // 2. converting to json format and saving to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes();
    refreshMenus(notes, renderNotes);

    // close popup after adding note
    popupBox.classList.remove("show");
    popup.classList.remove("show");

    // clear form inputs
    form.reset();
    resetEditValues();
});

// LOCAL STORAGE
// we want to save the notes in local storage so that when we refresh the page the notes are still there
//We will store notes as an array of objects, where each object contains the note's title, description, and date. To save this array in local storage, you'll use JSON.stringify to convert it into a string. When retrieving notes, you'll use JSON.parse to convert the string back into an array.
//The workflow includes saving notes to local storage when a new note is added, retrieving and displaying notes when the page loads, and updating local storage when notes are edited or deleted. Each note will use its date as a unique identifier, making it easier to manage individual notes.