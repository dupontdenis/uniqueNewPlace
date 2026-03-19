export function renderArray(container, arr, i = -1, j = -1, removed = -1) {
  container.innerHTML = "";

  arr.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value;

    if (index === i) cell.classList.add("i");
    if (index === j) cell.classList.add("j");
    if (index === removed) cell.classList.add("removed");

    container.appendChild(cell);
  });
}
export function renderResult(container, arr) {
  container.innerHTML = "";

  arr.forEach((value) => {
    const cell = document.createElement("div");
    cell.className = "cell result-cell";
    cell.textContent = value;
    container.appendChild(cell);
  });
}