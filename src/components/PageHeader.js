import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const PageHeader = ({ 
  title, 
  description, 
  actions = [], 
  backButton = null,
  customContent = null,
  className = "" 
}) => {
  return (
    <header className={`h-auto md:h-20 bg-card border-b border-border px-4 md:px-8 py-4 md:py-0 flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}>
      {/* Left Section: Title + Optional Back Button */}
      <div className="flex items-center gap-4 flex-1">
        {backButton && (
          <Link 
            to={backButton.to} 
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label={backButton.ariaLabel || "Go back"}
          >
            <Icon icon={backButton.icon || "lucide:arrow-left"} className="text-lg sm:text-xl" />
          </Link>
        )}
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-heading font-bold">{title}</h1>
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      {/* Right Section: Custom Content + Actions */}
      {(customContent || actions.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {customContent && (
            <div className="flex items-center gap-2">
              {customContent}
            </div>
          )}
          {actions.map((action, index) => {
            // Handle different action types
            if (action.type === 'button') {
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`${action.variant === 'primary' 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90' 
                    : 'bg-muted text-foreground hover:bg-muted/80'} 
                    px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 text-[8px] sm:text-xs uppercase tracking-widest ${action.variant === 'primary' ? '' : 'border border-border'} outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  disabled={action.disabled}
                >
                  {action.icon && <Icon icon={action.icon} className="text-sm sm:text-lg" />}
                  <span className="hidden xs:inline">{action.label}</span>
                  <span className="xs:hidden">{action.shortLabel || action.label}</span>
                </button>
              );
            }
            
            if (action.type === 'link') {
              return (
                <Link
                  key={index}
                  to={action.to}
                  className={`${action.variant === 'primary' 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90' 
                    : 'bg-muted text-foreground hover:bg-muted/80'} 
                    px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all active:scale-95 text-[8px] sm:text-xs uppercase tracking-widest ${action.variant === 'primary' ? '' : 'border border-border'} outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                >
                  {action.icon && <Icon icon={action.icon} className="text-sm sm:text-lg" />}
                  <span className="hidden xs:inline">{action.label}</span>
                  <span className="xs:hidden">{action.shortLabel || action.label}</span>
                </Link>
              );
            }
            
            return null;
          })}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
