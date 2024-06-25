export class updateListDto {
  userId: number
  listId: number
  data: {
    desc: string
    dateAt: string
    text_color: string
    userIdAddr: Array<string>
  }
}