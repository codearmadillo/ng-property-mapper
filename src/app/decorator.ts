import { Model } from './models';

export class Mapper<T> {

  exclusion : string[];
  mapping: any;
  target: any;
  test : any;

  constructor(type : { new () : T } ) {

    this.target = new type();
    this.mapping = this.target.constructor.mappingMatrix ? this.target.constructor.mappingMatrix : {};
    this.exclusion = this.target.constructor.mappingExclusionMatrix ? this.target.constructor.mappingExclusionMatrix : [];

  }

  map(source) : any {

    const nested = (schema : object, key : string) => {

      let keys = key.split('.');
      let firstKey = keys.shift();

      if(keys.length > 0) {
        return nested(schema[firstKey], keys.join('.'));
      }

      return schema;

    }

    console.log(nested(source,'pricing'));
    console.log(nested(source,'pricing.currency'));
    console.log(nested(source,'pricing.currency.symbol'));

    const iterate = (from : object, to : object, depth : number = 0) => {

      Object.keys(from).forEach((key : string) => {

        /** If property is to be removed, skip iteration */
        if(this.exclusion.indexOf(key) !== -1) {
          
          return;

        }

        /** If property is mapped, rewrite it */
        if(this.mapping.hasOwnProperty(key)) {
          
          /** If there is a blocking key, throw error */
          if(from.hasOwnProperty(this.mapping[key])) {

            throw new Error(`Duplicate property detected for '${key} => ${this.mapping[key]}'! Object cannot be mapped.`);
            
          }

          to[this.mapping[key]] = from[key];
          
        } else {

          to[key] = from[key];

        }

      });

    }

    return this.target;

    Object.keys(source).forEach((key : string) => {

      /** If property is to be removed, skip iteration */
      if(this.exclusion.indexOf(key) !== -1) {
        
        return;

      }

      /** If property is mapped, rewrite it */
      if(this.mapping.hasOwnProperty(key)) {
        
        /** If there is a blocking key, throw error */
        if(source.hasOwnProperty(this.mapping[key])) {

          throw new Error(`Duplicate property detected for '${key} => ${this.mapping[key]}'! Object cannot be mapped.`);
          
        }

        this.target[this.mapping[key]] = source[key];
        
      } else {

        this.target[key] = source[key];

      }

    });

  }

}
export const propertyRemap = (source : string, nestedTarget? : string) => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingMatrix']){
      target.constructor['mappingMatrix'] = {};
    }
    if(nestedTarget) {
      target.constructor['mappingMatrix'][property + '.' + nestedTarget] = source;
    } else {
      target.constructor['mappingMatrix'][property] = source;
    }
  }
}
export const propertyRemove = (source? : string) => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingExclusionMatrix']) {
      target.constructor['mappingExclusionMatrix'] = [];
    }
    target.constructor['mappingExclusionMatrix'].push(property);
  }
}