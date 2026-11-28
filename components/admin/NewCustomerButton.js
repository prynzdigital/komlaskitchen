"use client";
import { useState } from "react";
import CustomerForm from "@/components/admin/CustomerForm";

export default function NewCustomerButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setOpen(true)}>
        <i className="fas fa-user-plus" /> Add customer
      </button>
      {open && (
        <div className="adm-modal-back" onClick={() => setOpen(false)}>
          <div className="adm-modal adm-card" role="dialog" aria-modal="true" aria-label="Add customer" onClick={(e) => e.stopPropagation()}>
            <div className="adm-card-head">
              <div>
                <h2>Add a customer</h2>
                <p>For phone or walk-in orders. Website customers are added automatically.</p>
              </div>
              <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn" aria-label="Close" onClick={() => setOpen(false)}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="adm-card-pad">
              <CustomerForm onDone={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
