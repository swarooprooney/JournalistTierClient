import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  validationErrors: string[] = [];
  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {}

  register() {
    this.registrationService.register(this.model).subscribe(
      (response) => {
        this.reset();
      },
      (error) => {
        this.validationErrors = error;
      }
    );
  }

  reset() {
    this.cancelRegister.emit(false);
  }
}
