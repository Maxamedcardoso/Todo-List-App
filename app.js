const inputfilled=document.querySelector(".inputfill");
const form=document.querySelector(".form");
const tasks=document.querySelector(".tasks");
const filterr=document.querySelector(".filter");
console.log(filterr)
form.addEventListener("submit",add);
tasks.addEventListener("click",removeitm)
filterr.addEventListener("keyup",searchtask)

function add(e){
    
    if(inputfilled.value===""){
        alert("please enter task")
    }else{
        
        //add new li
        const li =document.createElement("li")
        li.classList="task"
        //  let title=document.createElement("div")
        // title.classList="title"
        // let h3=document.createElement("h3")
        
        // title.appendChild(h3)
        //  li.appendChild(title)
        li.appendChild(document.createTextNode(inputfilled.value))
        
       
       
      
        let icons=document.createElement("div")
        icons.classList="icons";
        let reomve=document.createElement("a")
        reomve.classList="fa fa-trash remove"
       
        // update section
        let update=document.createElement("a")
       
        update.innerHTML='<i class="fa fa-edit"></i>'
        update.addEventListener("click",function(){
            if(update.innerHTML.includes("fa-edit")){
                inputfilled.value=li.firstChild.textContent;
                li.remove();
            }
        })    
    icons.appendChild(reomve);
    icons.appendChild(update);
    li.appendChild(icons);
tasks.appendChild(li);
       
       inputfilled.value="";
    
    
      

    }
    e.preventDefault()
}
function removeitm(e){
if(e.target.classList.contains("remove"))
    {
        if(confirm("are you sure")){
  e.target.parentElement.parentElement.remove()
        }
  
  
} 
}
  function searchtask(e){
    const textinput=e.target.value.toLowerCase()
    const taskitems=document.querySelectorAll(".task");
    taskitems.forEach(function(items){   
        const item=items.firstChild.textContent;
        if(item.toLowerCase().indexOf(textinput)!==-1){
            items.style.display="flex";
        }else{
            items.style.display="none";
        }
    }
    )
  }
