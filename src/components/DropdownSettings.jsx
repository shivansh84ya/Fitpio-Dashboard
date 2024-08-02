import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

function DropdownSettings() {

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full bg-slate-200'}`}
        aria-haspopup="true"
      >
        <span className="sr-only">Settings</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-current text-slate-500 dark:text-slate-400" d="M12 2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm10-8a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-18 0a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm13.66 5.66a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 1 1-1.41-1.41l1.42-1.42a1 1 0 0 1 1.41 0zM7.75 7.75a1 1 0 0 1 0 1.41L6.34 10.58a1 1 0 1 1-1.41-1.41l1.42-1.42a1 1 0 0 1 1.41 0zM17.66 6.34a1 1 0 0 1 0 1.41L16.24 9.17a1 1 0 0 1-1.41-1.41l1.42-1.42a1 1 0 0 1 1.41 0zM8.83 17.66a1 1 0 0 1 0 1.41L7.41 20.49a1 1 0 1 1-1.41-1.41l1.42-1.42a1 1 0 0 1 1.41 0zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
        </svg>
      </button>
    </div>
  );
}

export default DropdownSettings;
