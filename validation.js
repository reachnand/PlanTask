
function validation() {
    let addBtn = document.getElementById("#addBtn");
    let tname = document.querySelector("#tname");
    let nameErrMsg = document.querySelector("#nameErrMsg"); 
    let desc = document.querySelector("#desc");
    let descErrMsg = document.querySelector("#descErrMsg");
    let assign = document.querySelector("#assign");
    let assignErrMsg = document.querySelector("#assignErrMsg");
    let dueDate = document.querySelector("#dueDate");
    let dueDateErrMsg = document.querySelector("#dueDateErrMsg");
    let status = document.querySelector("#status");
    let statusErrMsg = document.querySelector("#statusErrMsg");
      
    if ( tname.value == "" || tname.value.length < 5)
        {   
            nameErrMsg.innerHTML="Minium 5 charecters";
            nameErrMsg.style.color="red";
            tname.style.borderColor = "red";
            return false;
        }
        
        else if (desc.value == "" || desc.value.length < 11)     
        { 
            descErrMsg.innerHTML="Min 10 Charecters";
            descErrMsg.style.color="red";
            desc.style.borderColor = "red"; 
            //desc.focus(); 
           // return false; 
        } 
        
        else if ( dueDate.value == "")                       
        { 
           dueDateErrMsg.innerHTML="Please ,Assign a  date in format :mm/dd/yyyy";
           dueDateErrMsg.style.color="red";
            dueDate.style.borderColor = "red"; 
            //dueDate.focus(); 
            return false; 
        } 
        else if (assign.value == "")     
        { 
           assignErrMsg.innerHTML="Please select Assignee name";
           assignErrMsg.style.color="red";
            assign.style.borderColor = "red"; 
           // assign.focus(); 
            return false; 
        } 
        else if (status.value == "")     
        { 
           statusErrMsg.innerHTML="Please select Assignee name";
           statusErrMsg.style.color="red";
            status.style.borderColor = "red"; 
           // status.focus(); 
            return false; 
        } 
    
    else 
        {
            nameErrMsg.innerHTML="Looks Good";
            nameErrMsg.style.color="green";
            tname.style.borderColor = "green";
            descErrMsg.innerHTML="Looks Good";
            descErrMsg.style.color="green";
            desc.style.borderColor = "green";
            dueDateErrMsg.innerHTML="Looks Good";
            dueDateErrMsg.style.color="green";
            dueDate.style.borderColor = "green";
            assignErrMsg.innerHTML="Looks Good";
            assignErrMsg.style.color="green";
            assign.style.borderColor = "green";
            statusErrMsg.innerHTML="Looks Good";
            statusErrMsg.style.color="green";
            status.style.borderColor = "green";
    }

    } //Validation ends

    //document.getElementById("addBtn").onclick=
function editvalidation() {
    let edittaskname = document.querySelector("#edittaskname");
    let enameErrMsg = document.querySelector("#enameErrMsg"); 
    let editdesc = document.querySelector("#editdesc");
    let edescErrMsg = document.querySelector("#edescErrMsg");
    let editassign = document.querySelector("#editassign");
    let eassignErrMsg = document.querySelector("#eassignErrMsg");
    let editdueDate = document.querySelector("#editdueDate");
    let edueDateErrMsg = document.querySelector("#edueDateErrMsg");
    let editstatus = document.querySelector("#editstatus");
    let estatusErrMsg = document.querySelector("#estatusErrMsg");
        
    if ( edittaskname.value == "" || edittaskname.value.length < 5)
        {   
            enameErrMsg.innerHTML="Minium 5 charecters for edit";
            enameErrMsg.style.color="red";
            edittaskname.style.borderColor = "red";
            return false;
        }
        
        else if (editdesc.value == "" || editdesc.value.length < 11)     
        { 
            edescErrMsg.innerHTML="Min 10 Charecters for Edit";
            edescErrMsg.style.color="red";
            editdesc.style.borderColor = "red"; 
            editdesc.focus(); 
            return false; 
        } 
        
        else if ( editdueDate.value == "")                       
        { 
           edueDateErrMsg.innerHTML="Please ,Assign a  date in format :mm/dd/yyyy";
           edueDateErrMsg.style.color="red";
            editdueDate.style.borderColor = "red"; 
            editdueDate.focus(); 
            return false; 
        } 
        else if (editassign.value == "" || editassign.value.length < 4)     
        { 
           eassignErrMsg.innerHTML="Please select Assignee name";
           eassignErrMsg.style.color="red";
           editassign.style.borderColor = "red"; 
           editassign.focus(); 
            return false; 
        } 
        else if (editstatus.value == "" || editstatus.value.length < 2)     
        { 
           estatusErrMsg.innerHTML="Please select Assignee name";
           estatusErrMsg.style.color="red";
           editstatus.style.borderColor = "red"; 
           editstatus.focus(); 
            return false; 
        } 
    
    else 
        {
            enameErrMsg.innerHTML="Looks Good";
            enameErrMsg.style.color="green";
            edittaskname.style.borderColor = "green";
            edescErrMsg.innerHTML="Looks Good";
            edescErrMsg.style.color="green";
            editdesc.style.borderColor = "green";
            edueDateErrMsg.innerHTML="Looks Good";
            edueDateErrMsg.style.color="green";
            editdueDate.style.borderColor = "green";
            eassignErrMsg.innerHTML="Looks Good";
            eassignErrMsg.style.color="green";
            editassign.style.borderColor = "green";
            estatusErrMsg.innerHTML="Looks Good";
            estatusErrMsg.style.color="green";
            editstatus.style.borderColor = "green";
            
    }
    } //Validation ends