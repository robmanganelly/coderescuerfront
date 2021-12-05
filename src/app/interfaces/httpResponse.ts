import { Lang } from "./lang";

export interface EnvelopedResponse<T>{
  status: String;
  data: {data: T};
  message: String;
  code: Number;  // todo include this field in next version.
}
