import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  message: string;
  messageSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.messageSubscription = this.route.data.subscribe(
      (data: Data) => {
        this.message = data['message'];
      }
    );

  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

}
