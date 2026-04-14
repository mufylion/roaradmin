import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const UniversalTable = ({ 
  headers = [], 
  data = [], 
  actions = [],
  loading = false,
  emptyMessage = "No data available",
  className = "",
  mobileColumns = [], // Which columns to show on mobile (indices)
  searchPlaceholder = "Search...",
  onSearch = null,
  filterButton = false,
  exportButton = false,
  onExport = null
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    
    return data.filter(row => {
      return Object.values(row).some(value => 
        value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [data, searchQuery]);

  // Handle search
  const handleSearch = (value) => {
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  // Determine which columns to show on mobile
  const getMobileColumnIndices = () => {
    if (mobileColumns.length > 0) return mobileColumns;
    // Default: show first column and last column (actions) on mobile
    return [0, headers.length - 1];
  };

  // Render table cell content
  const renderCellContent = (content, rowIndex, colIndex) => {
    if (typeof content === 'function') {
      return content({ rowIndex, colIndex });
    }
    return content;
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Table Header with Search and Actions */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Icon icon="lucide:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted border border-transparent rounded-xl text-sm focus:bg-card focus:border-primary focus:ring-4 focus:ring-primary/10 w-full transition-all outline-none" 
            />
          </div>
          <div className="flex items-center gap-2">
            {filterButton && (
              <button className="p-2.5 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                <Icon icon="lucide:funnel" className="text-lg text-muted-foreground" />
              </button>
            )}
            {exportButton && (
              <button 
                onClick={onExport}
                className="bg-muted text-foreground px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-muted/80 transition-all active:scale-95 text-[8px] sm:text-xs uppercase tracking-widest border border-border outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon icon="lucide:download" className="text-sm sm:text-lg" />
                <span className="hidden xs:inline">Export CSV</span>
                <span className="xs:hidden">Export</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
        <table className={`w-full text-left ${className}`}>
          {/* Desktop Table Header */}
          <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider font-black">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-border">
            {loading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {headers.map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className="h-4 bg-muted rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : filteredData.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={headers.length} className="px-6 py-8 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Icon icon="lucide:inbox" className="text-2xl" />
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data rows
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-muted/30 transition-colors group">
                  {headers.map((_, colIndex) => (
                    <td key={colIndex} className="px-3 py-3 sm:px-6 sm:py-4">
                      {renderCellContent(row[`col${colIndex}`] || row[Object.keys(row)[colIndex]], rowIndex, colIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {loading ? (
          // Loading cards
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-muted/20 rounded-xl border border-border p-4 animate-pulse">
              <div className="space-y-3">
                {headers.map((_, colIndex) => (
                  <div key={colIndex} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          ))
        ) : filteredData.length === 0 ? (
          // Empty state
          <div className="text-center text-muted-foreground py-8">
            <Icon icon="lucide:inbox" className="text-2xl mx-auto mb-2" />
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
          // Mobile cards
          filteredData.map((row, rowIndex) => (
            <div key={rowIndex} className="bg-card rounded-xl border border-border p-4">
              {headers.map((header, colIndex) => {
                const content = row[`col${colIndex}`] || row[Object.keys(row)[colIndex]];
                
                return (
                  <div key={colIndex} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider min-w-[80px] flex-shrink-0">
                      {header}
                    </span>
                    <div className="flex-1">
                      {renderCellContent(content, rowIndex, colIndex)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UniversalTable;
