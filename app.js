const add=document.querySelector('.add');
const addTodoInput=document.querySelector('#addTodo');
const search=document.querySelector('.search');
const searchText=document.querySelector('#searchTodo');
const todoList=document.querySelector('#todoList');
const searchList=document.querySelector('#searchList');

let id=0;

function updateList()
{
    let Todo = localStorage.getItem("Todo")
    todoList.innerHTML = ''
    if(Todo)
    {
        Todo = JSON.parse(Todo)
        Todo.map((T) => {
            let {val,ID} = T
            todoList.innerHTML +=
        `
        <li
					class="
						list-group-item
						d-flex
						justify-content-between
						align-items-center
					"
				>
					<span>${val}</span>
					<i class="far fa-trash-alt delete" onclick="deleteTodo(${ID})" ></i>
		</li>
      `;
            
        })
    }
    
}


function deleteTodo(ID){
    ID=parseInt(ID);
    let element = localStorage.getItem("Todo")
    if(element)
    {
        element = JSON.parse(element)
        element = element.filter(mark =>mark.ID !== ID);
        let b = JSON.stringify(element)
        localStorage.setItem('Todo',b)
        updateList()
    }
}

add.addEventListener('submit',function(e){
    
    e.preventDefault()
    input={
        val: addTodoInput.value,
        ID: id+=1
    };
    const todos= localStorage.getItem('Todo')
    if(!todos){
        let todo=[input];
        t=JSON.stringify(todo)
        localStorage.setItem('Todo',t);
        
    }
    else{
        p=JSON.parse(todos)
        p.push(input)
        t=JSON.stringify(p)
        localStorage.setItem('Todo',t)
    }
    updateList();
    this.reset();
    
})

function listSearch(text){
    console.log(text);
    let element=localStorage.getItem('Todo');
    element=JSON.parse(element);
    for (ele of element){
        if(text === ele.val){
            searchList.innerHTML=`
            <h3> Search items </h3>
            <li
                        class="
                            list-group-item
                            d-flex
                            justify-content-between
                            align-items-center
                        "
                    >
                        <span>${ele.val}</span>
                        <i class="far fa-trash-alt delete" onclick="deleteTodo(${ele.ID})" ></i>
            </li>
          `;

        }
        else if(text===""){
            searchList.innerHTML='';
        }
    }
    this.reset;
}

search.addEventListener('submit',function(e){
    e.preventDefault();
    variable=searchText.value;
    listSearch(variable);
})