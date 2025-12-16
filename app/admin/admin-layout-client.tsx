"use client";

import React from 'react';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 lg:p-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}