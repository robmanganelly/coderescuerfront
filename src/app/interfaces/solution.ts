export interface Solution {
  _id?: string,
  problemId: string,
  solution: string,
  date?: Date
  postedBy: {_id: string, username: string};
  liked:string[];
  disliked:string[];
}

export interface LikeStateSolution{
  solution: Solution;
  favSolutions?:string[];
}
