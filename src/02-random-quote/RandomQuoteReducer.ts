import type { Character } from "./interfaces/CharacterInterface"

interface RandomQuoteState {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  reactions: number[];

  currentPage: number;
  totalPages: number;
  // pages: number[]
}

type RandomQuoteAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { characters: Character[]; currentPage: number; totalPages: number } }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'SET_REACTION'; payload: number }
  | { type: 'INIT_REACTIONS'; payload: number[] }
  | { type: 'SET_PAGE'; payload: number };

export const initialState = (): RandomQuoteState => {
  return {
    characters: [],
    isLoading: false,
    error: null,
    reactions: [],
    currentPage: 1,
    totalPages: 1,
    // pages: []
  }
}

export const RandomQuoteReducer = (state: RandomQuoteState, action: RandomQuoteAction): RandomQuoteState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        characters: action.payload.characters,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        // pages: Array.from({ length: action.payload.totalPages }, (_, i) => i + 1)
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'INIT_REACTIONS':
      return {
        ...state,
        reactions: action.payload
      }
    case 'NEXT_PAGE': {
      return {
        ...state,
        currentPage: state.currentPage + 1
      }
    };
    case 'PREV_PAGE': {
      return {
        ...state,
        currentPage: state.currentPage - 1
      }
    };
    case 'SET_REACTION': {
      const id = action.payload;
      const newReactions = state.reactions.includes(id) 
        ? state.reactions.filter(reaction => reaction !== id)
        : [...state.reactions, id];

      return {
        ...state,
        reactions: newReactions
      };
    }
    case 'SET_PAGE': 
      return {
        ...state,
        currentPage: action.payload
      }
    default:
      return state;
  }
}