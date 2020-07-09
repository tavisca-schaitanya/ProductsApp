import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ProductLogic } from '../models/product-logic';

export class CustomValidator {
   static Duplicate(productLogic: ProductLogic): ValidatorFn {
     return (ctrl: AbstractControl) => {
        const value: string = ctrl.value;

        if(productLogic.isDuplicate(value)){
            return {duplicate: true}
        }
        return null;
     }
   };
}