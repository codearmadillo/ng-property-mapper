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

    Object.keys(source).forEach((key : string) => {
      
      /** If property is mapped, rewrite it */
      if(this.mapping.hasOwnProperty(key)) {
        
        /** If there is a blocking key, throw error */
        if(source.hasOwnProperty(this.mapping[key])) {

          throw new Error(`Duplicate property detected for '${key} => ${this.mapping[key]}'! Object cannot be mapped.`);
          
        }

        if(this.exclusion.indexOf(key) === -1) {

          this.target[this.mapping[key]] = source[key];

        }
        
      } else {

        if(this.exclusion.indexOf(key) === -1) {

          this.target[key] = source[key];
        
        }

      }

    });

    return this.target;
    
  }

}
export const propertyRemap = (source : string) => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingMatrix']){
      target.constructor['mappingMatrix'] = {};
    }
    target.constructor['mappingMatrix'][property] = source;
  }
}
export const propertyRemove = () => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingExclusionMatrix']) {
      target.constructor['mappingExclusionMatrix'] = [];
    }
    target.constructor['mappingExclusionMatrix'].push(property);
  }
}