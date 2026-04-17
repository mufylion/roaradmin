import React from 'react';
import { Icon } from '@iconify/react';

const TimePeriodFilter = ({ value, onChange, className = "" }) => {
  return (
    <div className="flex items-center gap-2">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-muted border-none rounded-lg text-xs px-3 py-1.5 font-bold outline-none focus:ring-2 focus:ring-primary cursor-pointer ${className}`}
      >
        <option value="This Week">This Week</option>
        <option value="This Month">This Month</option>
        <option value="This Year">This Year</option>
      </select>
    </div>
  );
};

export default TimePeriodFilter;
