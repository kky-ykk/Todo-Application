/**
 * The above JavaScript code manages a task list by allowing users to add, edit, save, and delete
 * tasks, storing the tasks in local storage.
 */
let todosObject={};
let str_todosObject="";

//checking if task is already there
str_todosObject=localStorage.getItem("task");

if(str_todosObject!=null){
    let obj=JSON.parse(str_todosObject);
    todosObject={...obj};
    console.log(todosObject);
}

let count=Object.keys(todosObject).length+1;

let notesContainer=document.querySelector(".notes");

if(count>1){
    for(let id in todosObject){
        let newNote=`
        <div class="container">
            <div id="task">Task <span id="id">${id}</span></div>
            <div class="input-txt">
                <textarea name="text" id="todo-textarea" class="todo txtArea"  >${todosObject[id]}</textarea>
            </div>
            <div class="btns">
                <button class="save" >SAVE</button>
                <button class="edit" >EDIT</button>
                <button class="delete" >DELETE</button>
            </div>
        </div>    
        `;
    
        notesContainer.insertAdjacentHTML('beforeend',newNote);
    }
}

function addNote() {
    let newNote=`
    <div class="container">
        <div id="task">Task <span id="id">${count++}</span></div>
        <div class="input-txt">
            <textarea name="text" id="todo-textarea" class="todo txtArea"  ></textarea>
        </div>
        <div class="btns">
            <button class="save" >SAVE</button>
            <button class="edit" >EDIT</button>
            <button class="delete" >DELETE</button>
        </div>
    </div>    
    `;
    
    notesContainer.insertAdjacentHTML('beforeend',newNote);
    
}

notesContainer.addEventListener("click",(event)=>{
    let et=event.target;
    if(et.classList.contains("save"))
        save(et);
    if(et.classList.contains("edit"))
        edit(et);
    if(et.classList.contains("delete"))
        del(et);
});

function save(et) {
    console.log("save");
    console.log();
    let txtArea=et.parentElement.parentElement.querySelector(".todo");
    txtArea.setAttribute("readOnly",true);
    et.setAttribute("disabled","true");
    
    let id=+et.parentElement.parentElement.querySelector("#id").textContent;
    saveToStorage(id,txtArea.value);
}

function edit(et) {
    console.log("edit");
    et.parentElement.parentElement.querySelector(".todo").removeAttribute("readOnly");
    et.parentElement.querySelector(".save").removeAttribute("disabled");
}

//delete button
function del(et) {
    console.log("delete");
    et.parentElement.parentElement.remove();
    let id=+et.parentElement.parentElement.querySelector("#id").textContent;
    deleteFromStorage(id);
}

// -----adding to object and localStorage
function saveToStorage(id,txt) {
    todosObject[id]=txt;
    console.log(todosObject);

    str_todosObject=JSON.stringify(todosObject);
    console.log(str_todosObject);
    localStorage.setItem("task",str_todosObject);
}


function deleteFromStorage(id){
    delete todosObject[id];
    
    str_todosObject=JSON.stringify(todosObject);
    console.log(str_todosObject);
    localStorage.setItem("task",str_todosObject);
}