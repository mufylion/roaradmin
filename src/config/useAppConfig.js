import React, { createContext, useContext, useState, useEffect } from 'react';

// Default configuration (merged from appConfig.js)
export const DEFAULT_CONFIG = {
  // Currency Configuration
  currency: {
    code: 'NGN',
    symbol: '\u20A6',
    name: 'Nigerian Naira',
    decimalPlaces: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.'
  },

  // Timezone Configuration
  timezone: {
    name: 'WAT',
    displayName: 'West Africa Time',
    city: 'Lagos',
    offset: '+01:00',
    utcOffset: 60 // minutes
  },

  // Date/Time Formatting
  dateTime: {
    dateFormat: 'MMM dd, yyyy',
    timeFormat: 'h:mm a',
    dateTimeFormat: 'MMM dd, yyyy h:mm a',
    locale: 'en-NG'
  },

  // Tax Configuration
  tax: {
    vatRate: 7.5,
    vatDescription: 'Applied to nightly rate only'
  },

  // Booking Configuration
  booking: {
    cancellationPolicy: 'moderate',
    cancellationOptions: [
      { value: 'flexible', label: 'Flexible (24-hour notice)' },
      { value: 'moderate', label: 'Moderate (48-hour notice)' },
      { value: 'strict', label: 'Strict (7-day notice)' },
      { value: 'super-strict', label: 'Super Strict (30-day notice)' }
    ]
  }
};

// Create context for app configuration
const AppConfigContext = createContext();

// Custom hook to use app config
export function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }
  return context;
}

// Provider component
export function AppConfigProvider({ children }) {
  // Load settings from localStorage or use defaults
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('app_currency');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONFIG.currency;
      }
    }
    return DEFAULT_CONFIG.currency;
  });

  const [timezone, setTimezone] = useState(() => {
    const saved = localStorage.getItem('app_timezone');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONFIG.timezone;
      }
    }
    return DEFAULT_CONFIG.timezone;
  });

  const [tax, setTax] = useState(() => {
    const saved = localStorage.getItem('app_tax');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONFIG.tax;
      }
    }
    return DEFAULT_CONFIG.tax;
  });

  const [booking, setBooking] = useState(() => {
    const saved = localStorage.getItem('app_booking');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_CONFIG.booking;
      }
    }
    return DEFAULT_CONFIG.booking;
  });

  // Save to localStorage when settings change
  useEffect(() => {
    localStorage.setItem('app_currency', JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('app_timezone', JSON.stringify(timezone));
  }, [timezone]);

  useEffect(() => {
    localStorage.setItem('app_tax', JSON.stringify(tax));
  }, [tax]);

  useEffect(() => {
    localStorage.setItem('app_booking', JSON.stringify(booking));
  }, [booking]);

  
  // Dynamic config that updates based on settings
  const dynamicConfig = {
    ...DEFAULT_CONFIG,
    currency,
    timezone,
    tax,
    booking,
    dateTime: {
      ...DEFAULT_CONFIG.dateTime,
      timezone: timezone.name,
      offset: timezone.offset
    }
  };

  // Update currency function
  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  // Update timezone function
  const updateTimezone = (newTimezone) => {
    setTimezone(newTimezone);
  };

  // Update tax function
  const updateTax = (newTax) => {
    setTax(newTax);
  };

  // Update booking function
  const updateBooking = (newBooking) => {
    setBooking(newBooking);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setCurrency(DEFAULT_CONFIG.currency);
    setTimezone(DEFAULT_CONFIG.timezone);
    setTax(DEFAULT_CONFIG.tax);
    setBooking(DEFAULT_CONFIG.booking);
  };

  const value = {
    config: dynamicConfig,
    currency,
    timezone,
    tax,
    booking,
    updateCurrency,
    updateTimezone,
    updateTax,
    updateBooking,
    resetToDefaults
  };

  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

// Helper functions that use dynamic config
export function useFormatCurrency() {
  const { config } = useAppConfig();
  const callId = Math.random().toString(36).substr(2, 9);
  
  return (amount, currency = config.currency) => {
    const { symbol, decimalPlaces, thousandsSeparator, decimalSeparator } = currency;
    
    console.log(`formatCurrency [${callId}] - Input:`, {
      originalAmount: amount,
      type: typeof amount,
      numberAmount: Number(amount),
      symbol: symbol,
      stack: new Error().stack
    });
    
    const formattedAmount = Number(amount).toFixed(decimalPlaces);
    const parts = formattedAmount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    
    const result = `${symbol}${parts.join(decimalSeparator)}`;
    console.log(`formatCurrency [${callId}] - Output:`, result);
    
    return result;
  };
}

export function useFormatDateTime() {
  const { config } = useAppConfig();
  
  const getTimeZone = () => {
    // Map timezone name to IANA timezone
    const timezoneMap = {
      'WAT': 'Africa/Lagos',
      'EST': 'America/New_York',
      'PST': 'America/Los_Angeles',
      'GMT': 'Europe/London'
    };
    return timezoneMap[config.timezone.name] || 'Africa/Lagos';
  };
  
  return (date, format = config.dateTime.dateTimeFormat) => {
    const options = {
      timeZone: getTimeZone(),
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    return new Date(date).toLocaleString(config.dateTime.locale, options);
  };
}

export function useFormatDate() {
  const { config } = useAppConfig();
  
  const getTimeZone = () => {
    const timezoneMap = {
      'WAT': 'Africa/Lagos',
      'EST': 'America/New_York',
      'PST': 'America/Los_Angeles',
      'GMT': 'Europe/London'
    };
    return timezoneMap[config.timezone.name] || 'Africa/Lagos';
  };
  
  return (date, format = config.dateTime.dateFormat) => {
    const options = {
      timeZone: getTimeZone(),
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return new Date(date).toLocaleDateString(config.dateTime.locale, options);
  };
}

export function useFormatTime() {
  const { config } = useAppConfig();
  
  const getTimeZone = () => {
    const timezoneMap = {
      'WAT': 'Africa/Lagos',
      'EST': 'America/New_York',
      'PST': 'America/Los_Angeles',
      'GMT': 'Europe/London'
    };
    return timezoneMap[config.timezone.name] || 'Africa/Lagos';
  };
  
  return (date, format = config.dateTime.timeFormat) => {
    const options = {
      timeZone: getTimeZone(),
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    return new Date(date).toLocaleTimeString(config.dateTime.locale, options);
  };
}
