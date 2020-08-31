class Task { //add and update working in local storage
    constructor (id, tname, desc, dueDate, assign, status) 
    {
        this.id = id;
        this.tname = tname;
        this.desc = desc;
        this.dueDate = dueDate;
        this.assign = assign;
        this.status = status;
    }
    htmlString() {
       let htmlStr = `<div class="card">
       <div class="row no-gutters align-items-center" id="editTask">
       <div class="col"> <p class="text-big" id="${this.id}" data-abc="true">${this.tname}</p>
       <p class="text-big">${this.desc}<br>${this.dueDate}<br>${this.assign}<br>${this.status}</p>
       </div>
       <button class="edit btn btn-warning" id="${this.id}"> Edit</button>
        <button class="delete btn btn-danger" id="deleteBtn_${this.id}"> Delete</button>
        </div>`;
        return htmlStr;
    }
    //converting string into HTML
    toElement() {
        const htmlElement = this.htmlString(); //assigning function to var
        const element = document.createRange().createContextualFragment(htmlElement);
         element
             .querySelector("button.edit")
             .addEventListener("click", editTask);
         element
             .querySelector("button.delete")
             .addEventListener("click", delfunc);
            return element;
    }
} //class Task closed

class TaskManager {
    constructor(master)
    {
        this.taskArr = [];
        // checking for the curr id val. if 0 then assign 1 to it
        this.currentId = parseInt(localStorage.getItem('currentId')) || 1;
        localStorage.setItem('currentId', this.currentId);
        this.master = master;
    }

     addTask(tname, desc, dueDate, assign, status) { //Defining Function/Method to Add TASK
        //validation(); 
        const ntask = new Task(`ntask${this.currentId++}`, tname, desc, dueDate, assign, status); //instance for Task class
         this.taskArr.push(ntask); //pushing newtask into tasksarr array
         //adding to local storage
         localStorage.setItem('currentId', this.currentId);
         // to access the object/ string from json
         let mynewtasks = JSON.parse(localStorage.getItem("mytasks")) || []; // local storage 
         mynewtasks.push(ntask);
         localStorage.setItem('mytasks', JSON.stringify(mynewtasks));
     } 

      updateTask(id, tname, desc, dueDate, assign, status) { //Function to update TASK
     for (let i=0; i<this.taskArr.length;i++) {
         if(this.taskArr[i].id === id) {
        this.taskArr[i].tname = tname;
        this.taskArr[i].desc = desc;
        this.taskArr[i].dueDate = dueDate;
        this.taskArr[i].assign = assign; 
        this.taskArr[i].status = status;
        // Local storage
         let mynewtasks = JSON.parse(localStorage.getItem("mytasks"));
        mynewtasks[i].tname = tname;
        mynewtasks[i].desc = desc;
        mynewtasks[i].dueDate = dueDate;
        mynewtasks[i].assign = assign; 
        mynewtasks[i].status = status;
        localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
         break;
         }
        }
    }

      deletFunc(id) {
         for (let i=0; i<this.taskArr.length;i++) {
             if(this.taskArr[i].id === id) {
                 this.taskArr.splice(i,1);
                 // Local storage
        let mynewtasks = JSON.parse(localStorage.getItem("mytasks"));
        mynewtasks.splice(i,1);
        localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
     break;
             }}}

     displayListHtml() {
    
    this.master.innerHTML = "";
    let cardhtml;
    this.taskArr.forEach((ntask) => {
    const taskElement = ntask.toElement();
    this.master.append(taskElement);

      });
    }
}
    const taskcontainer = document.querySelector("#taskcontainer"); //parent master 
    const taskmanager = new TaskManager(taskcontainer); //instance

   addBtn.onclick = function addingtask() {
//    function addingtask() {
    let tname = document.querySelector("#tname"); //accepting user input from form
    let desc = document.querySelector("#desc");   
    let dueDate = document.querySelector("#dueDate");
    let assign = document.querySelector("#assign"); 
    let status = document.querySelector("#status");

    taskmanager.addTask(tname.value,desc.value,dueDate.value,assign.value,status.value); //this will push the array into taskArr[]
    taskmanager.displayListHtml();         
    $('#addTaskModal').modal('hide');
    resetFields();
    }
    
    //addBtn.addEventListener("click", validation);
    function resetFields() {
        tname.value = null;
        desc.value = null;
        dueDate.value = null;
        assign.value = null;
        status.value = null;
    }
    
 function editTask() {
   const btnElement = $(event.target); //A reference to the object on which the event originally occured
   console.log(btnElement);
   const tid = btnElement[0].id;
    const task = taskmanager.taskArr.find((t) => tid === t.id);
    console.log(task);
    alert(task);
    //alert(taskmanager.taskArr.length);
        for(i=0; i<taskmanager.taskArr.length;i++) {
        if(tid==taskmanager.taskArr[i].id) {
    document.querySelector("#editTaskId").value = tid; //accepting user input from form
   // alert(taskmanager.taskArr[i].tname);
      document.querySelector("#edittaskname").value = taskmanager.taskArr[i].tname; //Loading modal with prefilled task details
     document.querySelector("#editdesc").value = taskmanager.taskArr[i].desc;   
     document.querySelector("#editdueDate").value = taskmanager.taskArr[i].dueDate; 
     document.querySelector("#editassign").value = taskmanager.taskArr[i].assign;
    document.querySelector("#editstatus").value = taskmanager.taskArr[i].status;
    break;
        }
    }
    $("#editTaskModal").modal("show");


 }
 let updateTaskBtn = document.querySelector('#updateTaskBtn');
   
 updateTaskBtn.onclick = function() {
    
     let tempId = document.querySelector("#editTaskId").value; //accepting user input from form
     let tempname = document.querySelector("#edittaskname").value; //accepting user input from form
     let tempdesc = document.querySelector("#editdesc").value;   
     let tempdueDate = document.querySelector("#editdueDate").value;
     let tempassign = document.querySelector("#editassign").value; 
     let tempstatus = document.querySelector("#editstatus").value;
    
     taskmanager.updateTask(tempId, tempname, tempdesc, tempdueDate, tempassign, tempstatus);
     //alert("after update")
     taskmanager.displayListHtml();
     $('#editTaskModal').modal('hide');
  }
 
  function delfunc() { //Function to delete TASK
    let taskElement = event.target.closest(".delete");                      //see line 74.
    let delIdArr = taskElement.id.split("_");                               //spliting the id by underscore. i.e . dbuton_id 
    let retreiveId = delIdArr[1];
    alert(retreiveId);
    taskmanager.deletFunc(retreiveId);
    taskmanager.displayListHtml();
  }

  displayStorageTasks();
  function displayStorageTasks() {
      let mynewtasks = JSON.parse(window.localStorage.getItem('mytasks'));
      let displayHtml = "";
      if(mynewtasks) {
          for (let i=0;i < mynewtasks.length; i++) {
            
                displayHtml = `<div class="card">
                <div class="row no-gutters align-items-center" id="editTask">
                <div class="col"> <p class="text-big" id="${this.id}" data-abc="true">${this.tname}</p>
                <p class="text-big">${this.desc}<br>${this.dueDate}<br>${this.assign}<br>${this.status}</p>
                </div>
                <button class="edit btn btn-warning" id="${this.id}"> Edit</button>
                 <button class="delete btn btn-danger" id="deleteBtn_${this.id}"> Delete</button>
                 </div>`;
                 return displayHtml;              
          }
      }
  }