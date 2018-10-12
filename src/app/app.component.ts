import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	genders = ['male', 'female'];
	signupForm: FormGroup;

	ngOnInit() {
		// create form
		// controls: key - value pairs
		this.signupForm = new FormGroup({
			// azért stringek, hogy minify közben ne rontsa el a form-JS összerendelést
			'userData': new FormGroup({
				'username': new FormControl(null, Validators.required),
				'email': new FormControl(null, [Validators.required, Validators.email])
			}),
			'gender': new FormControl('male'),
			'hobbies': new FormArray([])
		});
	}

	onSubmit() {
		console.log(this.signupForm);
	}

	// dinamikus mezők
	onAddHobby() {
		const control = new FormControl(null, Validators.required);
		// casting
		(<FormArray>this.signupForm.get('hobbies')).push(control);
	}
}
