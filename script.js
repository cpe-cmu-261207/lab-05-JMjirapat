const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
	if (event.key !== "Enter") return;
	if (inputAdd.value == "") {
		alert("To do cannot be empty");
		return;
	}
	addTodo(inputAdd.value, false);
	inputAdd.value = "";
	saveTodo();
	//your code here
};

function addTodo(title, completed) {
	//create a div that holds todo title, done button, delete button
	const div = document.createElement("div");
	div.className = "border-bottom p-1 py-2 fs-2 d-flex";

	//create span for showing title
	const span = document.createElement("span");
	span.innerText = title;
	span.style.textDecoration = completed ? "line-through" : "";
	span.className = "me-3";

	//create done button
	const doneBtn = document.createElement("button");
	doneBtn.innerText = "Done";
	doneBtn.className = "btn btn-success me-2";

	doneBtn.onclick = () => {
		completed = !completed;
		span.style.textDecoration = completed ? "line-through" : "";
		saveTodo();
	};

	//create delete button
	const deleteBtn = document.createElement("button");
	deleteBtn.innerText = "Delete";
	deleteBtn.className = "btn btn-danger";

	deleteBtn.onclick = () => {
		todoCtn.removeChild(div);
		saveTodo();
	};

	//your code here
	doneBtn.style.display = "none";
	deleteBtn.style.display = "none";
	div.onmouseover = () => {
		doneBtn.style.display = "";
		deleteBtn.style.display = "";
	};
	div.onmouseout = () => {
		doneBtn.style.display = "none";
		deleteBtn.style.display = "none";
	};
	div.appendChild(span);
	div.appendChild(doneBtn);
	div.appendChild(deleteBtn);
	todoCtn.prepend(div);
	//append todo to HTML...
	//define buttons event...
}

function saveTodo() {
	const data = [];
	for (const todoDiv of todoCtn.children) {
		//your code here
		const todoObject = {};
		todoObject.title = todoDiv.children[0].innerText;
		todoObject.completed =
			todoDiv.children[0].style.textDecoration === "line-through";
		data.push(todoObject);
	}
	localStorage.setItem("items", JSON.stringify(data));
	//your code here
}

function loadTodo() {
	//your code here
	const data = JSON.parse(localStorage.getItem("items"));
	for (let index = data.length - 1; index >= 0; index--) {
		addTodo(data[index].title, data[index].completed);
	}
}

loadTodo();
