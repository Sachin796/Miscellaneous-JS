const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');
console.log(taskInput);
//Load all eventlisteners
loadeventlistener();

function loadeventlistener()
{
form.addEventListener('submit',addTask);
taskList.addEventListener('click',deletetask);
clearBtn.addEventListener('click',removeall)
filter.addEventListener('keyup',filterfunction)
// DOM LOAD EVENT 
document.addEventListener("DOMContentLoaded",getlist)
} 

function getlist()
{
    let listdata;
    if(localStorage.getItem('listdata')===null)
    {
listdata=[];
    }
    else{
        listdata=JSON.parse(localStorage.getItem('listdata'));
    }
    console.log(JSON.parse(JSON.stringify(listdata)))
    listdata.forEach(function(listd){
        const list=document.createElement('li');
        list.className='collection-item';
 
        //Create Text node and append to the child
        list.appendChild(document.createTextNode(listd));
        
        const link=document.createElement('a');
        link.className='delete-item secondary-content'  ;
        link.innerHTML='<i class="fa fa-remove"></i>';
       list.appendChild(link);
       taskList.appendChild(list);
    })
}

function addTask(e)
{
    if(taskInput.value === '')
    {
        alert("Add a task");
    }

    const list=document.createElement('li');
    list.className='collection-item';

    //Create Text node and append to the child
    list.appendChild(document.createTextNode(taskInput.value));
    
    const link=document.createElement('a');
    link.className='delete-item secondary-content'  ;
    link.innerHTML='<i class="fa fa-remove"></i>';
   list.appendChild(link);
   taskList.appendChild(list);
  storelocaldata(taskInput.value);
   taskInput.value="";
   e.preventDefault();
}

function storelocaldata(tl)
{
    let listdata;
    if(localStorage.getItem('listdata')===null)
    {
listdata=[];
    }
    else{
        listdata=JSON.parse(localStorage.getItem('listdata'));
    }
    console.log(listdata);
    console.log(tl);
    listdata.push(tl);
  
    localStorage.setItem('listdata',JSON.stringify(listdata));
}

function deletetask(e)
{
if(e.target.parentElement.classList.contains('delete-item'))
{
    if(confirm('Are you string'))
    {
   e.target.parentElement.parentElement.remove();

   //Remove from localstorage
   removelistfromlocalstorage(e.target.parentElement.parentElement);
}
}
}

function removelistfromlocalstorage(listitem)
{
    let listdata;
    if(localStorage.getItem('listdata')===null)
    {
listdata=[];
    }
    else{
        listdata=JSON.parse(localStorage.getItem('listdata'));
    }
    listdata.forEach(function(item,index){
        if(listitem.textContent === item)
        {
            listdata.splice(index,1);
        }
    });
    localStorage.setItem('listdata',JSON.stringify(listdata));
}

function removeall(e)
{
while(taskList.firstChild)
{
taskList.removeChild(taskList.firstChild);
}
clearlistfromls();
}

function clearlistfromls()
{
    localStorage.clear();
}

function filterfunction(e)
{
const text=e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(task){
const item=task.firstChild.textContent;
if(item.toLowerCase().indexOf(text) != -1)
{
    task.style.display = 'block';
}
else{
    task.style.display = 'none';
}
})
}
