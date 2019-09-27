import { Model } from './models';

export class Mapper<T> {

  exclusion : string[];
  mapping: any;
  target: any;
  test : any;

  constructor(type : { new () : T } ) {

    this.test = new type();
    this.target = new type();
    this.mapping = this.target.constructor.mappingMatrix ? this.target.constructor.mappingMatrix : {};
    this.exclusion = this.target.constructor.mappingExclusionMatrix ? this.target.constructor.mappingExclusionMatrix : [];

  }

  map(source) : any {

    const mapNestedSchema = (from : object, to : object, trail : string = null) => {

      Object.keys(from).forEach((key : string) => {

        let trailFormatted = (trail ? trail + '.' : '') + key;
        if(this.mapping.hasOwnProperty(trailFormatted))

      });
      
    } 

    mapNestedSchema(source, this.test);

    console.log(this.test);

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

    return this.target;

  }

}
export const propertyRemap = (source : string, nestedKey? : string) => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingMatrix']){
      target.constructor['mappingMatrix'] = {};
    } 
    if(nestedKey) {
      target.constructor['mappingMatrix'][nestedKey] = source;
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