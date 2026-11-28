"use client";
import { createContext, useContext } from "react";

// Signed-in user, their permissions and the image library, shared across the admin.
const AdminContext = createContext({ user: null, perms: {}, library: [] });

export const AdminProvider = ({ value, children }) => <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
export const useAdmin = () => useContext(AdminContext);
