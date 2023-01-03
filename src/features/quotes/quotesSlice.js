import { v4 as uuid } from "uuid";
// Action Creators
// TODO: Create action creators as defined in tests

export const addQuote = (quote) => {
  return {
    type: "quote/add",
    payload: quote
  }
}

export const removeQuote = (quoteId) => {
  return {
    type: "quotes/remove",
    payload: quoteId
  }
}

export const upvoteQuote = (quoteId) => {
  return {
    type: "quotes/upvote",
    payload: quoteId
  }
}

export const downvoteQuote = (quoteId) => {
  return {
    type: "quote/downvote",
    payload: quoteId
  }
}
// Reducer
const initialState = [];

export default function quotesReducer(state = initialState, action) {
  let updatedArray;

  switch(action.type){
    case "quotes/add":
      return [...state, {
        id: uuid(),
        content: action.payload.content,
        author: action.payload.author,
        votes: 0
      }]
    
    case "quotes/remove":
      return state.filter(quote => quote.id !== action.payload)

    case "quotes/upvote":
      updatedArray = state.map(quote => {
        if (quote.id === action.payload) {
          return {...quote, votes: ++quotesReducer.votes}
        }
        else {
          return quote;
        }
      })
      return updatedArray;

    case "quotes/downvote":
      updatedArray = state.map(quote => {
        if (quote.id === action.payload && quote.votes > 0) {
          return {...quote, votes: --quote.votes}
        }
        else {
          return quote;
        }
      })
      return updatedArray

    default:
      return state;
  }
}
