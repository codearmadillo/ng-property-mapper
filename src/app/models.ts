import { propertyRemap, propertyRemove } from './decorator';

export class Model {

  @propertyRemap('name') title : string;

  description : string;
  @propertyRemove() obsolete : boolean;

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