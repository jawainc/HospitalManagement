import {AbstractControl, ValidatorFn, AsyncValidatorFn} from "@angular/forms";


/**
 *
 * @returns {(control:AbstractControl)=>{[p: string]: any}}
 * @constructor
 */
export function NotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {


    if (!control.value || typeof control.value === 'string' && !control.value.trim()) {
      return {
        required: true
      };
    }

    return null;


  }
}


/**
 *
 * @param comparison (lte, lt, gte, gt)
 * @param compareTo
 * @returns {(control:AbstractControl)=>(null|{comparison: boolean})}
 * @constructor
 */
export  function CompareValidator(comparison, component?: any): ValidatorFn{

  return (control: AbstractControl) => {
    let result = true;
    if (typeof control.value === 'string' && control.value.trim()) {

      let val = control.value.trim();

      switch (comparison){
        case "lte": {
          result = (Number(val) <= Number(component.DoctorFee));
          break;
        }
        case "lt": {
          result = (Number(val) < Number(component.DoctorFee));
          break;
        }
        case "gte": {
          result = (Number(val) >= Number(component.DoctorFee));
          break;
        }
        case "gt": {
          result = (Number(val) > Number(component.DoctorFee));
          break;
        }
        default: {
          result = true;
          break;
        }
      }


    }

    if(result)
      return null;
    else
      return {
        comparison: true
      };
  }

}

/**
 *
 * @param data   {url: string, column: string}
 * @param component
 * @returns {(control:AbstractControl)=>(Promise<T>|Promise<T>)}
 * @constructor
 */
export function CreateUniqueNameValidator(data, component?: any): AsyncValidatorFn {

  return (control: AbstractControl) => {


    let val = control.value.trim();


    if(val.length < 3)
      return Promise.resolve(null);


    component.unique_pending = true;

    return new Promise((resolve, reject) => {

      let column_to_check = data.column;

      component.service.url = data.url;
      component.service.method = 'post';
      component.service.access_server({[column_to_check]: val})
        .subscribe(
          (data) => {

            component.unique_pending = false;


            if(data.status == "OK"){
              resolve(null)
            }
            else{
              component.formErrors [column_to_check] = component.validationMessages[column_to_check].unique;
              resolve({unique: true})
            }

          },
          (error) => {

            component.unique_pending = false;

            component.formErrors [column_to_check] = "Something Went Wrong";
            resolve({unique: true})
          }
        )


    });
  };
}




/**
 *
 * @param data   {url: string, column: string, id: string}
 * @param component
 * @returns {(control:AbstractControl)=>(Promise<T>|Promise<T>)}
 * @constructor
 */
export function UpdateUniqueNameValidator(data, component?: any): AsyncValidatorFn {

  return (control: AbstractControl) => {


    let val = control.value.trim();


    if(val.length < 3)
      return Promise.resolve(null);


    component.unique_pending = true;

    return new Promise((resolve, reject) => {

      let column_to_check = data.column;

      component.service.url = data.url;
      component.service.method = 'post';
      component.service.access_server({
        data: {
          [column_to_check]: val
        },
        id: data.id

      })
        .subscribe(
          (data) => {

            component.unique_pending = false;


            if(data.status == "OK"){
              resolve(null)
            }
            else{
              component.formErrors [column_to_check] = component.validationMessages[column_to_check].unique;
              resolve({unique: true})
            }

          },
          (error) => {

            component.unique_pending = false;

            component.formErrors [column_to_check] = "Something Went Wrong";
            resolve({unique: true})
          }
        )


    });
  };
}
