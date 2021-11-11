export function Reducer(state, action) {
  switch (action.type) {
    case "show":
      console.log(action, action.payload.page_name);
      return action.payload.page_name;
    case "hide":
      return action.payload.page_name;
    default:
      throw new Error("Terjadi kesalahan");
  }
}
