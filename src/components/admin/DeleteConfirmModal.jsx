import React from "react";
import { createPortal } from "react-dom";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header/Close Buttonag */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex gap-4 items-start">
            {/* Warning Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            {/* Content */}
            <div className="pt-1 w-full">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Deletion</h3>
              <p className="text-sm text-slate-600 mb-4">
                Are you sure you want to delete <span className="font-bold text-slate-800">"{itemName}"</span>?
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
