export const initialState = {
    person: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return{
                ...state,
                person: action.item
            }
        default:
            return state
    }
}

export default reducer