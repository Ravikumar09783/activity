import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class ApiRequestService {
  baseUrl = environment.baseUrl;
  globals: any;
  providerID= environment.providerId

  constructor(private http: HttpClient) { }

  activityId:string='';
  accessToken ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhM2VkOTQzMjc5MzliNDdmYWQzNDNiOSIsImRhdGUiOiIyMDE4LTA4LTIzVDE0OjExOjU5LjM2MFoiLCJpYXQiOjE1MzUwMzM1MTl9.okyN34J2UECq3WcvPpiAkxf7xNKT9QpGMn06xR08O3E';
  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.accessToken}`
    ),
  };
  getActivity( params: string) {
    return this.http.get<any>(
      `${this.baseUrl}v2/wp/providers/${this.providerID}/${params}`,this.header);
  }

  getActivityinfo( params: string, _id:string){
   
    return this.http.get<any>(
      `${this.baseUrl}v2/wp/providers/${this.providerID}/${params}/${_id}/details`,this.header);
  }







  getAll(modelName, payload?: any) {
    let params = {};
    if (payload) {
      params = this.createStringParams(payload);
      console.log(params, 'params');
    }
    return this.http.get<any>(this.baseUrl + modelName, { params: params });
  }

  private createStringParams(obj) {
    let params = new HttpParams();
    for (var key in obj) {
      params = params.append(key, obj[key]);
    }
    console.log(params.toString(), 'params in func');
    return params;
  }

  post(modelName, payload, headers?: any) {
    return this.http.post(this.baseUrl + modelName, payload, headers);
  }

  get(modelName, payload?: any) {
    console.log(payload);
    return this.http.get<any>(this.baseUrl + modelName, payload);
  }
} //End of the class
