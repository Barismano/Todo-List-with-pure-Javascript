const todoInput =document.querySelector('.todo-input');
const todoButton =document.querySelector('.todo-button');
const todoList =document.querySelector('.todo-list');
// const Body = document.querySelector('.body');
const filterOption = document.querySelector('.filter-todo');



document.addEventListener('DOMContentLoaded',getTodos);

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo);

// if(localStorage.getItem('todos')==[]){
//   // const notodotext =document.querySelector('.not_todo_text');
//   // notodotext.display='flex';
//   document.getElementById("no-todo-text").style.visibility = "hidden";
// }


function addTodo(event){
    //block submitting
    event.preventDefault();
    
    
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //li create
    const newTodo = document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

   

    //check mark button
    const completedButton =document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton =document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    //append List
    if(todoInput.value!=""){
      saveLocalTodos(todoInput.value);
        todoList.appendChild(todoDiv);
        todoInput.value="";
    }
    else{
      // const warning = document.createElement('p');
      // warning.innerHTML='<p>Please Enter A Valid Value</p>';
      // warning.appendChild('asdasd');
      // console.log('asdasd');
      // document.querySelector('.todo-button').addEventListener('mouseenter', (e) => {
      //   shake(e.target('.todo-input'));
      // });
    }
    
}

function deleteCheck(e){
 const item = e.target;
  if(item.classList[0]==='trash-btn'){
    const todo = item.parentElement;
    // console.log(todo.classList);
    todo.classList.add('fall');

    removeLocalTodo(todo);

    todo.addEventListener('transitionend',function(){
      todo.remove();
    });
  }
  if(item.classList[0]==='completed-btn'){
    const todo= item.parentElement;
    todo.classList.toggle("completed");
    
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) { 
      const mStyle = todo.style;  
      if(mStyle != undefined && mStyle != null){
          switch (e.target.value) {
              case "all":
                  mStyle.display = "flex";
                  break;
              case "completed":
                  if (todo.classList.contains('completed')) {
                      mStyle.display = 'flex';
                  } else {
                      mStyle.display = "none";
                  }
                  break;
              case "uncompleted":
                  if (todo.classList.contains('completed')){
                      mStyle.display = 'none';
                  }
                  else{
                      mStyle.display = "flex";
                  }
                  break;
          }
      }
  });
}



function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos =[];

  }
  else{
    todos =JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  }else{
    todos=JSON.parse(localStorage.getItem("todos"));
  }

  

  todos.forEach(function(todo){

      //Todo Div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //li create
      const newTodo = document.createElement("li");
      newTodo.innerText=todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //check mark button
      const completedButton =document.createElement('button');
      completedButton.innerHTML='<i class="fas fa-check"></i>';
      completedButton.classList.add("completed-btn");
      todoDiv.appendChild(completedButton);
      //check trash button
      const trashButton =document.createElement('button');
      trashButton.innerHTML='<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
      

      
    });

}

function removeLocalTodo(todo){
  let todos;
  if(localStorage.getItem("todos")===null){
    todos=[];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos",JSON.stringify(todos));
}



