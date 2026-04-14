import React from 'react';

export default function PageLayout({ children }) {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background relative">
      {children}
    </main>
  );
}
