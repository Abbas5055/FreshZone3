import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, Plus, IndianRupee, CreditCard, History, TrendingUp, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';

const Wallet = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);

  useEffect(() => {
    // Load wallet data from localStorage
    const walletData = localStorage.getItem('walletData');
    if (walletData) {
      const data = JSON.parse(walletData);
      setBalance(data.balance || 0);
      setTransactions(data.transactions || []);
    } else {
      // Initialize with mock transactions
      const initialTransactions = [
        {
          id: 'txn1',
          type: 'credit',
          amount: 1000,
          description: 'Wallet Recharged',
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
          status: 'success',
        },
        {
          id: 'txn2',
          type: 'debit',
          amount: 165,
          description: 'Order #order2',
          date: new Date(Date.now() - 86400000).toISOString(),
          status: 'success',
        },
      ];
      setTransactions(initialTransactions);
      setBalance(835);
      saveWalletData(835, initialTransactions);
    }
  }, []);

  const saveWalletData = (newBalance, newTransactions) => {
    const data = {
      balance: newBalance,
      transactions: newTransactions,
    };
    localStorage.setItem('walletData', JSON.stringify(data));
  };

  const handleRecharge = () => {
    const amount = parseFloat(rechargeAmount);
    if (!amount || amount < 10) {
      toast({ title: 'Minimum recharge amount is ₹10', variant: 'destructive' });
      return;
    }

    // Mock Razorpay payment
    const newTransaction = {
      id: 'txn_' + Date.now(),
      type: 'credit',
      amount: amount,
      description: 'Wallet Recharged',
      date: new Date().toISOString(),
      status: 'success',
    };

    const newBalance = balance + amount;
    const newTransactions = [newTransaction, ...transactions];

    setBalance(newBalance);
    setTransactions(newTransactions);
    saveWalletData(newBalance, newTransactions);

    setRechargeAmount('');
    setIsRechargeOpen(false);
    toast({
      title: 'Wallet recharged successfully!',
      description: `₹${amount} added to your wallet`,
    });
  };

  const quickAmounts = [100, 250, 500, 1000, 2000, 5000];

  const getTransactionIcon = (type) => {
    return type === 'credit' ? (
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-green-600" />
      </div>
    ) : (
      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
        <Download className="w-5 h-5 text-red-600" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wallet</h1>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Wallet Balance Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-green-600 to-green-500 text-white border-none shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-green-100 text-sm mb-2">Available Balance</p>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-10 h-10" />
                    <p className="text-5xl font-bold">{balance.toFixed(2)}</p>
                  </div>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <WalletIcon className="w-8 h-8" />
                </div>
              </div>

              <div className="flex gap-4">
                <Dialog open={isRechargeOpen} onOpenChange={setIsRechargeOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1 bg-white text-green-600 hover:bg-green-50">
                      <Plus className="w-5 h-5 mr-2" />
                      Add Money
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Recharge Wallet</DialogTitle>
                      <DialogDescription>
                        Add money to your FreshZone wallet for faster checkout
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div>
                        <Label>Enter Amount (₹)</Label>
                        <Input
                          type="number"
                          placeholder="Minimum ₹10"
                          value={rechargeAmount}
                          onChange={(e) => setRechargeAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>

                      <div>
                        <Label className="mb-3 block">Quick Select</Label>
                        <div className="grid grid-cols-3 gap-3">
                          {quickAmounts.map(amount => (
                            <Button
                              key={amount}
                              variant="outline"
                              onClick={() => setRechargeAmount(amount.toString())}
                              className="hover:bg-green-50 hover:border-green-500"
                            >
                              ₹{amount}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button
                        onClick={handleRecharge}
                        className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay via Razorpay
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        Secure payment powered by Razorpay
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <History className="w-5 h-5 mr-2" />
                  History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Wallet Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Instant Checkout</p>
                  <p className="text-xs text-gray-600">Pay instantly without entering card details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Cashback Offers</p>
                  <p className="text-xs text-gray-600">Earn cashback on every purchase</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">No Extra Charges</p>
                  <p className="text-xs text-gray-600">Zero transaction fees on wallet payments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="credit">Credits</TabsTrigger>
                <TabsTrigger value="debit">Debits</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {transactions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No transactions yet</p>
                  </div>
                ) : (
                  transactions.map(txn => (
                    <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        {getTransactionIcon(txn.type)}
                        <div>
                          <p className="font-medium text-gray-900">{txn.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(txn.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                        </p>
                        <Badge variant={txn.status === 'success' ? 'default' : 'secondary'} className="mt-1">
                          {txn.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="credit" className="space-y-4 mt-6">
                {transactions.filter(t => t.type === 'credit').map(txn => (
                  <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(txn.type)}
                      <div>
                        <p className="font-medium text-gray-900">{txn.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(txn.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-green-600">+₹{txn.amount}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="debit" className="space-y-4 mt-6">
                {transactions.filter(t => t.type === 'debit').map(txn => (
                  <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(txn.type)}
                      <div>
                        <p className="font-medium text-gray-900">{txn.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(txn.date).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-red-600">-₹{txn.amount}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
