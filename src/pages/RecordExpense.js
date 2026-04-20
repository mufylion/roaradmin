import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PageLayout from '../components/PageLayout';
import { FormSection, InputField, SelectField, TextAreaField } from '../components/ListingForm';
import { useAppConfig } from '../config/useAppConfig';

export default function RecordExpense() {
  const { config } = useAppConfig();
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [category, setCategory] = useState('');
  const [vendor, setVendor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [description, setDescription] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [taxDeductible, setTaxDeductible] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState('approved');
  const [linkedEntity, setLinkedEntity] = useState('');
  
  const isEditMode = id && id !== 'undefined';
  const pageTitle = isEditMode ? 'Edit Expense' : 'Record New Expense';

  // Load expense data for edit mode
  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch expense data here
      // For demo purposes, we'll use mock data
      const mockExpenseData = {
        'EXP-1034': {
          amount: '850.00',
          expenseDate: '2024-10-23',
          category: 'maintenance',
          vendor: 'Plumbing Services Co.',
          paymentMethod: 'business-cc',
          referenceNumber: 'INV-2024-034',
          description: 'Emergency plumbing repair for Malibu Villa - bathroom leak fixed',
          taxRate: 10,
          taxDeductible: true,
          approvalStatus: 'approved',
          linkedEntity: 'Malibu Beachfront Villa'
        }
      };
      
      const expenseData = mockExpenseData[id];
      if (expenseData) {
        setAmount(expenseData.amount);
        setExpenseDate(expenseData.expenseDate);
        setCategory(expenseData.category);
        setVendor(expenseData.vendor);
        setPaymentMethod(expenseData.paymentMethod);
        setReferenceNumber(expenseData.referenceNumber);
        setDescription(expenseData.description);
        setTaxRate(expenseData.taxRate);
        setTaxDeductible(expenseData.taxDeductible);
        setApprovalStatus(expenseData.approvalStatus);
        setLinkedEntity(expenseData.linkedEntity);
      }
    }
  }, [id]);

  const calculateTotal = () => {
    const base = parseFloat(amount) || 0;
    return (base + base * (taxRate / 100)).toFixed(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG, JPG, or PDF files are allowed');
      return;
    }

    // Store file info (in a real app, this would upload to server)
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString()
    };

    console.log('Receipt uploaded:', fileInfo);
    alert(`Receipt "${file.name}" uploaded successfully! (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    
    // Update UI to show file is uploaded
    const uploadArea = document.querySelector('[for="receipt-upload"]');
    if (uploadArea) {
      uploadArea.classList.add('border-primary', 'bg-primary/5');
      uploadArea.classList.remove('border-input', 'bg-muted/10');
      uploadArea.innerHTML = `
        <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Icon icon="lucide:check" className="text-2xl" />
        </div>
        <div>
          <p class="font-bold">File uploaded: ${file.name}</p>
          <p class="text-xs text-muted-foreground mt-1">${(file.size / 1024 / 1024).toFixed(2)}MB</p>
        </div>
      `;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new expense object
    const newExpense = {
      id: `#EXP-${Date.now()}`,
      date: expenseDate || new Date().toISOString().split('T')[0],
      category: 'Expenses',
      description: `${category}: ${vendor} - ${description}`,
      amount: `-${parseFloat(amount).toFixed(2)}`,
      status: approvalStatus.charAt(0).toUpperCase() + approvalStatus.slice(1)
    };
    
    // Add to mockFinancials transactions (in a real app, this would be an API call)
    if (typeof window !== 'undefined' && window.mockFinancials) {
      window.mockFinancials.transactions.unshift(newExpense);
      
      // Update expense categories if needed
      const currentCategories = window.mockFinancials.expenses.categories || [];
      const categoryExists = currentCategories.some(cat => cat.category.toLowerCase() === category.toLowerCase());
      
      if (!categoryExists) {
        window.mockFinancials.expenses.categories.push({
          category: category.charAt(0).toUpperCase() + category.slice(1),
          percentage: Math.round(((parseFloat(amount) / window.mockFinancials.transactions
            .filter(t => t.category === 'Expenses')
            .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount.replace(/[^0-9.-]/g, ''))), 0)) * 100))
        });
      }
      
      // Update total expenses
      const totalExpenses = window.mockFinancials.transactions
        .filter(t => t.category === 'Expenses')
        .reduce((sum, t) => sum + Math.abs(parseFloat(t.amount.replace(/[^0-9.-]/g, ''))), 0);
      
      window.mockFinancials.expenses.total = totalExpenses;
      
      // Show success message
      alert(`Expense of ${window.useAppConfig ? window.useAppConfig().currency.symbol : '₦'}${parseFloat(amount).toFixed(2)} has been recorded successfully!`);
      
      // Reset form
      setAmount('');
      setExpenseDate('');
      setCategory('');
      setVendor('');
      setPaymentMethod('');
      setReferenceNumber('');
      setDescription('');
      setTaxRate(0);
      setTaxDeductible(true);
      setApprovalStatus('approved');
      setLinkedEntity('');
      
      // Redirect to financials page
      window.location.href = '/financials';
    } else {
      console.error('mockFinancials not available');
      alert('Error: Unable to save expense. Please try again.');
    }
  };

  return (
    <PageLayout>
      {/* Header */}
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
          <button className="hidden md:flex bg-muted text-foreground px-6 py-2.5 rounded-xl font-black items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[10px] uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Discard
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 text-[10px] uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Icon icon="lucide:check" className="text-lg" />
            <span>{isEditMode ? 'Update Expense' : 'Save Expense'}</span>
          </button>
        </div>
      </header>

      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Primary Form Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Expense Details */}
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
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none font-bold text-lg text-destructive" 
                    />
                  </div>
                </div>
                <InputField 
                  label="Expense Date"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  icon="lucide:calendar"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField 
                  label="Expense Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category...</option>
                  <option value="maintenance">Maintenance & Repairs</option>
                  <option value="utilities">Utilities (Water, Electricity, Internet)</option>
                  <option value="cleaning">Cleaning Services</option>
                  <option value="marketing">Marketing & Social Ads</option>
                  <option value="platform">Platform Fees & Commissions</option>
                  <option value="payroll">Staff Payroll / Contractor Fees</option>
                  <option value="insurance">Insurance Premiums</option>
                  <option value="supplies">Office Supplies</option>
                  <option value="taxes">Taxes & Regulatory Fees</option>
                  <option value="other">Other Expense</option>
                </SelectField>
                <InputField 
                  label="Vendor / Payee"
                  placeholder="e.g. HomeDepot, CleanCo"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  icon="lucide:user"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectField 
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Select method...</option>
                  <option value="business-cc">Business Credit Card (Visa *4242)</option>
                  <option value="bank-transfer">Bank Transfer (Wire)</option>
                  <option value="paypal">PayPal Business</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="petty-cash">Petty Cash</option>
                </SelectField>
                <InputField 
                  label="Reference / Invoice #"
                  placeholder="e.g. INV-2024-001"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                />
              </div>

              <TextAreaField 
                label="Expense Description"
                placeholder="Detail the reason for this expense..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              />
            </FormSection>

            {/* Receipt Upload */}
            <FormSection title="Receipt & Proof of Purchase" icon="lucide:upload">
              <div className="text-xs text-muted-foreground italic mb-4">Required for tax compliance</div>
              <div className="border-2 border-dashed border-input rounded-2xl p-8">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="receipt-upload"
                />
                <label 
                  htmlFor="receipt-upload"
                  className="border-2 border-dashed border-input rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary transition-colors cursor-pointer bg-muted/10"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Icon icon="lucide:upload" className="text-2xl" />
                  </div>
                  <div>
                    <p className="font-bold">Click to upload receipt</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (Max. 5MB)</p>
                  </div>
                </label>
              </div>
            </FormSection>
          </div>

          {/* Right Column: Contextual Info & Summary */}
          <div className="space-y-6">
            
            {/* Related Entity */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-heading font-bold">Link to Property / Booking</h3>
              <p className="text-xs text-muted-foreground">Allocate this cost to a specific listing or booking ID.</p>
              <div className="space-y-3">
                <div className="relative">
                  <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search listing or booking ID..."
                    value={linkedEntity}
                    onChange={(e) => setLinkedEntity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-muted/30 border border-input rounded-xl focus:ring-2 focus:ring-primary outline-none" 
                  />
                </div>
                {linkedEntity && (
                  <div className="p-3 border border-border rounded-xl bg-muted/20 flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon icon="lucide:image" className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">Malibu Beachfront Villa</p>
                      <p className="text-[10px] text-muted-foreground">ID: #LST-9902</p>
                    </div>
                    <button 
                      onClick={() => setLinkedEntity('')}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Icon icon="lucide:x" className="text-lg" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-heading font-bold">Tax & Deductions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pre-tax Amount</span>
                  <span className="text-sm font-bold">{config.currency.symbol}{parseFloat(amount || '0').toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tax Rate</span>
                  <select 
                    className="text-sm font-bold bg-transparent outline-none text-right"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseInt(e.target.value))}
                  >
                    <option value="0">0% (Exempt)</option>
                    <option value="5">5% (VAT)</option>
                    <option value="10">10% (GST)</option>
                    <option value="15">15% (Custom)</option>
                  </select>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-bold">Total Expense</span>
                  <span className="text-sm font-extrabold text-destructive">{config.currency.symbol}{calculateTotal()}</span>
                </div>
              </div>
              <div className="p-3 bg-muted/20 rounded-xl border border-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={taxDeductible}
                    onChange={(e) => setTaxDeductible(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-input" 
                  />
                  <span className="text-xs font-medium">Mark as tax deductible</span>
                </label>
              </div>
            </div>

            {/* Approval Status */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-heading font-bold">Approval Status</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={approvalStatus === 'approved'}
                    onChange={() => setApprovalStatus('approved')}
                    className="w-4 h-4 text-primary" 
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold">Approved</p>
                    <p className="text-[10px] text-muted-foreground">Payment has been authorized.</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={approvalStatus === 'pending'}
                    onChange={() => setApprovalStatus('pending')}
                    className="w-4 h-4 text-primary" 
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold">Pending Review</p>
                    <p className="text-[10px] text-muted-foreground">Awaiting manager approval.</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-muted/30 transition-colors">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={approvalStatus === 'reimbursable'}
                    onChange={() => setApprovalStatus('reimbursable')}
                    className="w-4 h-4 text-primary" 
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold">Reimbursable</p>
                    <p className="text-[10px] text-muted-foreground">Paid by staff; needs refund.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
