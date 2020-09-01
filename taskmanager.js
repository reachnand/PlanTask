import Task from "./task.js"
export default class TaskManager {
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