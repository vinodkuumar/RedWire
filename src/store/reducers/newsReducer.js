const initialState = {
    articles: [],
    favourites: [],
    videos: []
}

export default function (state = initialState, action){
    switch(action.type) {
        case 'FETCH_ARTICLES':
            return {
                ...state,
                articles: action.payload
            }
        case 'FETCH_VIDEOS':
            return{
                ...state,
                videos: action.payload
            }
    }
    return state;

}