import { propertyRemap, propertyRemove } from './decorator';

export class Model {

  title : string;
  @propertyRemap('salesPrices')
  pricing : Submodel

}
export class Submodel {
  tagPrice : number;
  @propertyRemap('currencySymbol')
  currency : string;
}
export const data : Model[] = [
  {
    title : 'First entry',
    pricing: {
      tagPrice : 133.99,
      currency : 'DKK'
    }
  }
]