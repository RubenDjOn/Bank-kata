describe("Bank", function() {
  var bank, movements;  
  var movement1 = jasmine.objectContaining({ date:'10-01-2012', amount:1000, balance: 1000});
  var movement2 = jasmine.objectContaining({ date:'13-01-2012', amount:2000, balance: 3000});
  var movement3 = jasmine.objectContaining({ date:'14-01-2012', amount:-500, balance: 2500});
  var allMovements = [movement1, movement2, movement3];
  var deposits = [movement1, movement2];
  var withdrawals = [movement3];
  var date = new Date();  
  var printer;

  beforeEach(function(){
    movementList = new MovementList();
    printer = new Printer(movementList.items);
    bank = new Bank(date, movementList);
  });

  describe('Client make a deposit', function() {
    it('Given a client makes a deposit of 1000 on 10-01-2012', function() {      
      spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000);
      expect(bank.balance).toEqual(1000);
      expect(movementList.lastMovement()).toEqual(movement1);
    });
    it('And a deposit of 2000 on 13-01-2012', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000);
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000);
      expect(bank.balance).toEqual(3000);
      expect(movementList.lastMovement()).toEqual(movement2);
    });
  });

  describe('Client Withdrawal Money', function() {
    it('And a withdrawal of 500 on 14-01-2012', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(bank.balance).toEqual(2500);
      expect(movementList.lastMovement()).toEqual(movement3);
    });    
  });

  describe('Get Acount movements', function() {
    it('Get all bank account movements', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(movementList.items).toEqual(allMovements);
    });
    it('Get account deposits', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(movementList.getDeposits()).toEqual(deposits);
    });
    it('Get account withdrawals', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');  
      expect(movementList.getWithdrawals()).toEqual(withdrawals);
    });
    it('Get account movements by date 14-01-2012', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');
      expect(movementList.getByDate('14-01-2012')).toEqual([movement3]);      
    });    
  });
  
  describe('Print Statements', function() {
    it('Print last statement', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');
      expect(printer.printMovement(movementList.lastMovement())).toEqual('debit,14-01-2012,500.00,2500.00');
    });
    it('Print full statement', function() {
      var mockDay = spyOn(date, 'now').and.returnValue('10-01-2012');
      bank.makeDeposit(1000,'10-01-2012');
      mockDay.and.returnValue('13-01-2012');
      bank.makeDeposit(2000, '13-01-2012');
      mockDay.and.returnValue('14-01-2012');
      bank.withdrawalMoney(500,'14-01-2012');
      expect(printer.printStatement()).toEqual('debit,14-01-2012,500.00,2500.00 | credit,13-01-2012,2000.00,3000.00 | credit,10-01-2012,1000.00,1000.00');
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