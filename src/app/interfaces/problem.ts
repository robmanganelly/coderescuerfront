export interface Problem extends ProblemSeed{
  language: string;
  date: Date;
  _id?: string;
  is_New: Boolean;
  author: { _id: string, username: string};

}

export interface ProblemSeed{
  // include author after implement user endpoint
  title: string;
  description: string;
  comments?: string;
  solution?: string;
}
