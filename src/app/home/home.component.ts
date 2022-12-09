import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { Featured } from '../shared/featured';
import { PromotionService } from '../services/promotion.service';
import { FeaturedService } from '../services/featured.service';
import { LeaderService } from '../services/leader.service';
import { switchMap } from 'rxjs/operators';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: any = Dish;
  dishErrMess: string;
  promotion: Promotion;
  featured: Featured;
  leader: Leader;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    private featuredservice: FeaturedService,
    private route: ActivatedRoute,
    @Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);
        
        this.promotionservice.getFeaturedPromotion()
        .subscribe(promotion => this.promotion = promotion,
        errmess => this.dishErrMess = <any>errmess);
        
        this.leaderservice.getFeaturedLeader()
        .subscribe(leader => this.leader = leader,
        errmess => this.dishErrMess = <any>errmess);
        
        this.featuredservice.getFeaturedLeader()
        .subscribe(featured => this.featured = featured,
        errmess => this.dishErrMess = <any>errmess);
  }


}
