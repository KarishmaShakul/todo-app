document.addEventListener("DOMContentLoaded",() => {
 const storedTask = JSON.parse(localStorage.getItem('tasks'))

 if(storedTask){
  storedTask .forEach((task) => tasks.push(task))
  updateTaskList();
  updateStats();
 }
})


let tasks = [];

const savedTask = () => {
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
const addtask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const text=taskInput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});
        taskInput.value ="";
        updateTaskList();
        updateStats();
        savedTask();
    }
}
 
 const toggleTaskComplete = (index) => {
    tasks[index].completed= !tasks[index].completed;
    updateTaskList();
    updateStats();
    savedTask();
}

const editTask = (index) => {
    const taskInput=document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTaskList() ;
    updateStats();
    savedTask();
}
 
const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList(); 
    updateStats();
    savedTask();
}

const updateStats = () => {
    const totalTask = tasks.length;
    const completedTask = tasks.filter(tasks => tasks.completed).length;
    let progressCalculate = 0;
    if(totalTask > 0){
        progressCalculate = (completedTask/totalTask)*100;
    }
    const progress = document.getElementById("progress");
    progress.style.width = `${progressCalculate}%`;

    document.getElementById("count").innerText=`${completedTask}/${totalTask}`;
    if(tasks.length && completedTask === totalTask){
        blast();
    }
}



 const updateTaskList = () =>{
    const  taskList  = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task  ${task.completed ? "completed" : ""} ">
                <input type = "checkbox" class = "checkbox" ${task.completed ? "checked" : "" }/>
                <p>${task.text}</p> 
            </div>

            <div class="icons">
                <svg id = "edit" onclick = "editTask(${index})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"//>
                </svg>
                <svg id="delete" onclick = "deleteTask(${index})"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </div>
        </div>
        `;
        listItem.addEventListener("change",()=>toggleTaskComplete(index)) 
        taskList.append(listItem); 
        updateStats();
        savedTask();
    });
}






document.getElementById("taskSubmit").addEventListener("click",(event)=>{
    event.preventDefault();
    addtask();
});

const blast = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}


