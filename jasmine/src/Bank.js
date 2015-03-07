function Bank() {
    this.balance = 0;
    this.movements = new MovementList();

    this.makeDeposit = function(amount, date){
        this.balance += amount;
        this.movements.push([date, amount, this.balance]);
        return [amount, date];
    }

    this.withdrawalMoney = function (amount, date){
        this.balance -= amount;
        this.movements.push([date, -(amount), this.balance])
        return [amount, date];
    }
}


function MovementList(){
    this.items = [];

    this.push = function(item){
        this.items.push(item);
    }

    this.lastMovement = function(){
        return this.items.slice(-1)[0];
    }

    this.getDeposits = function(){
        return this.items.filter(function(movement){
            return movement[1]>0;
        });
    }

    this.getWithdrawals = function(){
        return this.items.filter(function(movement){
            return movement[1]<0;
        });
    }
}