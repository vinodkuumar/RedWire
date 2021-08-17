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
        case 'TOGGLE_FAVOURITES':
            const index = state.favourites.findIndex(
                article => article.url === action.payload,
            );
            if(index >= 0) {
                const favourites = [...state.favourites];
                favourites.splice(index,1)
                return{
                    ...state,
                    favourites
                }
            } else {
                const article = state.articles.articles.find(
                    article => article.url === action.payload,
                )
                return {
                    ...state,
                    favourites: state.favourites.concat(article),
                }
            }
    }
    return state;

}