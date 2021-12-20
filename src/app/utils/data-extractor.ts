import { HttpErrorResponse } from "@angular/common/http";
import { Generic } from "../interfaces/generic";
import { EnvelopedResponse } from "../interfaces/httpResponse"

export class DataExtractor<T> {

  constructor(){}

  static extract<T>(bodyPayload: EnvelopedResponse<T>){
    return bodyPayload.data.data;
  }

  static extractWithMeta<T>(body: EnvelopedResponse<T>){
    const __r = Object.create({});
    __r.data = body.data.data;
    __r.meta = body.meta ;
    return __r;
  }

  static extractError<T>(bodyPayload: HttpErrorResponse){
    return bodyPayload.error
  }

}
