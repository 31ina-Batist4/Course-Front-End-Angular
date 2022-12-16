import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { visibility, flyInOut, expand} from '../animations/app.animation';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class DishdetailComponent implements OnInit {

  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  dishIds: string[];
  dishcopy: Dish;
  dish: any = Dish;
  errMess: string; 
  @ViewChild('fform') commentFormDirective;
  visibility ='shown';

  formErrors = {
    'comment': '',
    'author': ''
  };

  validationMessages = {
     'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.',
      'maxlength': 'Comment  cannot be more than 200 characters long.'
     },
     'author': {
      'required': 'Author is required.',
      'minlength': 'Name author must be at least 2 characters long.',
      'maxlength': 'Name author cannot be more than 25 characters long.'
     }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location, 
    private ct: FormBuilder,
    @Inject('BaseURL')private BaseURL) { }
    
    ngOnInit() {
    this.createForm();

    this.dishService.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) =>
     { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility ='shown'; },
      errmess => this.errMess = <any>errmess);
  }
  createForm() {
    this.commentForm = this.ct.group({
    rating: 5, 
    comment: ['', Validators.required],
    author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (reset form validation messages
  }
   
  onValueChanged(data?: any) {
    if (!this.commentForm) return;//verifica se tem  formulário criado
    const form = this.commentForm;//define uma constante copia do formulário
    for ( const field in this.formErrors) {//define uma constante que percorre o objeto formulario de erros
     if (this.formErrors.hasOwnProperty(field)) {//verifica se tem alguma menssagem de erro anexada a esse campo
       // clear previous error message (if any)
       this.formErrors[field] = '';//acessa um campo especifico do formulario de erros e limpa
       const control = form.get(field);//define uma constante que obtem valor do campo
       if(control && control.dirty && !control.valid){//verifica se o valor é nulo ou se contem algum valor e se o valor é valido
         const messages = this.validationMessages[field];//constante que obtem o valor do objeto de messangens de erros do campo
         for (const key in control.errors) {//define constante que percorre o objeto
           if(control.errors.hasOwnProperty(key)) {//verifica se há algum valor
             this.formErrors[field] += messages[key] + '';
           }
         }
       }
     }
    }
 }
 

  setPrevNext(dishId: string) {
     const index = this.dishIds.indexOf(dishId);
     this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
     this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }  
  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toDateString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish;
      this.dishcopy = dish;
    },
    errmess => {
      this.dish = null; 
      this.dishcopy =  null;
    this.errMess = <any>errmess;
  });
    this.commentForm.reset({
      rating: 0,
      comment: '',
      author: '',
      date: ''
    });
    this.commentFormDirective.resetForm({ 
      rating: 5,
      comment: '',
      author: '',
      date:'' });
  }
}