const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const scrambleWord = (word: string = '') => {
    return word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
};

export interface ScrambleWordsState {
    currentWord: string;
    errorCounter: number;
    guess: string;
    isGameOver: boolean;
    maxAllowErrors: number;
    maxSkips: number;
    points: number;
    scrambledWord: string;
    skipCounter: number;
    totalWords: number;
    words: string[];
}

export type ScrambleWordsAction =
    | { type: 'SET_GUESS', payload: string }
    | { type: 'CHECK_ANSWER' }
    | { type: 'SKIP_WORD' }
    | { type: 'START_NEW_GAME', payload: ScrambleWordsState }

export const getInitialState = (): ScrambleWordsState => {
    const shuffledWords = shuffleArray([...GAME_WORDS]);

    return {
        currentWord: shuffledWords[0],
        errorCounter: 0,
        guess: '',
        isGameOver: false,
        maxAllowErrors: 3,
        maxSkips: 3,
        points: 0,
        scrambledWord: scrambleWord(shuffledWords[0]),
        skipCounter: 0,
        totalWords: GAME_WORDS.length,
        words: shuffledWords,
    }
}

export const scrambleWordsReducer = (state: ScrambleWordsState, action: ScrambleWordsAction): ScrambleWordsState => {
    switch (action.type) {
        case 'SET_GUESS':
            return { ...state, guess: action.payload.trim().toUpperCase() }

        case 'CHECK_ANSWER': {
            if (state.currentWord === state.guess) {
                const newWords = state.words.slice(1);
                return {
                    ...state,
                    words: newWords,
                    points: state.points + 1,
                    guess: '',
                    currentWord: newWords[0],
                    scrambledWord: scrambleWord(newWords[0])
                }
            }
            return {
                ...state,
                guess: '',
                errorCounter: state.errorCounter + 1,
                isGameOver: state.errorCounter >= state.maxAllowErrors
            }
        }
        case 'SKIP_WORD': {
            if (state.skipCounter >= state.maxSkips) {
                return state;
            }
            // const foundWordIdx = state.words.findIndex((word) => word === state.currentWord);
            // const newWord = state.words[foundWordIdx + 1];
            const updatedWords = state.words.slice(1)

            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                guess: '',
                words: updatedWords,
                scrambledWord: scrambleWord(updatedWords[0])
            }
        }

        case 'START_NEW_GAME': {
            return action.payload
        }

        default:
            return state;
    }
}