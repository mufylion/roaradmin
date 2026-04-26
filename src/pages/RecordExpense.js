import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField } from '../components/ListingForm';
import { useAppConfig } from '../config/useAppConfig';
import expensesService from '../services/expensesService';

export default function RecordExpense() {
  const navigate = useNavigate();
  const { config } = useAppConfig();
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [description, setDescription] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('approved');
  const [linkedEntity, setLinkedEntity] = useState('');
  const [loading, setLoading] = useState(false);
  
  const isEditMode = id && id !== 'undefined' && id !== ':id';
  const pageTitle = isEditMode ? 'Edit Expense' : 'Record New Expense';

  useEffect(() => {
    if (isEditMode) {
      const fetchExpense = async () => {
        try {
          const data = await expensesService.fetchExpenses({ id });
          const expense = Array.isArray(data) ? data[0] : data;
          if (expense) {
            setAmount(expense.amount);
            setExpenseDate(expense.date?.split('T')[0] || '');
            setCategory(expense.category);
            setVendor(expense.vendor || '');
            setDescription(expense.description || '');
            setApprovalStatus(expense.status?.toLowerCase() || 'approved');
          }
        } catch (err) {
          console.error('Failed to fetch expense');
        }
      };
      fetchExpense();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category || !description) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: parseFloat(amount),
        date: expenseDate,
        category,
        vendor,
        paymentMethod,
        referenceNumber,
        description,
        status: approvalStatus,
        linkedEntity
      };

      if (isEditMode) {
        await expensesService.updateExpense(id, payload);
      } else {
        await expensesService.createExpense(payload);
      }
      
      alert(`Expense ${isEditMode ? 'updated' : 'recorded'} successfully!`);
      navigate('/financials');
    } catch (err) {
      console.error('Failed to save expense:', err);
      alert('Failed to save expense to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <header className="h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex items-center justify-between shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <Link to="/financials" className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:arrow-left" className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-heading font-bold">{pageTitle}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {isEditMode ? 'Modify expense details and update financial records.' : 'Log a business expense, maintenance cost, or platform fee.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => navigate('/financials')}
            className="hidden md:flex bg-muted text-foreground px-6 py-2.5 rounded-xl font-black items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 text-[10px] uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
          >
            {loading ? <Icon icon="lucide:loader-2" className="animate-spin text-lg" /> : <Icon icon="lucide:check" className="text-lg" />}
            <span>{loading ? 'Processing...' : (isEditMode ? 'Update Expense' : 'Save Expense')}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <FormSection title="Expense Details" icon="lucide:arrow-down-right">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{config.currency.symbol}</span>
                    <input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-lg" 
                    />
                  </div>
                </div>
                <InputField 
                  label="Expense Date"
                  type="date"
                  required
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  icon="lucide:calendar"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField 
                  label="Expense Category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category...</option>
                  <option value="maintenance">Maintenance & Repairs</option>
                  <option value="utilities">Utilities</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="marketing">Marketing</option>
                  <option value="platform">Platform Fees</option>
                  <option value="other">Other</option>
                </SelectField>
                <InputField 
                  label="Vendor / Payee"
                  placeholder="e.g. HomeDepot"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
              </div>

              <TextAreaField 
                label="Expense Description"
                required
                placeholder="Detail the reason for this expense..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </FormSection>

            <FormSection title="Payment Details" icon="lucide:credit-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField 
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Select method...</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </SelectField>
                <InputField 
                  label="Reference / Invoice #"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
              </div>
            </FormSection>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-heading font-bold">Approval Status</h3>
              <div className="space-y-3">
                {['approved', 'pending', 'rejected'].map(status => (
                  <label key={status} className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors capitalize">
                    <input 
                      type="radio" 
                      checked={approvalStatus === status}
                      onChange={() => setApprovalStatus(status)}
                      className="w-4 h-4 text-primary" 
                    />
                    <span className="text-xs font-bold">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
