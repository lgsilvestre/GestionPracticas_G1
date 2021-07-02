import { Component } from "@angular/core";
import { FormControl, Validators, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';



@Component({
	selector: "app-editar-cuenta",
	templateUrl: "./editar-cuenta.component.html",
	styleUrls: ['./editar-cuenta.component.css', '../../app.component.css']

})
export class EditarCuentaComponent {
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	contrasena = new FormControl('', Validators.compose([
		Validators.minLength(5),
		Validators.required,
		Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
	]))

	// private _validacionContrasena = new FormGroup({
	//     password: new FormControl('', Validators.compose([
	//         Validators.minLength(5),
	//         Validators.required,
	//         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
	//     ])),
	//     confirm_password: new FormControl('', Validators.required)
	// }, (formGroup: FormGroup) => PasswordValidator.areEqual(formGroup));
	// public get validacionContrasena() {
	//     return this._validacionContrasena;
	// }
	// public set validacionContrasena(value) {
	//     this._validacionContrasena = value;
	// }



	// private _contrasena: string = '';

	// private _contrasena_validacion: string = '';


	// public get contrasena(): string 
	// {
	//     return this._contrasena;
	// }
	// public set contrasena(value: string) 
	// {
	//     this._contrasena = value;
	// }

	// public get contrasena_validacion(): string 
	// {
	//     return this._contrasena_validacion;
	// }

	// public set contrasena_validacion(value: string) 
	// {
	//     this._contrasena_validacion = value;
	// }



	//     passwordForm: FormGroup | undefined
	//     ngOnInit()
	//     {
	//         this.passwordForm = new FormGroup({
	//             'newPassword': new FormControl('', [Validators.required,]),
	//             'newPasswordConfirm': new FormControl('', [Validators.required])
	//             },
	//              { validators: passwordMatchValidator });
	//     }

	// }
	// export function passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
	//     return formGroup.get('newPassword').value === formGroup.get('newPasswordConfirm').value ?
	//         null : { 'passwordMismatch': true };
	// }



	// min_caracteres = 8;
	// private _contrasenaformControl = new FormGroup('', [
	//     contrasena, ['', [Validators.required, Validators.minLength(this.min_caracteres)]],
	//     contrasena2, ['', [Validators.required]]
	// ]);
	//     public get contrasenaformControl() {
	//         return this._contrasenaformControl;
	//     }
	//     public set contrasenaformControl(value) {
	//         this._contrasenaformControl = value;
	//     }
	// })

	//    constructor(private formBuilder: FormBuilder) 
	//    { }

	//   ngOnInit() 
	//   {
	//     this.formGroup = new FormControl( '', [//this.formBuilder.group({
	//       contrasena: ['', [Validators.required, Validators.minLength(this.min_caracteres)]],
	//       contrasena2: ['', [Validators.required]]
	//     }) //{validator: passwordMatchValidator});
	//   }

	//   get obtenerContrasena() 
	//   { 
	//       return this.formGroup.get('contrasena'); 
	//   }

	//   get obtenerContrasena2() 
	//   { 
	//       return this.formGroup.get('contrasena2'); 
	//   }

	//   onPasswordInput() 
	//   {
	//     if (this.formGroup.hasError('passwordMismatch'))
	//         this.obtenerContrasena2.setErrors([{'passwordMismatch': true}]);
	//     else
	//       this.obtenerContrasena2.setErrors(null);
	//   }


	// }


	// export function passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
	//     if (formGroup.get('contrasena').value === formGroup.get('contrasena2').value)
	//         return null;

	//     else
	//         return { passwordMismatch: true };
}
