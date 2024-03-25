import { ITask } from "@prisma/client"

export class getUserTasks {
    userId: number
}
export class savePostsDto {
    post: ITask
    userId: number
}