import * as z from 'zod';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskState {
    todos: Todo[];
    length: number;
    completed: number;
    pending: number;
}

export type TaskAction =
    | { type: 'ADD_TODO', payload: string }
    | { type: 'TOGGLE_TODO', payload: number }
    | { type: 'DELETE_TODO', payload: number }


const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
})
const TaskStateScheme = z.object({
    todos: z.array(TodoSchema),
    completed: z.number(),
    length: z.number(),
    pending: z.number()
})

export const getTasksInitialState = (): TaskState => {
    const localStorageState = localStorage.getItem('tasks-state');

    if (!localStorageState) {
        return {
            todos: [],
            completed: 0,
            pending: 0,
            length: 0
        }
    }

    // Zod validation
    const result = TaskStateScheme.safeParse(JSON.parse(localStorageState))
    if (result.error) {
        console.error(result.error)
        return {
            todos: [],
            completed: 0,
            pending: 0,
            length: 0
        }
    }

    return result.data
}

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TODO': {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            const newState = [...state.todos, newTodo]

            return {
                ...state,
                todos: newState,
                length: newState.length,
                pending: state.pending + 1
            };
        }

        case 'DELETE_TODO': {
            const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: updatedTodos.filter(todo => todo.completed).length,
                pending: updatedTodos.filter(todo => !todo.completed).length
            };
        }

        case 'TOGGLE_TODO': {
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedTodos,
                length: updatedTodos.length,
                completed: updatedTodos.filter(todo => todo.completed).length,
                pending: updatedTodos.filter(todo => !todo.completed).length
            };
        }

        default:
            return state;

    }
}