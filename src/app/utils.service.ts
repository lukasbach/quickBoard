import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }


  public guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  public clone(obj: any): any {
    if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
      return obj;

    let temp: any;
    if (obj instanceof Date)
      temp = new Date(obj); //or new Date(obj);
    else
      temp = obj.constructor();

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null;
        temp[key] = this.clone(obj[key]);
        delete obj['isActiveClone'];
      }
    }

    return temp;
  }

}
