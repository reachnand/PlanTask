export default class Task { //add and update working in local storage
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