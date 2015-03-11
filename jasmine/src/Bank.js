function Bank(date, movements) {
    this.balance = 0;
    this.date = date;
    this.movements = movements;

    this.makeDeposit = function(amount){
        this.balance += amount;
        movement = new Movement(this.date.now(), amount, this.balance)
        this.movements.push(movement);
    }

    this.withdrawalMoney = function (amount){
        this.balance -= amount;
        movement = new Movement(this.date.now(), -(amount), this.balance)
        this.movements.push(movement);
    }
}

function Movement(date, amount, balance){
    this.date = date;
    this.amount = amount;
    this.balance = balance;

    this.getType = function(){
        return this.amount > 0 ? 'credit' : 'debit';
    }
    this.toArray = function(){
        return [this.date, this.amount, this.balance];
    }

    this.toString = function(){
        var data = [this.getType(), this.date, (Math.abs(this.amount)).toFixed(2), (this.balance).toFixed(2)];
        return data.toString();
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

    this.getByDate = function(date){        
        return this.items.filter(function(movement){
            return movement.date == date;
        });
    }

    this.toArray = function(){
        return this.items.map(function(movement){
            return movement.toArray();
        });
    }
}

function Printer(movements){
    this.movements = movements;

    this.printStatement = function(){
        var movementsToString = this.movements.reverse().map(function(movement){
            return movement.toString();
        });
        return movementsToString.join(' | ');
    }

    this.printMovement = function(movement){        
        return movement.toString();
    }
}

function Date(){
    this.now = function(){}
}