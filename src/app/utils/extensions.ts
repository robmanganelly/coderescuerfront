export class ExtensionTest{
  // private static  excludedTextCases: string[] = ["jpg", "png", "gif", "mp3", "mp4", "zip", "rar", "mkv","pdf"];

  private static extensionsMap:{[key:string]:string} = { // not fully implemented
    "jpg":"image",
    "png":"image",
    "jpeg":"image",
    "gif":"image",
    "pdf":"binary",
    "doc":"binary",
    "xls":"binary",
    "ppt":"binary",
    "mp3":"binary",
    "mp4":"binary",
    "mkv":"binary",
    "avi":"binary",
    "zip":"binary",
    "rar":"binary",
    "deb":"binary",
    "exe":"binary",

  }

  constructor(){}

  static findExtension(name: string): string | null{
    const name_ext = name.split(".").pop();
    if(!name_ext) {return null;}
    return name_ext;
  }

  private static findIfValid(name:string, type: string, opposite:boolean = false):boolean{
    const ext = ExtensionTest.findExtension(name);
    if (!ext) {return false;}
    return opposite?
      !Object.keys(ExtensionTest.extensionsMap).includes(name)/*not fully implemented */
      : ExtensionTest.extensionsMap[ext] === type;
  }

  // public interfaces
  static isValidTextExtension(name: string): boolean{
    return ExtensionTest.findIfValid(name,"",true)
  }
  static isValidImageExtension(name: string){
    return ExtensionTest.findIfValid(name, "image");
  }


}
