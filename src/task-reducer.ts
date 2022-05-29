import {TasksStateType} from "./App";
import {v1} from "uuid";
import {AddToDoListAT, RemoveToDoListAT} from "./todolist-reducer";


type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT |AddToDoListAT | RemoveToDoListAT
export type RemoveTaskAT = {
    type:'REMOVE-TASK'
    todolistId:string
    taskID:string
}
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
         return {
             ...tasks,
             [action.todolistId]:
             tasks[action.todolistId].filter(t => action.taskID !== t.id)
         }
        case 'ADD-TASK':
            return {
                ...tasks,
                [action.todolistId]:[{id: v1(), title: action.title, isDone: false},...tasks[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...tasks,
                [action.todolistId]:tasks[action.todolistId].map(t=>
                t.id===action.taskID?
                    {...t,isDone:action.isDone}:t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...tasks,
                [action.todolistId]:tasks[action.todolistId].map(t=>
                    t.id===action.taskID?
                        {...t,title:action.title}:t)
            }
        case 'ADD-TODOLIST':
            return {...tasks,[action.newTodolistId]:[]}
        case 'REMOVE-TODOLIST':
            let stateCopy = {...tasks}
            delete stateCopy[action.id]
            return {...stateCopy}
        default:
            return tasks

    }
}

export const removeTaskAC = (taskID:string,todolistId:string):RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todolistId,taskID}
}
export const addTaskAC = (title:string,todolistId:string) => {
    return{type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskID:string,isDone:boolean,todolistId:string) => ({
    type: 'CHANGE-TASK-STATUS',taskID,todolistId,isDone
} as const)
export const changeTaskTitleAC = (taskID:string,title:string,todolistId:string) => ({
    type: 'CHANGE-TASK-TITLE',taskID,title,todolistId
} as const)

