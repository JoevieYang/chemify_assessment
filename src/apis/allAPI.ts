import axios from "axios"

interface RequestOptions {
    url: string;
    body: object;
}

interface TargetTask {
    id: string;
    title?: string;
    done?: boolean;
}

interface RequestBody {
    id?: string;
    title?: string;
    done?: boolean;
}

export const getAllTasks = () => {
    axios.get('http://localhost:8080/todos').then((res) => {
        console.log("异步访问获取数据");
        console.log(res);
    }
    ).catch((err) => {
        console.log("error occurs! You cannot access");
        console.log(err);
    }
    )
}

export const createTask = (title: string) => {
    let request : RequestOptions = {url:"http://localhost:8080/todos", body: {title:title}}
    axios.post(request.url, request.body).then((res) => {
        console.log("create a new task");
        console.log(res);
    }
    ).catch((err) => {
        console.log("error occurs!Create unsuccessfully");
        console.log(err);
    }
    )
}

export const modifyTask = (target: TargetTask) => {
    let url = "http://localhost:8080/todos/"+ target.id;
    let requestBody: RequestBody = {title: target.title, done: target.done}
    axios.put(url, requestBody).then((res) => {
        console.log("modify a target task");
        console.log(res);
    }
    ).catch((err) => {
        console.log("error occurs! Modify unsuccessfully");
        console.log(err);
    }
    )
};

export const deleteTask = (target: string) => {
    let url = "http://localhost:8080/todos/"+ target;
    axios.delete(url).then((res) => {
        console.log("delete a target task");
        console.log(res);
    }
    ).catch((err) => {
        console.log("error occurs! Delete unsuccessfully");
        console.log(err);
    }
    )
};

