let UserInput = document.getElementById("TaskInput");
let AddButton = document.getElementById("Add-Button");
let Tabs = document.querySelectorAll(".Task-Tabs div");
let TaskList = [];
let filterList = [];
let mode = "All";

AddButton.addEventListener("click", AddTask);

for(let i=1; i<Tabs.length; i++){
    Tabs[i].addEventListener("click", function(event){filter(event);});
}
console.log(Tabs);

function filter(event){
    filterList = [];
    mode = event.target.id;
    if(mode === "All"){
        render();
    }else if(mode === "Ongoing"){
        for(let i = 0; i<TaskList.length; i++){
            if(TaskList[i].isComplete == false){
                filterList.push(TaskList[i]);
            }
        }
        render();
    }else if(mode === "Done"){
        for(let i = 0; i<TaskList.length; i++){
            if(TaskList[i].isComplete == true){
                filterList.push(TaskList[i]);
            }
    }
    render();
    }
}
function AddTask(){
    let Task = {
        id: random(),
        TaskContent: UserInput.value, 
        isComplete: false
    }
    TaskList.push(Task);
    render();
}

function render(){
    let resultHTML = ``;
    let list = [];

    if(mode === "All"){
       list = TaskList;
    }else {
        list = filterList;
    }
    
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class = "Task">
            <div class="task-done">${list[i].TaskContent}</div>
            <div>
                <button onclick = "toggleComplete(${list[i].id})">Check</button>
                <button onclick = "deleteTask(${list[i].id})">Delete</button>
            </div>
        </div>`;
        }else{
       resultHTML += `<div class = "Task">
       <div>${list[i].TaskContent}</div>
       <div>
           <button onclick = "toggleComplete(${list[i].id})">Check</button>
           <button onclick = "deleteTask(${list[i].id})">Delete</button>
       </div>
   </div>`;}
    }
    document.getElementById("Task-Board").innerHTML = resultHTML;
}
 
function toggleComplete(id){
    console.log("id:",id); 
    for(let i=0; i<TaskList.length; i++){
        if(TaskList[i].id == id){
            TaskList[i].isComplete = !TaskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(TaskList);
 }

function random(){
    Math.random().toString(36).substring(2, length+2);
} 

function deleteTask(id){
   for(let i=0; i<TaskList.length;i++){
    if(TaskList[i].id == id){
        TaskList.splice(i,1);
        break;
    }
   }
   console.log(TaskList);
   render();
}
