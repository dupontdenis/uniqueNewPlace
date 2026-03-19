export function* uniqueNotInPlaceStep(arr) {
  const result = [];

  yield { type: "start", arr: [...arr], result: [...result] };

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    yield {
      type: "info",
      message: `i = ${i}, valeur = ${value}`,
      arr: [...arr],
      result: [...result],
      i,
    };

    const exists = result.includes(value);

    yield {
      type: "compare",
      message: exists
        ? `${value} existe déjà dans result → ignoré`
        : `${value} n'existe pas → ajouté`,
      arr: [...arr],
      result: [...result],
      i,
    };

    if (!exists) {
      result.push(value);

      yield {
        type: "add",
        message: `${value} ajouté à result`,
        arr: [...arr],
        result: [...result],
        i,
      };
    }
  }

  yield {
    type: "end",
    message: "Fin de l'algorithme",
    arr: [...arr],
    result: [...result],
  };
}
