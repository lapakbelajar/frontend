let initialState = {
  name: "",
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "show":
      return {
        type: "show",
        name: action.payload.name,
        detail: action.payload,
      };
    case "hide":
      return {
        type: "hide",
        name: action.payload.name,
        detail: action.payload,
      };
    default:
      return { type: "", name: "" };
  }
}
