export class ExtensionTest{
  private static  excludedCases: string[] = ["jpg", "png", "gif", "mp3", "mp4", "zip", "rar", "mkv","pdf"];

  constructor(){}

  static isValidExtension(name: string): boolean{
    const name_ext = name.split(".").pop();
    if(!name_ext) {return false;}
    return !ExtensionTest.excludedCases.includes(name_ext as string);
  }

  static findExtension(name: string): string{
    const name_ext = name.split(".").pop();
    if(!name_ext) {return "none";}
    return name_ext;
  }
}
