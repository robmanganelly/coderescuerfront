import { Generic } from "./generic";

export interface EnvelopedResponse<T>{
  status: string;
  data: {data: T};
  message: string;
  code: Number;
  meta?: Generic
}
