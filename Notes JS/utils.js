var menus = document.querySelectorAll(".settings");
var deleteBtns = document.querySelectorAll(".menu-btn");
const closeBtn = document.querySelector("#close-btn");
const openBtn = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popup = document.querySelector(".popup");

// we need a standard function to open the settings box of each note
const showMenu = (button)=>{

    console.log(button);
    // we need to add show class to the settings box
    // the button is the 3 dots button but has no menu class
    // we need to get the menu class from the parent element of the button

    button.parentElement.classList.add("show");

    // when we click anywhere outside the menu, the menu should close

}



const refreshMenus = ()=>{
         deleteBtns = document.querySelectorAll(".menu-btn");
         menus = document.querySelectorAll(".settings");

        for(let btn of deleteBtns){
            btn.addEventListener("click", ()=>{
                showMenu(btn);
            });
        }
    }
// we need to close the menu if we click anywhere outside, on the body element

document.body.addEventListener("click", (e)=>{

    // event parameter has a property called target which tells us where we clicked, when we clicked, x and y coordinates
    // console.log(e);
    // event.target is the element we clicked on
    if(!e.target.closest (".settings")){
        for(let menu of menus){
        menu.classList.remove("show");
        }
    }
});

// close btn functionality 

closeBtn.addEventListener("click", ()=>{
    // alert("You clicked the close button")

    popupBox.classList.remove("show");
    popup.classList.remove("show");
})

// open Btn functionality

openBtn.addEventListener("click", ()=>{
    // we want to add show to both popup and popup box

    popupBox.classList.add("show");
    popup.classList.add("show");
})



// we need to add event listener to all the menu buttons
// we have n number of menu buttons so we will use for of loop 
for(let btn of deleteBtns){
    btn.addEventListener("click", ()=>{
        showMenu(btn);
    })
}

export {refreshMenus, showMenu};