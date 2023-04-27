import { IOrderFull, IPositions } from "src/app/shared/models/IOrder";

export class splitBill {

    submittedOrderPositions = new Map;
    openPaymentSubmitted: number | null = null;
    tempPaymentPositions = new Map;
    openPaymentTemp: number = 0;


    constructor(){
    }

    addToTempPayment(name: string): void{
        if (this.tempPaymentPositions.has(name)) {
            this.tempPaymentPositions.get(name).amount++;
        } else {
            let deepCopyOfPosition = JSON.parse(JSON.stringify(this.submittedOrderPositions.get(name))) as typeof Object;
            this.tempPaymentPositions.set(name, deepCopyOfPosition)
            this.tempPaymentPositions.get(name).amount = 1;
        }
        this.submittedOrderPositions.get(name).amount--;
        if (this.submittedOrderPositions.get(name).amount == 0) {
            this.submittedOrderPositions.delete(name);
        }
        this.openPaymentSubmitted = this.calcSum(this.submittedOrderPositions)
        this.openPaymentTemp = this.calcSum(this.tempPaymentPositions)
    }

    testFunction(name: string) {
        console.log("name: " + name);
        console.log("name enthalten in submitted" + this.submittedOrderPositions.has(name))
        console.log("name enthalten in temp" + this.tempPaymentPositions.has(name))
    }

    reduceFromTempPayment(name:string): void{

        if (this.submittedOrderPositions.has(name)) {
            this.submittedOrderPositions.get(name).amount++;
        } else {
            let deepCopyOfPosition = JSON.parse(JSON.stringify(this.tempPaymentPositions.get(name))) as typeof Object;
            this.submittedOrderPositions.set(name, deepCopyOfPosition)
            this.submittedOrderPositions.get(name).amount = 1;
        }
        this.tempPaymentPositions.get(name).amount--;
        if (this.tempPaymentPositions.get(name).amount == 0) {
            this.tempPaymentPositions.delete(name);
        }
        this.openPaymentSubmitted = this.calcSum(this.submittedOrderPositions)
        this.openPaymentTemp = this.calcSum(this.tempPaymentPositions)
    }

    calcSum(map: any): number {
        let result: number = 0;
        map.forEach((position: any) => {
            result = result + (position.amount * position.price);
        });
        return result;
    }

    resetTempPayment(): void{
        this.tempPaymentPositions.forEach(position => {
            this.tempPaymentPositions.delete(position.name);
        });
        this.openPaymentTemp = 0;
    }
}