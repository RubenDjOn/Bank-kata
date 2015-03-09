describe("Bank", function() {
  var bank;  
  
  beforeEach(function(){
    bank = new Bank();
    movement1 = jasmine.objectContaining({ date:'10-01-2012', amount:1000, balance: 1000});
    movement2 = jasmine.objectContaining({ date:'13-01-2012', amount:2000, balance: 3000});
    movement3 = jasmine.objectContaining({ date:'14-01-2012', amount:-500, balance: 2500});
    allMovements = [movement1, movement2, movement3];
    deposits = [movement1, movement2];
    withdrawals = [movement3];
    date = new Date();    
  });

  describe('Client make a deposit', function() {
    it('Given a client makes a deposit of 1000 on 10-01-2012', function() {      
      spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000, date.now());
      expect(bank.balance).toEqual(1000);
      expect(bank.movements.lastMovement()).toEqual(movement1);
    });
    it('And a deposit of 2000 on 13-01-2012', function() {
      var spy = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000, date.now());
      spy.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, date.now());
      expect(bank.balance).toEqual(3000);
      expect(bank.movements.lastMovement()).toEqual(movement2);
    });
  });

  describe('Client Withdrawal Money', function() {
    it('And a withdrawal of 500 on 14-01-2012', function() {
      var spy = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      spy.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      spy.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(bank.balance).toEqual(2500);
      expect(bank.movements.lastMovement()).toEqual(movement3);
    });    
  });

  describe('Get Acount movements', function() {
    it('Get all bank account movements', function() {
      var spy = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      spy.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      spy.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(bank.movements.items).toEqual(allMovements);
    });
    it('Get account deposits', function() {
      var spy = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      spy.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      spy.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(bank.movements.getDeposits()).toEqual(deposits);
    });
    it('Get account withdrawals', function() {
      var spy = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      spy.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      spy.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(bank.movements.getWithdrawals()).toEqual(withdrawals);
    });    
  });

  /*describe('Statement printing', function() {
    it('Print latest movement', function() {
      expect(bank.printLastMovement()).toEqual("14/01/2012 || || 500.00 || 2500.00");      
    });    
  });*/
});

/*
toEqual(jasmine.objectContaining(
{ date: '10-01-2012', amount: 1000, balance: 1000 })
);
*/
/*
Given a client makes a deposit of 1000 on 10-01-2012
And a deposit of 2000 on 13-01-2012
And a withdrawal of 500 on 14-01-2012
When she prints her bank statement
Then she would see
date       || credit   || debit    || balance 
14/01/2012 ||          || 500.00   || 2500.00
13/01/2012 || 2000.00  ||          || 3000.00
10/01/2012 || 1000.00  ||          || 1000.00 
*/