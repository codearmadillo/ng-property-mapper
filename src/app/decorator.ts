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

    /** Returns nested schema reference */
    const nested = (schema : object, key : string) => {

      let keys = key.split('.');
      let firstKey = keys.shift();

      if(keys.length > 0) {
        return nested(schema[firstKey], keys.join('.'));
      }

      return schema;

    }

    this.target = source;

    /** Iterate through mapped values */
    Object.keys(this.mapping).forEach((key : string) => {

      let rewriteParameter = this.mapping[key];
      let keyParameter = key.split('.')[key.split('.').length - 1];
      let workingSchema = nested(this.target,key);

      workingSchema[rewriteParameter] = workingSchema[keyParameter];
      delete workingSchema[keyParameter];

    });

    return this.target;
    
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
export const propertyRemove = (nestedTarget? : string) => {
  return (target : object, property : string) => {
    if(!target.constructor['mappingExclusionMatrix']) {
      target.constructor['mappingExclusionMatrix'] = [];
    }
    if(nestedTarget) {
      target.constructor['mappingExclusionMatrix'].push(property + '.' + nestedTarget);
    } else {
      target.constructor['mappingExclusionMatrix'].push(property);
    }
  }
}