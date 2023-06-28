const todos = [
  {
    id: 1,
    name: "Todo 1",
    complete: false
  },
  {
    id: 2,
    name: "Todo 2",
    complete: true
  },
  {
    id: 3,
    name: "Todo 3",
    complete: false
  },
  {
    id: 4,
    name: "Todo 4",
    complete: true
  },
  {
    id: 5,
    name: "Todo 5",
    complete: false
  }
];

const renderToDom = (divId, html) => {
  document.querySelector(divId).innerHTML = html;
};

const formOnDom = () => {
  const domString = `<div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="todo-item"
              placeholder="Todo Item"
              required
            />
            <label for="todo-item">Todo Item</label>
          </div>
          <button type="submit" class="btn btn-dark">Add Todo</button>`;

  renderToDom("#app-form", domString);
};

const filterBtnsOnDom = () => {
  const domString = `<button id="incomplete" type="button" class="btn btn-danger btn-sm m-1">
    Incomplete
  </button>
  <button id="complete" type="button" class="btn btn-success btn-sm m-1">
    Complete
  </button>`;

  renderToDom("#app-filter", domString);
};

function card(todoObj) {
  if (todoObj.complete === false) {
    return `<div class="card shadow mb-3 bg-body-tertiary rounded">
          <div class="card-body d-flex justify-content-between align-items-center">
            ${todoObj.name}
            <button type="button" class="btn btn-success align-self-start btn-sm" id="${todoObj.id}">Done</button>
          </div >
        </div>`;
  }

  return `<div class="card shadow mb-3 bg-body-tertiary rounded">
          <div class="card-body d-flex justify-content-between align-items-center">
            ${todoObj.name}
          </div >
        </div>`;
}

const cardsOnDom = (filterType) => {
  let domString = "";

  if (filterType === "complete") {
    for (let item of todos.filter((i) => i.complete)) {
      domString += card(item);
    }
  } else {
    for (let item of todos.filter((i) => !i.complete)) {
      domString += card(item);
    }
  }
  renderToDom("#app-todos", domString);
};

const appOnDom = () => {
  formOnDom();
  filterBtnsOnDom();
  cardsOnDom();
  events();
};

const events = () => {
  document
    .querySelector("#incomplete")
    .addEventListener("click", () => cardsOnDom("incomplete"));
  document
    .querySelector("#complete")
    .addEventListener("click", () => cardsOnDom("complete"));

  document.querySelector("#app-form").addEventListener("submit", (event) => {
    event.preventDefault(); // ALWAYS GONNA USE THIS ON FORMS
    // GRAB VALUE FROM INPUT

    // 1. grab the value from the form
    const value = document.querySelector("#todo-item").value;
    // 2. create a new object with it
    const newObject = {
      id: todos.length + 1,
      name: value,
      complete: false
    };
    // 3. push it to the array
    todos.push(newObject);
    // 4. repaint the DOM
    cardsOnDom();
    // 5. reset the form
    document.querySelector("#app-form").reset();
  });

  // EVENT BUBBLING
  document.querySelector("#app-todos").addEventListener("click", (event) => {
    if (event.target.id) {
      // Need to find the object with that ID
      const index = todos.findIndex(
        (todo) => todo.id === Number(event.target.id)
      );

      // we need to update the value of complete
      todos[index].complete = true;

      // rerender the DOM
      cardsOnDom();
    }
  });
};

const startApp = () => {
  // const button =
  //   '<button type="button" class="btn btn-success" id="start-btn">START APP</button>';

  // renderToDom("#app-form", button);
  appOnDom();

  // document.querySelector("#start-btn").addEventListener("click", () => {});
};

startApp();
