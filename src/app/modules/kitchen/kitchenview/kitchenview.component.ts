import { Component } from "@angular/core";

@Component({
  selector: "app-kitchenview",
  templateUrl: "./kitchenview.component.html",
  styleUrls: ["./kitchenview.component.css"],
})
export class KitchenviewComponent {
  heroes = [
    { id: 1, name: "Superman" },
    { id: 2, name: "Batman" },
    { id: 5, name: "BatGirl" },
    { id: 3, name: "Robin" },
    { id: 4, name: "Flash" },
  ];
  dborders = [
    {
      id: 1,
      status: "Waiting",
      food: [
        { id: 1, status: "Fertig", food: "food1", amount: 5 },
        { id: 2, status: "in Bearbeitung", food: "food1", amount: 5 },
      ],
      drinks: [
        { id: 1, status: "in Bearbeitung", drink: "drink1", amount: 5 },
        { id: 2, status: "in Bearbeitung", drink: "drink2", amount: 5 },
      ],
    },
    {
      id: 2,
      status: "in Bearbeitung",
      food: [
        { id: 1, status: "in Bearbeitung", food: "food1", amount: 5 },
        { id: 2, status: "in Bearbeitung", food: "food1", amount: 5 },
      ],
      drinks: [
        { id: 1, status: "in Bearbeitung", drink: "drink1", amount: 5 },
        { id: 2, status: "in Bearbeitung", drink: "drink2", amount: 5 },
      ],
    },
    {
      id: 5,
      status: "Fertig",
      food: [
        { id: 1, status: "in Bearbeitung", food: "food1", amount: 5 },
        { id: 2, status: "Fertig", food: "food1", amount: 5 },
      ],
      drinks: [
        { id: 1, status: "in Bearbeitung", drink: "drink1", amount: 5 },
        { id: 2, status: "in Bearbeitung", drink: "drink2", amount: 5 },
      ],
    },
    {
      id: 3,
      status: "in Bearbeitung",
      food: [
        { id: 1, status: "in Bearbeitung", food: "food1", amount: 5 },
        { id: 2, status: "in Bearbeitung", food: "food1", amount: 5 },
      ],
      drinks: [
        { id: 1, status: "in Bearbeitung", drink: "drink1", amount: 5 },
        { id: 2, status: "in Bearbeitung", drink: "drink2", amount: 5 },
      ],
    },
    {
      id: 4,
      status: "Fertig",
      food: [
        { id: 1, status: "in Bearbeitung", food: "food1", amount: 5 },
        { id: 2, status: "Fertig", food: "food1", amount: 5 },
        { id: 3, status: "in Bearbeitung", food: "food1", amount: 5 },
        { id: 4, status: "in Bearbeitung", food: "food1", amount: 5 },
        { id: 5, status: "in Bearbeitung", food: "food1", amount: 5 },
      ],
      drinks: [
        { id: 1, status: "in Bearbeitung", drink: "drink1", amount: 5 },
        { id: 2, status: "in Bearbeitung", drink: "drink2", amount: 5 },
      ],
    },
  ];
  orders = this.dborders;
  ordervergleich = this.orders;
  constructor() {}

  ngOnInit(): void {
    this.add();
    this.prepareorders();
  }

  prepareorders() {
    /*for (int i = 0; i< this.orders.lengt; i++){

    }
    this.orders.forEach(id=> {

      id.food.forEach(food => {
        food.add = 1
        
      });
      id.drinks.forEach(drink => {
        drink["ready"] = false

      });
      
    });*/
  }
  async add() {
    var a = 5;
    while (a < 10) {
      console.log("adding");
      await this.Sleep(10000);
      this.dborders.push({
        id: a,
        status: "Waiting",
        food: [
          { id: 1, status: "in Bearbeitung", food: "food1", amount: 5 },
          { id: 2, status: "in Bearbeitung", food: "food1", amount: 5 },
        ],
        drinks: [
          { id: 1, status: "in Bearbeitung", drink: "drink1", amount: 5 },
          { id: 2, status: "in Bearbeitung", drink: "drink2", amount: 5 },
        ],
      });
      a++;
      console.log(this.dborders);
    }
  }
  fertig(orderindex: number) {
    this.orders[orderindex]!.status = "Fertig";
  }

  foodready(orderid: number, foodid: number) {
    //this.orders[order].food[foodindex].amount
    this.dborders[orderid].food[foodid].status = "Fertig";

    this.checkorderstatus(orderid);
  }

  drinkready(orderid: number, drinkid: number) {
    this.dborders[orderid].drinks[drinkid].status = "Fertig";

    this.checkorderstatus(orderid);
  }

  checkorderstatus(orderid: number) {
    let edit: Boolean = false;
    const a = this.dborders[orderid].food.forEach(
      (element: { id: number; status: string }) => {
        console.log(element);

        if (element.status != "Fertig") {
          edit = true;
          console.log("RAUUUUUUUUUUUUUUUS!");
          return;
        }
      }
    );
    this.dborders[orderid].drinks.forEach(
      (element: { id: number; status: string }) => {
        console.log(element);
        if (element.status != "Fertig") {
          edit = true;

          return;
        }
      }
    );
    console.log(a);
    if (!edit) {
      this.dborders[orderid].status = "Fertigstellen";
    }
  }

  inQuery(order: any): boolean {
    return order.status == "Waiting";
  }
  inProgress(order: any) {
    return order.status == "in Bearbeitung" || order.status == "Fertigstellen";
  }
  isReleasable(order: any) {
    return order.status == "Fertigstellen";
  }
  isready(order: any): boolean {
    if (order.status == "Fertig") {
      return true;
    } else {
      return false;
    }
  }
  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  foodstatus(food: any) {
    try {
      return food.status == "Fertig";
    } catch {
      return false;
    }
  }
  drinkstatus(drink: any) {
    try {
      return drink.status == "Fertig";
    } catch {
      return false;
    }
  }
  async bearbeiten(orderindex: any) {
    //await this.Sleep(10000)
    this.orders[orderindex].status = "in Bearbeitung";
  }
  async complete(orderindex: any) {
    //await this.Sleep(10000)
    this.orders[orderindex].status = "Fertig";
  }
  ostatus(orderindex: number) {
    return this.orders[orderindex].status == "Fertig";
  }
}
