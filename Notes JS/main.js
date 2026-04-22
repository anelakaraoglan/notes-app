import { refreshMenus, showMenu } from "./utils.js";



//BRINGING HTML ELEMENTS TO JS


const openBtn = document.querySelector(".add-box");
var deleteBtns = document.querySelectorAll(".menu-btn");


var notes = []

document.addEventListener("DOMContentLoaded", () => {
    // we want to render the notes when the page loads


    // get the notes from LOCAL STORAGE when the page loads

    notes = JSON.parse(localStorage.getItem("notes")) || [];

    renderNotes();

});

// we want to display the notes on the page when it loads

const renderNotes = (note) => {

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
                    <i class='bx  bx-dots-horizontal-rounded menu-btn'  ></i> 

                    <ul class="menu">
                        <li class="edit-btn">
                            <i class='bx bx-edit' ></i>
                            Edit
                        </li>
                        <li class="delete-btn">
                            <i class='bx bx-trash' ></i>
                            Delete
                        </li>
                    </ul>   
                </div>
            </div>

        </div>


    `

        openBtn.insertAdjacentHTML("afterend", newNote);


    }
}


// console.log(closeBtn);



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
const container = document.querySelector(".wrapper");

form.addEventListener("submit", (e) => {

    // in html pages refresh after form submission, but we dont want that, so we will prevent the default behaviour of the form

    e.preventDefault();

    const newNote =
        `
            <div class="note">
            <div class="details">
                <h2 class="title">${titleInput.value}</h2>
                <p class="description">${descInput.value}</p>
            </div>

            <div class="bottom">
                <span class="date">${new Date()}</span>

                <div class="settings">
                    <!-- BUTTON -->
                    <i class='bx  bx-dots-horizontal-rounded menu-btn'  ></i> 

                    <ul class="menu">
                        <li class="edit-btn">
                            <i class='bx bx-edit' ></i>
                            Edit
                        </li>
                        <li class="delete-btn">
                            <i class='bx bx-trash' ></i>
                            Delete
                        </li>
                    </ul>   
                </div>
            </div>

        </div>
    `
    openBtn.insertAdjacentHTML("afterend", newNote);

    // SAVING A NOTE TO LOCAL STORAGE

    // 1. we need to create an object for each note and push it to the notes array
    notes.push({
        title: titleInput.value,
        description: descInput.value,
        date: new Date(),
        id: Date.now() // Unique identifier for each note
    });

    // 2. converting to json format and saving to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    refreshMenus();
});

// apendChild adds the new note at the end of the container..we will use insertAdjacentHTML to add the new note at the beginning of the container
// container.appendChild(newNote);


// after adding the new note we want to update the deleteBtns variable to include the new note's menu button





// LOCAL STORAGE
// we want to save the notes in local storage so that when we refresh the page the notes are still there
//We will store notes as an array of objects, where each object contains the note's title, description, and date. To save this array in local storage, you'll use JSON.stringify to convert it into a string. When retrieving notes, you'll use JSON.parse to convert the string back into an array.
//The workflow includes saving notes to local storage when a new note is added, retrieving and displaying notes when the page loads, and updating local storage when notes are edited or deleted. Each note will use its date as a unique identifier, making it easier to manage individual notes.







