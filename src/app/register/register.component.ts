import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterUser } from '../_models/registeruser';
import { User } from '../_models/user';
import { RegistrationService } from '../_services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm!: FormGroup;
  validationErrors: string[] = [];
  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValues('password'),
      ]),
      knownAs: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  register() {
    console.log(this.registerForm.value);
    /*  this.registrationService.register(this.model).subscribe(
      (response) => {
        this.reset();
      },
      (error) => {
        this.validationErrors = error;
      }
    ); */
  }

  reset() {
    this.cancelRegister.emit(false);
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control?.parent?.controls as any;
      return forbidden
        ? control?.value === forbidden[matchTo]?.value
          ? null
          : { isMatching: true }
        : null;
    };
  }
}
