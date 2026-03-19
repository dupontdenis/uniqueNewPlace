import { uniqueNotInPlaceStep } from "./ALGO/uniqueNotInPlaceStep.mjs";
import { renderArray, renderResult } from "./UI/renderArray.mjs";
import { createLogger } from "./UI/logger.mjs";

const btnStart = document.querySelector("#start");
const btnNext = document.querySelector("#next-step");
const arrayContainer = document.querySelector("#array");
const resultContainer = document.querySelector("#result");
const sidebar = document.querySelector("#sidebar");

const logger = createLogger(sidebar);

let iterator = null;

btnStart.addEventListener("click", async () => {
  const response = await fetch("./data.json");
  const data = await response.json();

  iterator = uniqueNotInPlaceStep([...data]);

  logger.clear();

  const first = iterator.next();
  if (!first.done) {
    const s = first.value;
    renderArray(arrayContainer, s.arr);
    renderResult(resultContainer, s.result);
    logger.info("Algorithme initialisé");
  }
});

btnNext.addEventListener("click", () => {
  if (!iterator) return;

  const step = iterator.next();
  if (step.done) return;

  const s = step.value;

  switch (s.type) {
    case "info":
      logger.info(s.message);
      renderArray(arrayContainer, s.arr, s.i);
      renderResult(resultContainer, s.result);
      break;

    case "compare":
      logger.compare(s.message);
      renderArray(arrayContainer, s.arr, s.i);
      renderResult(resultContainer, s.result);
      break;

    case "add":
      logger.success(s.message);
      renderArray(arrayContainer, s.arr, s.i);
      renderResult(resultContainer, s.result);
      break;

    case "end":
      logger.success(s.message);
      renderArray(arrayContainer, s.arr);
      renderResult(resultContainer, s.result);
      break;
  }
});
