window.onload = function () {
    const todosContainer = document.getElementById('todos-container');
    const newTodoInput = document.getElementById('new-todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');

    newTodoInput.onkeydown = function (e) {
        if (e.keycode === 13) {
            createTodo();
        }
    }

    addTodoBtn.onclick = function (e) {
        createTodo();
    }

    fetch('/get-todos')
        .then(response => response.json())
        .then(response => {
            console.log(response);

            response.forEach(todo => {
                insertTodo(todo);
            });
        });

    function insertTodo(todo) {
        let container = document.createElement('div');
        container.id = todo.id;
        container.classList.add('todo');

        let buttonContainer = document.createElement('div');
        buttonContainer.id = todo.id;
        buttonContainer.classList.add('buttonContainer');

        let checksection = document.createElement('div');
        checksection.id = todo.id;
        checksection.classList.add('checksection');




        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox-' + todo.id;
        checkbox.classList.add('checkbox');
        checkbox.checked = todo.complete; 
        checkbox.onchange = function (e) {
            console.log('check box' + todo.id + 'click');
            console.log(checkbox.checked);

            fetch('/update-todo', {
                    method: 'POST',
                    headers: {
                        'Acept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        id: todo.id,
                        complete: checkbox.checked
                    })
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error));
        }
//////////////////////////////////////////////////////////////////////////////////////////////
// let dateSection = document.createElement('div');
// dateSection.id = todo.id;
// dateSection.classList.add('dateSection');

// checkbox.onchange = function (e) {

//     if(checkbox.checked){

//     fetch('/get-created', {
//             method: 'POST',
//             headers: {
//                 'Acept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             credentials: "include",
//             body: JSON.stringify({
//                 id: todo.id,
//                 text: dateSection,
//             })
//         })
//         .then(response => response.json())
//         .then(response => {
//             console.log(response);
//             // text.innerHTML = stuff;
//         })
//         .catch(error => console.log(error));
//     }
// }





////////////////////////////////////////////////////////////////////////////////////////////
        let text = document.createElement('div');
        text.classList.add('text');
        text.innerHTML = todo.text;

        let btn = document.createElement('button');
        btn.id = 'btn' + todo.id;
        btn.classList.add('delete-buton');
        btn.innerHTML = 'Delete';
        btn.onclick = function (e) {
            console.log('deleting' + todo.id);

            fetch('/delete', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        id: todo.id,
                    })
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    if (response.affectedRows) {
                        container.remove();
                    }
                })
                .catch(error => console.log(error));
        }

        //*********************************************** */

        let button = document.createElement('button');
        button.id = 'button' + todo.id;
        button.classList.add('update-buton');
        button.innerHTML = 'Edit';
        button.onclick = function (e) {
            console.log('Update' + todo.id);
            const stuff = window.prompt("Add another to do Item")
            if(stuff === null) return
            fetch('/edit-todo', {
                method: 'POST',
                headers: {
                    'Acept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    id: todo.id,
                    text: stuff,
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                text.innerHTML = stuff;
            })
            .catch(error => console.log(error));
           
        }

        //************************************************ */
        // checksection.appendChild(dateSection);
        checksection.appendChild(checkbox);
        container.appendChild(checksection);
        container.appendChild(text);
        container.appendChild(buttonContainer);
        buttonContainer.appendChild(btn);
        buttonContainer.appendChild(button);

        todosContainer.appendChild(container);
    }

    function createTodo() {
        console.log('add todo');
        if (newTodoInput.value) {
            fetch('/insert-todo', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        text: newTodoInput.value,
                    })
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    if (response.affectedRows) {
                        insertTodo({
                            id: response.insertId,
                            text: newTodoInput.value,
                            complete: false,
                            created: response.created
                        });
                        newTodoInput.value = '';
                    } else {
                        alert('Could not create');
                    }
                })
                .catch(error => console.log(error));
        } else {
            alert('You can not create a todo without text');
        }
    }

}