
import {FilterValuesType, TodolistType} from "./App";
import {v1} from "uuid";

type ActionType = RemoveToDoListAT | AddToDoListAT | ChangeToDOListAT | ChangeToDoListFilterAT
export type RemoveToDoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddToDoListAT = ReturnType<typeof addToDoListAC>
export type ChangeToDOListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeToDoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {id: action.newTodolistId, title: action.title, filter: 'all'};
            return [...todoLists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = todoLists.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...todoLists]

        case 'CHANGE-TODOLIST-FILTER':
            const todolist2 = todoLists.find(tl => tl.id === action.id);
            if (todolist2) {
                todolist2.filter = action.filter
            }
            return [...todoLists]

        default:
            return todoLists

    }
}

export const RemoveToDoListAC = (todolistId:string):RemoveToDoListAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addToDoListAC = (title:string) => ({type: 'ADD-TODOLIST', title,newTodolistId:v1()} as const)
export const ChangeToDoListTitleAC = (id:string,title:string):ChangeToDOListAT => ({type: 'CHANGE-TODOLIST-TITLE', id, title})
export const ChangeToDoListFilterAC = (id:string,filter:FilterValuesType):ChangeToDoListFilterAT => ({type:'CHANGE-TODOLIST-FILTER',id,filter})
