import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegisterUser } from '../_models/registeruser';
import { RegistrationService } from '../_services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {}

  register() {
    this.registrationService.register(this.model).subscribe(
      (response) => {
        console.log(response);
        this.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reset() {
    this.cancelRegister.emit(false);
    console.log('Reset was called');
  }
}
