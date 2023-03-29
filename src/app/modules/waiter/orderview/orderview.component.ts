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
    {id: 1, status:'in Bearbeitung', food:[{id:1, status:"Fertig", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 2, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 3, status:'Fertig', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"Fertig", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 4, status:'Completed', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]},
    {id: 5, status:'Fertig', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"Fertig", food:"food1", amount:5},{id:3, status:"in Bearbeitung", food:"food1", amount:5},{id:4, status:"in Bearbeitung", food:"food1", amount:5},{id:5, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]}
  ];
  orders = this.createorders();
  ordervergleich = this.orders;
  constructor() { }

  ngOnInit(): void {
    this.add()
  }

  createorders(){
    var orderlist: any[] = []
    this.dborders.forEach(order => {
      if(order.status == "Fertig"){
        orderlist.push(order)
      }
    })
    this.dborders.forEach(order => {
      if(order.status == "in Bearbeitung"){
        orderlist.push(order)
      }
    })
    this.dborders.forEach(order => {
      if(order.status == "Completed"){
        orderlist.push(order)
      }
    })

    return orderlist
  }
  updatorders(){
    this.dborders.forEach(order => {
      const exists = this.orders.findIndex(element => element.id === order.id) > -1;
      if(!exists){
        this.orders.push(order);
      }
    })

  }

  
  async add(){
    var a = 5
    while (a < 100){

      console.log("add")
      await this.Sleep(10000)
      console.log("add")

      this.orders.push({id: a, status:'in Bearbeitung', food:[{id:1, status:"in Bearbeitung", food:"food1", amount:5},{id:2, status:"in Bearbeitung", food:"food1", amount:5}], drinks:[{id:1, status:"in Bearbeitung", drink:"drink1", amount:5},{id:2, status:"in Bearbeitung", drink:"drink2", amount:5}]})
      a ++
    }
  }
  fertig(orderindex: number){
    this.orders[orderindex]!.status = "Fertig"
    //Datenbank order als completed marken0
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

  isnotcompleted(order: any): boolean{

    if(order.status == "Completed"){

      return false
    }
    else{

      return true
    }
  }

  isready(order: any): boolean{

    return order.status == "Fertig"
  }
  Sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

  
  ostatus(orderindex: number){
    return this.orders[orderindex].status == "Fertig"

  }

  async abholen(orderindex: any){
    //await this.Sleep(10000)
    this.orders[orderindex].status = "Completed" 
  }
}
