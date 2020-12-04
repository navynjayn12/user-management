import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private service: CommonService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.form.valid) {
      const { userName, password } = form.form.value;
      this.service.login(userName, password).subscribe((res: any) => {
        if (res.success) {
          this.router.navigate(['user'])
        }
      }, err => {
        alert(err)
      })

    } else {
      (function touchedformcontrol(control) {
        Object.values(control.controls).forEach((val: any) => {
          val.markAsTouched();
          if (val.controls) {
            return touchedformcontrol(val);
          }
        });
      })(form.form);
    }
  }

}
