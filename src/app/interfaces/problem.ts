export interface Problem extends ProblemSeed{
  language: String;
  date: Date;
  _id?: String;
}

export interface ProblemSeed{
  // include author after implement user endpoint
  title: String;
  description: String;
  comments?: string;
}
