import { EnvelopedResponse } from "../interfaces/httpResponse"

export class DataExtractor<T> {

  constructor(){}

  static extract<T>(bodyPayload: EnvelopedResponse<T>){
    return bodyPayload.data.data;
  }

}
