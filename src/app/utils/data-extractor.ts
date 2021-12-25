import { HttpErrorResponse } from "@angular/common/http";
import { Generic } from "../interfaces/generic";
import { EnvelopedResponse } from "../interfaces/httpResponse"

export class DataExtractor<T> {

  constructor(){}

  static extract<T>(bodyPayload: EnvelopedResponse<T>){
    return bodyPayload.data.data;
  }

  private static isEnveloped<T>(body:EnvelopedResponse<T>| T): body is EnvelopedResponse<T>{
     const requiredKeys = [
        Object.keys((body as EnvelopedResponse<T>)).includes('status'),
        Object.keys((body as EnvelopedResponse<T>)).includes('data'),
        Object.keys((body as EnvelopedResponse<T>)).includes('message'),
        Object.keys((body as EnvelopedResponse<T>)).includes('code'),
        Object.keys((body as EnvelopedResponse<T>).data).includes('data')
      ]
      return !requiredKeys.includes(false);

  }

  static extractIf<T>(bodyPayload: EnvelopedResponse<T>|T){
    if(this.isEnveloped(bodyPayload)){
      return this.extract(bodyPayload);
    }else{
      return bodyPayload;
    }
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
