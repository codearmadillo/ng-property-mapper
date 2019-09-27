import { Model } from './models';

export class Mapper<T> {

  mapping: any;
  target: any;

  constructor(type : { new () : T } ) {
    this.target = new type();
    this.mapping = this.target.constructor.mappingMatrix;
  }

  map(source) : any {

    Object.keys(source).forEach((key : string) => {
      
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
export const propertyMap = (source : string) => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingMatrix']){
      target.constructor['mappingMatrix'] = {};
    } 
    target.constructor['mappingMatrix'][property] = source;
  }
}