import { useCallback, useEffect, useReducer } from "react";
import type {
  CharacterResponse,
} from "./interfaces/CharacterInterface";
import { RandomQuoteReducer, initialState } from "./RandomQuoteReducer";

const useCharacters = () => {
  const [state, dispatch] = useReducer(RandomQuoteReducer, initialState());

  useEffect(() => {
    const stored = localStorage.getItem('reactions'); 

    if(stored){
      dispatch({ type: 'INIT_REACTIONS', payload: JSON.parse(stored) })
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    dispatch({ type: 'FETCH_START' });

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${state.currentPage}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Error fetching characters");
        }

        const data: CharacterResponse = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: {characters: data.results, currentPage: state.currentPage, totalPages: data.info.pages} });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        dispatch({ type: 'FETCH_ERROR', payload: "Error to load Characters" });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [state.currentPage]);

  useEffect(() => {
    localStorage.setItem('reactions', JSON.stringify(state.reactions));
  }, [state.reactions]);

  function generatePageNumbers() {
    const pages: (number | string)[] = [];

    if (state.totalPages <= 5) {
      return Array.from({ length: state.totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (state.currentPage <= 3) {
      pages.push(2, 3);
      pages.push("...");
    } else if (state.currentPage >= state.totalPages - 2) {
      pages.push("...");
      pages.push(state.totalPages - 2, state.totalPages - 1);
    } else {
      pages.push("...");
      pages.push(state.currentPage);
      pages.push("...");
    }

    pages.push(state.totalPages);

    return pages;
  }

  const handlePrev = () => {
    if (state.currentPage > 1) dispatch({ type: 'PREV_PAGE' });
  };

  const handleNext = useCallback(() => {
    if (state.currentPage < state.totalPages) dispatch({ type: 'NEXT_PAGE' });
  }, [state.currentPage, state.totalPages]);

  const handleReaction = useCallback((id: number) => {
    dispatch({ type: 'SET_REACTION', payload: id });
  }, []);

  const setPage = (page: number) => dispatch({ type: 'SET_PAGE', payload: page })

  return {
    characters: state.characters,
    isLoading: state.isLoading,
    error: state.error,
    // pages: state.pages,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    reactions: state.reactions,

    handleNext,
    handlePrev,
    handleReaction,
    generatePageNumbers,
    setPage
  };
};

export default useCharacters;
