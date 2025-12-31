import React, { useState, useEffect } from 'react';

interface MonthYearPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export function MonthYearPicker({ 
  value, 
  onChange, 
  placeholder = "Select date", 
  className = "" 
}: MonthYearPickerProps) {
  const currentYear = new Date().getFullYear();
  const YEARS = Array.from(
    { length: currentYear + 6 - 2000 },
    (_, i) => 2000 + i
  );
  
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  
  useEffect(() => {
    if (value) {
      const parts = value.split(' ');
      if (parts.length === 2) {
        setMonth(parts[0]);
        setYear(parts[1]);
      }
    } else {
      setMonth('');
      setYear('');
    }
  }, [value]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    
    if (year && newMonth) {
      onChange(`${newMonth} ${year}`);
    } else if (!newMonth && year) {
      onChange('');
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    
    if (month && newYear) {
      onChange(`${month} ${newYear}`);
    } else if (!newYear && month) {
      onChange('');
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Select month"
        >
          <option value="">Month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <select
          value={year}
          onChange={handleYearChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Select year"
        >
          <option value="">Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}