import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from 'uuid';

    //Action Reducers
//ADD_BLOG
const addBlog = (
    {
        description = '',
        note = '',
        createdAt = 0
    } ={}
) => ({
    type: 'ADD_BLOG',
    blog: {
        id: uuidv4(),
        description,
        note,
        createdAt
    }
})
//REMOVE_BLOG
const removeBlog = ({id} = {}) =>  ({
    type: 'REMOVE_BLOG',
    id
})

//EDIT_BLOG
const editBlog = (id, updates) => ({
    type: 'EDIT_BLOG',
    id,
    updates
})

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})
//SORT_BY_TITLE
const sortByTitle = () => ({
    type: 'SORT_BY_TITLE'
})
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})


// Blog Reducer
const defaultBlogReducer = []
const blogReducer = (state = defaultBlogReducer, action) => {
    switch(action.type) {
    case 'ADD_BLOG':
        return [
            ...state,
            action.blog
        ]
    case 'REMOVE_BLOG':
        return state.filter(({id}) => {
            return action.id !== id
        })
    case 'EDIT_BLOG':
        return state.map((blog) => {
            if(blog.id === action.id) {
                return {
                    ...blog,
                    ...action.updates
                }
            }else {
                return blog
            }
        })
        default:
        return state
    }
}

//Fliter Reducer
const defaultFilterReducer = {
    text: '',
    sortBy: 'title' // date or title
}
const filtersReducer = (state = defaultFilterReducer, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
               ...state,
               text: action.text
            }
        case 'SORT_BY_TITLE':
            return {
                ...state,
                sortBy: 'title'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        default:
            return state
    }
}

//Get visible Blogs
const getVisibleBlogs = (blogs, {text, sortBy}) => {
    return blogs.filter((blog) => {
        const textMatch = blog.description.toLowerCase().includes(text.toLowerCase())
        return textMatch
    }).sort((a, b) => {
        if(sortBy === 'title'){
           return a.title < b.title ? 1 : -1
        }else if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }
    })
}

//Store creation
const store = createStore(
    combineReducers({
        blogs: blogReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleBlogs = (getVisibleBlogs(state.blogs, state.filters))
    console.log(visibleBlogs)
})

const blogOne = store.dispatch(addBlog({description: 'summer', note: 'my summer vacation', createdAt: -22000}))
const blogTwo = store.dispatch(addBlog({description: 'winter', note: 'where i spent my winter vacation', createdAt: -2000}))
const blogThree = store.dispatch(addBlog({description: 'accer', note: 'my accer vacation', createdAt: -100000}))

// store.dispatch(removeBlog({id: blogTwo.blog.id}))

// store.dispatch(editBlog(blogTwo.blog.id, {note: 'edited'}))

// store.dispatch(setTextFilter('summer'))
// store.dispatch(setTextFilter(''))

store.dispatch(sortByDate())
store.dispatch(sortByTitle())

const demoState = {
    blogs: [{
        id: '56677hh',
        description: 'inter house',
        note: 'how i spent my interhouse',
        createdAt: 0
    }],
    filters: {
        text: 'soccer',
        sortBy: 'title' // date or title
    }
}