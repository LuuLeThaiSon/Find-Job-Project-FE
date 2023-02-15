import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  scrollTopWindow(x:number,y:number) {
    window.scrollTo(x,y)
  }
}
