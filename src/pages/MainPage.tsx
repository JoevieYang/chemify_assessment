import React, {ReactNode, useEffect, useState} from "react";
import classes from '../styles/MainPage.module.css';

import { Container, 
         SegmentedControl, 
         Button, 
         ScrollArea, 
         List, 
         ListItem,
         Modal,
         TextInput,
         Text,
        } from '@mantine/core';


import axios from "axios";

import { TodoListItem } from "../components/TodoListItem";


export const MainPage = () => {

    const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
    const [listDataSet, setListDataSet] = useState([]);
    const [listItems, setListItems] = useState<ReactNode>([]);

    //a state used to show finished or unfinished todos
    const [shown, setShown] = useState("all");

    const [newTitle, setNewTitle] = useState("");

    /**
     *  Following comes to functionality of task operation
     */
    const prepareTableData = () => {
        axios.get('http://localhost:8080/todos').then((res) => {
            console.log("get all tasks");
            console.log(res.data.data);
    
            setListDataSet(res.data.data);
        }
        ).catch((err) => {
            console.log("error occurs! You cannot access");
            console.log(err);
        })
    }

    /**init page */
    useEffect(() => {
        prepareTableData();
    }, []);


    // useEffect(() => {
    //     generateListItems();
    // }, [listDataSet]);




    /** generate todo list items in List component */
    interface TodoMessage  {
        id: string;
        title: string;
        done: boolean;
    }
    

    /** use with segmentcontrol
     * show all tasks, finished tasks, unfinished tasks
     * via done value
     */

    /** handle changes from child components */
    const handleDataChange = (newData:any) => {
        setListDataSet(newData);
    };

    const generateListItems = (): any[] => {
        let listSet: object[] = [];
        listDataSet.map((item: TodoMessage) => {
            if (shown === "all") {
                listSet.push(
                    <ListItem key={item.id}>
                        <TodoListItem 
                            id={item.id}
                            content={item.title} 
                            done={item.done} 
                            data={listDataSet}
                            onDataChange={handleDataChange}
                    >
                        </TodoListItem>
                    </ListItem>
                )
            }
            else if (shown === "todo") {
                if (!item.done){
                    listSet.push(
                        <ListItem key={item.id}><TodoListItem id={item.id}
                            content={item.title} done={item.done}
                        ></TodoListItem></ListItem>
                    )
                }
            }
            else {
                if (item.done) {
                    listSet.push(
                        <ListItem key={item.id}><TodoListItem id={item.id}
                            content={item.title} done={item.done}
                        ></TodoListItem></ListItem>
                    )
                }
            }
            
        })
        return listSet
    };


    /**the method for create model */
    interface RequestOptions {
        url: string;
        body: object;
    }

    const createNewTask = () => {
        setSlowTransitionOpened(false);
        // createTask(newTitle);
        let request: RequestOptions = { url: "http://localhost:8080/todos", body: { title: newTitle } }
        axios.post(request.url, request.body).then((res) => {
            console.log("create a new task");
            console.log(res);
            prepareTableData();
        }
        ).catch((err) => {
            console.log("error occurs!Create unsuccessfully");
            console.log(err);
        }
        )
        
    }



    return (
        <Container className={classes.containBox}>
            <div className={classes.welcome}>
                <p>Welcome, here is the TODO list today:</p>
            </div>
            <div className={classes.newbox}>
                <SegmentedControl 
                    size="md" 
                    color="purple"
                    value={shown}
                    onChange={setShown} 
                    data={
                        [
                            { value: 'all', label: 'All Tasks' },
                            { value: 'todo', label: 'TODO' },
                            { value: 'done', label: 'DONE' },
                        ]
                    } 
                    style={{height:'50px'}}
                />
                <Button 
                    size="md" 
                    color="purple"
                    onClick={() => { setSlowTransitionOpened(true) }}
                >
                    Create A New Task
                </Button>
                <Modal
                    opened={slowTransitionOpened}
                    onClose={() => setSlowTransitionOpened(false)}
                    title="Create a new Task"
                    transitionProps={{ transition: 'rotate-left' }}
                    size='lg'
                    centered
                    className={classes.modal}
                >
                    <TextInput
                        data-autofocus
                        label="New Task"
                        placeholder="input your goal here"
                        mt="md"
                        onChange={(event) => setNewTitle(event.currentTarget.value)}
                    />
                    <Button 
                        fullWidth
                        color="purple"
                        style={{margin: '20px 0 0 0'}}
                        onClick={() => {
                            createNewTask()
                        }}
                    >
                        add it to todo list
                    </Button>
                </Modal>
            </div>
            <ScrollArea 
                scrollbarSize={20} 
                scrollHideDelay={6000} 
                type='always'
                offsetScrollbars='x'
                className={classes.scroll}
            >
                {
                    listDataSet.length === 0 ? 
                        <Text className={classes.text}>Nothing to do, you can add a new task.</Text>
                    :
                    <List
                        center={true}
                        className={classes.listbox}
                        type={'ordered'}
                    >
                        {/* {listItems} */}
                        {generateListItems()}
                    </List>
                }
               
                
            </ScrollArea>
                
            
        </Container>

        
    )
}