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

    case "change_content":
      return {
        type: "change_content",
        loading: action.payload.loading,
        jenjang: action.payload.jenjang,
        jurusan: action.payload.jurusan,
        kelas: action.payload.kelas,
      };
    case "reset_change_content":
      return {
        type: "reset_change_content",
        loading: action.payload.loading,
      };
    default:
      return { type: "", name: "" };
  }
}
