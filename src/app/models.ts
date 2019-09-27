import { propertyMap } from './decorator';

export class Model {

  @propertyMap('name') title : string;
  description : string;
  obsolete : boolean;

}
export const data : Model[] = [
  {
    title : 'First entry',
    description : 'First entry description',
    obsolete : false
  },
  {
    title : 'Second entry',
    description : 'Second entry description',
    obsolete : true
  }
]