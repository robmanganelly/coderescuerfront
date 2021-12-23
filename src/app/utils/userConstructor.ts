import { User } from "../interfaces/users";

export class UserConstructor implements User{
  constructor(
  public _id: string,
  private _token: string,
  private _tokenExpiration: Date,
  public photo: string,
  public username: string,
  public email: string,
  public active: boolean,
  public favProblems: string[],
  public favSolutions: string[]
  ){}

  get token(){
    if (!this._tokenExpiration || this._tokenExpiration < new Date()){
      return null
    }
    return this._token;
  };

  get tokenExpiration(): Date{
    return this._tokenExpiration;
  }

  hasFavoriteSolution(solutionId: string): boolean{
    return this.favSolutions.includes(solutionId);
  }

  hasFavoriteProblem(problemId: string): boolean{
    return this.favProblems.includes(problemId);
  }

  includeFavorite(id:string, source: string):void{
    if(["problems","solutions"].includes(source)){
      this[(source==="problems")?"favProblems":"favSolutions"].push(id);
      return
    };
    throw new Error('wrong source');
  }

  replaceFavorites(favorites:string[], source: string):UserConstructor{
    if(["problems","solutions"].includes(source)){
      this[(source==="problems")?"favProblems":"favSolutions"] = favorites;
      return this
    };
    throw new Error('wrong source');
  }

}
