let initialValue = [
  {
    type: "show_question",
    shown: false,
  },
  {
    type: "show_filter",
    shown: false,
  },
];

export function reducer(state, action) {
  switch (action.type) {
    case "show_question":
      return { type: "show_question", shown: true };
    default:
    //
  }
}
