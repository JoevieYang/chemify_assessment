import React from 'react';
import classes from '../styles/MainPage.module.css';
import { Text, Tooltip } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed, IconX } from '@tabler/icons-react';

import { deleteTask, modifyTask } from '../apis/allAPI';

export const TodoListItem = (props:any) => {

    interface TodoData {
        id: string;
        title: string;
        done: boolean;
    }

    const clickToDelete = () => {
        deleteTask(props.id);
        let modifiedData = props.data.filter((item: TodoData) => item.id !== props.id)
        props.onDataChange(modifiedData);
    }

    const updateTask = () => {
        let doneResult = !props.done;
        modifyTask({ id: props.id, done: doneResult });
        const updatedData = props.data.map((item: TodoData) =>
            item.id === props.id ? { ...item, done: doneResult } : item
        );
        props.onDataChange(updatedData);
        
    }


    return (
        <div className={classes.listContainer}>
            <Tooltip label='click here to finish it'>
                {/* <IconCircleDashed 
                    size='50px'
                    color='blue'
                    style={{marginLeft:'10px'}}
                ></IconCircleDashed> */}
                {props.done ? 
                    <IconCircleCheck size='40px'
                        color='green'
                        style={{ marginLeft: '10px' }}>

                    </IconCircleCheck>
                    : 
                    <IconCircleDashed size='40px'
                        color='blue'
                        style={{ marginLeft: '10px' }}
                        onClick={() => {
                            updateTask();
                        }}
                    >
                    </IconCircleDashed>
                }
            </Tooltip>
            <Text
                size="xl"
                className={classes.text}
                
            >
                {props.content}
            </Text>
            {/* <Text size="md" className={classes.text} style={{border: 'solid black'}}>Extra small text</Text> */}
            <Tooltip label='click here to delete it'>
                <IconX 
                    size='40px'
                    color='rgb(172, 10, 10)'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                        clickToDelete();
                        // deleteTask({ id: props.id });
                    }}
                ></IconX>
            </Tooltip>
        </div>
    )
}