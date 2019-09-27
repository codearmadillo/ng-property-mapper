import { propertyRemap, propertyRemove } from './decorator';

export class Model {

  @propertyRemap('name')
  title : string;
  @propertyRemap('salesPrices')
  @propertyRemap('tagPriceNumeric', 'tagPrice')
  pricing : {
    tagPrice : number;
    currency : {
      symbol : string,
      tax : number
    }
  }

}
export const data : Model[] = [
  {
    title : 'First entry',
    pricing: {
      tagPrice : 133.99,
      currency : {
        symbol : 'DKK',
        tax : 12
      }
    }
  }
]