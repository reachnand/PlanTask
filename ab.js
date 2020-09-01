
//import Task from "./task.js"
import TaskManager from "./taskmanager.js"

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