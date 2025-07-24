'use client';
import React from 'react';

export default function Switcher() {
  React.useEffect(() => {
    const htmlTag = document.getElementsByTagName('html')[0];
    htmlTag.className = 'dark';
  }, []);
  return null;
}
