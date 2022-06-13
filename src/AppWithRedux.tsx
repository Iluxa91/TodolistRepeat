import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    addToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC,
    RemoveToDoListAC,
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./task-reducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./App";



export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {

    // let [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });
    const todolists = useSelector<AppRootStateType,TodolistType[]>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        // //достанем нужный массив по todolistId:
        // let todolistTasks = tasks[todolistId];
        // // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        // tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        let action = removeTaskAC(id,todolistId)
        dispatch(action)
    },[dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        let action = addTaskAC(title,todolistId)
        dispatch(action)
    },[dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        let action = changeTaskStatusAC(id,isDone,todolistId)
        dispatch(action)
    },[dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id,newTitle,todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeToDoListFilterAC(todolistId,value))
    },[dispatch])
    const removeTodolist = useCallback((id: string) => {
        // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter(tl => tl.id != id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        let action = RemoveToDoListAC(id)
        dispatch(action)
    },[dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        // // найдём нужный todolist
        // const todolist = todolists.find(tl => tl.id === id);
        // if (todolist) {
        //     // если нашёлся - изменим ему заголовок
        //     todolist.title = title;
        //     setTodolists([...todolists]);
        // }
        dispatch(ChangeToDoListTitleAC(id,title))
    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        // let newTodolistId = v1();
        // let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
        let action = addToDoListAC(title)
        dispatch(action)
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
