var menus = document.querySelectorAll(".settings");
var menuBtns = document.querySelectorAll(".menu-btn");
const closeBtn = document.querySelector("#close-btn");
const openBtn = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");
const titleInput = document.querySelector("#title-input");
const descInput = document.querySelector("#description-input");
const popupTitle = document.querySelector(".popup-title");
const popupButton = document.querySelector(".popup-btn");

// this object keeps our edit values
const setEditValues = {
    isEditMode: false,
    editNoteId: null
};

const resetEditValues = () => {
    setEditValues.isEditMode = false;
    setEditValues.editNoteId = null;
};

// we need a standard function to open the settings box of each note
const showMenu = (button) => {

    console.log(button);
    // we need to add show class to the settings box
    // the button is the 3 dots button but has no menu class
    // we need to get the menu class from the parent element of the button

    button.parentElement.classList.add("show");

    // when we click anywhere outside the menu, the menu should close

};

const refreshMenus = (notes, renderNotes) => {
    menuBtns = document.querySelectorAll(".menu-btn");
    menus = document.querySelectorAll(".settings");

    let deleteBtns = document.querySelectorAll(".delete-btn");
    let editBtns = document.querySelectorAll(".edit-btn");

    // this for-loop adds the menu opening functionality to our menu buttons
    for (let btn of menuBtns) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            for (let menu of menus) {
                menu.classList.remove("show");
            }

            showMenu(btn);
        });
    }

    // deleting notes
    for (let btn of deleteBtns) {
        btn.addEventListener("click", (e) => {
            const deleteBtn = e.target.closest(".delete-btn");
            const deleteId = Number(deleteBtn.dataset.id);

            const index = notes.findIndex((note) => note.id == deleteId);

            if (index !== -1) {
                notes.splice(index, 1);
            }

            localStorage.setItem("notes", JSON.stringify(notes));

            renderNotes();
            refreshMenus(notes, renderNotes);
        });
    }

    // editing notes
    for (let btn of editBtns) {
        btn.addEventListener("click", (e) => {
            const editBtn = e.target.closest(".edit-btn");
            const editId = Number(editBtn.dataset.id);

            // show the popup itself
            popup.classList.add("show");
            popupBox.classList.add("show");

            // change the popup heading and button
            popupTitle.innerHTML = "Edit Note";
            popupButton.innerHTML = "Update Note";

            // close the settings menu
            editBtn.closest(".settings").classList.remove("show");

            // find the note we want to edit
            const noteToEdit = notes.find((note) => note.id == editId);

            if (!noteToEdit) return;

            // fill the popup inputs
            titleInput.value = noteToEdit.title;
            descInput.value = noteToEdit.description;

            // set edit mode
            setEditValues.isEditMode = true;
            setEditValues.editNoteId = editId;
        });
    }
};

// we need to close the menu if we click anywhere outside, on the body element
document.body.addEventListener("click", (e) => {

    // event parameter has a property called target which tells us where we clicked, when we clicked, x and y coordinates
    // console.log(e);
    // event.target is the element we clicked on
    if (!e.target.closest(".settings")) {
        for (let menu of menus) {
            menu.classList.remove("show");
        }
    }
});

// close btn functionality
closeBtn.addEventListener("click", () => {
    // alert("You clicked the close button")

    popupBox.classList.remove("show");
    popup.classList.remove("show");
    resetEditValues();
});

// open Btn functionality
openBtn.addEventListener("click", () => {
    // we want to add show to both popup and popup box

    popupBox.classList.add("show");
    popup.classList.add("show");

    popupTitle.innerHTML = "New Note";
    popupButton.innerHTML = "Add Note";

    titleInput.value = "";
    descInput.value = "";

    resetEditValues();
});

export { refreshMenus, showMenu, popupBox, popup, setEditValues, resetEditValues };