describe("Bank", function() {
  var bank;  
  bank = new Bank();      

  describe('Client make a deposit', function() {
    it('Given a client makes a deposit of 1000 on 10-01-2012', function() {      
      expect(bank.makeDeposit(1000,'10-01-2012')).toEqual([1000,'10-01-2012'])
      expect(bank.balance).toEqual(1000);
      expect(bank.movements.lastMovement()).toEqual(['10-01-2012',1000,1000]);
    });
    it('And a deposit of 2000 on 13-01-2012', function() {
      expect(bank.makeDeposit(2000, '13-01-2012')).toEqual([2000, '13-01-2012']);
      expect(bank.balance).toEqual(3000);
      expect(bank.movements.lastMovement()).toEqual(['13-01-2012',2000,3000]);
    });
  });

  describe('Client Withdrawal Money', function() {
    it('And a withdrawal of 500 on 14-01-2012', function() {
      expect(bank.withdrawalMoney(500,'14-01-2012')).toEqual([500,'14-01-2012']);  
      expect(bank.balance).toEqual(2500);
      expect(bank.movements.lastMovement()).toEqual(['14-01-2012', -500, 2500]);
    });    
  });

  describe('Get Acount movements', function() {
    it('Get all bank account movements', function() {
      expect(bank.movements.items).toEqual([['10-01-2012',1000,1000],
                                          ['13-01-2012',2000,3000],
                                          ['14-01-2012',-500,2500]]);
    });
    it('Get account deposits', function() {
      expect(bank.movements.getDeposits()).toEqual([['10-01-2012',1000,1000],
                                          ['13-01-2012',2000,3000]]);
    });
    it('Get account withdrawals', function() {
      expect(bank.movements.getWithdrawals()).toEqual([['14-01-2012',-500,2500]]);
    });    
  });

  describe('Statement printing', function() {
    it('Print latest movement', function() {
      expect(bank.printLastMovement()).toEqual("14/01/2012 || || 500.00 || 2500.00");      
    });    
  });
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