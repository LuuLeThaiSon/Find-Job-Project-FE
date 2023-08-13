import {Pipe, PipeTransform} from '@angular/core';
import {Job} from "./components/model/job";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((item: Job) => {
      return item.title.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
        item.company.name.toLowerCase().indexOf(args.toLowerCase()) > -1
    })
  }
}
