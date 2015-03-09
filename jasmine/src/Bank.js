function Bank() {
    this.balance = 0;
    this.movements = new MovementList();

    this.makeDeposit = function(amount, date){
        this.balance += amount;
        movement = new Movement(date, amount, this.balance)
        this.movements.push(movement);
    }

    this.withdrawalMoney = function (amount, date){
        this.balance -= amount;
        movement = new Movement(date, -(amount), this.balance)
        this.movements.push(movement);
    }
}

function Movement(date, amount, balance){
    this.date = date;
    this.amount = amount;
    this.balance = balance;

    this.toArray = function(){
        return [this.date, this.amount, this.balance];
    }
}

function MovementList(){
    this.items = [];

    this.push = function(movement){
        this.items.push(movement);
    }

    this.lastMovement = function(){
        return this.items.slice(-1)[0];
    }

    this.getDeposits = function(){
        return this.items.filter(function(movement){
            return movement.amount>0;
        });
    }

    this.getWithdrawals = function(){
        return this.items.filter(function(movement){
            return movement.amount<0;
        });
    }

    this.toArray = function(){
        return this.items.map(function(movement){
            return movement.toArray();
        });
    }
}