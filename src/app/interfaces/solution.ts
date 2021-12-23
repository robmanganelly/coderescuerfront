export interface Solution {
  _id?: string,
  problemId: string,
  solution: string,
  date?: Date
  postedBy: {_id: string, username: string};
}
