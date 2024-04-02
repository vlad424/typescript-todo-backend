import { ITask } from "@prisma/client"

export class getUserTasks {
    userId: number
}
export class savePostsDto {
    post: ITask
    arrayName: string
}
export class deletePostDto {
    todoId: number
}
export class updateTaskDto {
    todoId: number
    desc: string
    text_color: string
}