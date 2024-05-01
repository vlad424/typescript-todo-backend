import { ITask } from "@prisma/client"

export class getUserTasks {
    userId: number
}

export class savePostsDto {
    post: { post: ITask }
    arrayName: string
    action: string
}
export class saveArrayDto {
    post: saveArrayBasic
    id: number
    action: string
}
export class deletePostDto {
    todoId: number
}
export class updateTaskDto {
    todoId: number
    desc: string
    text_color: string
}


// basic interfaces with param 'action'

export class saveArrayBasic {
    name: string;
    id: number;
    todos: Array<ITask> | null
}