import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	genders = ['male', 'female'];
	signupForm: FormGroup;
	forbiddenUsernames = ['Chris', 'Anna'];

	ngOnInit() {
		// create form
		// controls: key - value pairs
		this.signupForm = new FormGroup({
			// azért stringek, hogy minify közben ne rontsa el a form-JS összerendelést
			'userData': new FormGroup({
				'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
				'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
			}),
			'gender': new FormControl('male'),
			'hobbies': new FormArray([])
		});

		// form status
		this.signupForm.valueChanges.subscribe(
			value => console.log(value)
		);

		// itt lehet a pendingre ráülni
		this.signupForm.statusChanges.subscribe(
			value => console.log(value)
		);

		// set value ugyanúgy
		// 	this.signupForm.setValue({
		// 		'userData': {
		// 			username: 'asd',
		// 			email: 'a@b.hu'
		// 		},
		// 		gender: 'male',
		// 		hobbies: []
		// 	});

		// patch va
		this.signupForm.patchValue({
			'userData': {
				'username': 'makika'
			}
		});
	}

	onSubmit() {
		console.log(this.signupForm);
		this.signupForm.reset();
	}

	// dinamikus mezők
	onAddHobby() {
		const control = new FormControl(null, Validators.required);
		// casting
		(<FormArray>this.signupForm.get('hobbies')).push(control);
	}

	// custom validator
	// ha valid, semmivel kell visszatérni
	forbiddenNames(control: FormControl): {[s: string]: boolean} {
		if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
			return {
				'nameIsForbidden': true
			};
		}
		return null;
	}

	forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				if (control.value === 'test@test.com') {
					resolve({
						'emailIsForbidden': true
					});
				} else {
					resolve(null);
				}
			}, 1500);
		});
		return promise;
	}
}
