import { propertyRemap, propertyRemove } from './decorator';

export class Model {

  @propertyRemove()
  title : string;
  @propertyRemap('salesPrices')
  @propertyRemap('tagPriceNumeric', 'tagPrice')
  @propertyRemap('taxNumeric', 'currency.tax')
  @propertyRemove('currency.symbol')
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