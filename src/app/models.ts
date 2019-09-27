import { propertyRemap, propertyRemove } from './decorator';

export class Model {

  @propertyRemap('name') title : string;

  @propertyRemap('newPrice', 'pricing.tagPrice')
  pricing : {
    tagPrice : number;
    currencySymbol : string;
  }

}
export const data : Model[] = [
  {
    title : 'First entry',
    pricing: {
      tagPrice : 133.99,
      currencySymbol: 'USD'
    }
  }
]