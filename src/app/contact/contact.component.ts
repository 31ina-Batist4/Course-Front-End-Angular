import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut } from '../animations/app.animation';

import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut() 
    ]
})
export class ContactComponent implements OnInit {


  feedbackForm: FormGroup;
  feedback: Feedback;
  feedbackCopy?: Feedback = null;
  feedbackDone: boolean = true;
  feedbackErrMess: string = "";
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;
  visibility ='shown';
  
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
     'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.'
     },
     'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.'
     },
     'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
     },
     'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
     }
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService,
    @Inject('BaseURL')private BaseURL) {

      this.createForm();
    }

  ngOnInit() {
       this.feedbackService.getFeedbacks();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
 
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (reset form validation messages
  }
  onValueChanged(data?: any) {
     if (!this.feedbackForm) return;
     const form = this.feedbackForm;
     for ( const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        } 
      }
     }
  }

  
  onSubmit() {
    this.feedbackDone = false;
    this.feedback = this.feedbackForm.value;
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(fback => {
        this.feedbackCopy = fback;
        setTimeout(() => {
          this.feedbackCopy = null;
          this.feedbackDone = true;
        }, 5000);
     
      }, errmess => {
        this.feedbackErrMess = <any>errmess;
        setTimeout(() => {
          this.feedbackErrMess = '';
        }, 5000);
      });
  }

}
