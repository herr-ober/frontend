import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.css']
})

export class OrderviewComponent implements OnInit {
  heroes = [
    {id: 1, name:'Superman'},
    {id: 2, name:'Batman'},
    {id: 5, name:'BatGirl'},
    {id: 3, name:'Robin'},
    {id: 4, name:'Flash'}
  ];
  dborders = [
    {id: 1, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 2, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 5, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 3, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 4, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5},{id:3, status:"in Bearbeitung", food:"food1", amount:5},{id:4, status:"in Bearbeitung", food:"food1", amount:5},{id:5, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]}
  ];
  orders = this.dborders;
  ordervergleich = this.orders;
  constructor() { }

  ngOnInit(): void {
    this.add()
    this.prepareorders()
  }


  prepareorders(){
    

  }
  async add(){
    var a = 5
    while (a < 10){

    
      await this.Sleep(10000)
      this.dborders.push({id: a, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]})
      a ++
    }
  }
  fertig(orderindex: number){
    this.orders[orderindex]!.status = "Fertig"

  }

  drinkready(orderindex: number, drinkindex: number){
    console.log(orderindex)
    console.log(drinkindex)
    console.log(this.orders[orderindex].drinks[drinkindex].amount)
    if(this.orders[orderindex].drinks[drinkindex].amount == 1){

    }
    else{
    this.orders[orderindex]!.drinks[drinkindex]!.amount = (this.orders[orderindex]!.drinks[drinkindex]!.amount - 1)
    }
  }

  foodready(orderindex: number, foodindex: number){
        console.log(orderindex)
        console.log(foodindex)
        console.log(this.orders[orderindex].food[foodindex].amount)
        console.log(typeof(this.orders[orderindex].food[foodindex].amount))
        console.log(this.orders[orderindex].food[foodindex].amount - 1)

    if(this.orders[orderindex].food[foodindex].amount == 1){

    }
    else{

    
      this.orders[orderindex].food[foodindex].amount = (this.orders[orderindex].food[foodindex].amount - 1)
    }
    console.log((this.orders[orderindex].food[foodindex].amount))

  }

  isnotready(order: any): boolean{

    if(order.status == "Fertig"){

      return false
    }
    else{

      return true
    }
  }
  Sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

}
