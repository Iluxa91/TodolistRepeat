import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../../task-reducer";
import {todolistsReducer} from "../../todolist-reducer";
import React from "react";
import {AppRootStateType} from "../../state/store";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        "todolistId1": [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        "todolistId2": [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};
const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType)

export const storybookReduxDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>{storyFn()} </Provider>
}