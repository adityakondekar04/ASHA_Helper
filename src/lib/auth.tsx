import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserRole = "asha" | "facilitator" | "anm" | "medical_officer";

export interface AshaUser {
  id: string;
  fullName: string;
  phone: string;
  role: UserRole;
  district: string;
  taluka: string;
  phc: string; // Primary Health Centre
  subCenter: string; // उपकेंद्र
  village: string; // गाव
  ashaId?: string;
  createdAt: string;
}

const STORAGE_KEY = "asha.auth.user.v1";

export const DEMO_USERS: Record<string, AshaUser> = {
  asha: {
    id: "demo-asha-1",
    fullName: "श्रीमती सुनिता रामचंद्र पाटील",
    phone: "9876543210",
    role: "asha",
    district: "सातारा",
    taluka: "कराड",
    phc: "मसूर प्राथमिक आरोग्य केंद्र",
    subCenter: "शिरोली उपकेंद्र",
    village: "शिरोली",
    ashaId: "ASHA-MH-STR-0421",
    createdAt: new Date().toISOString(),
  },
  facilitator: {
    id: "demo-fac-1",
    fullName: "श्रीमती रेखा आनंद कांबळे",
    phone: "9822012345",
    role: "facilitator",
    district: "पुणे",
    taluka: "हवेली",
    phc: "वाघोली प्राथमिक आरोग्य केंद्र",
    subCenter: "लोणीकंद उपकेंद्र",
    village: "लोणीकंद",
    ashaId: "AF-MH-PUN-0118",
    createdAt: new Date().toISOString(),
  },
};

interface AuthContextType {
  user: AshaUser | null;
  login: (user: AshaUser) => void;
  logout: () => void;
  loginAsDemo: (role?: "asha" | "facilitator") => AshaUser;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loginAsDemo: () => DEMO_USERS.asha,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AshaUser | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        // Pre-seed with default ASHA worker for instant smooth UX
        setUser(DEMO_USERS.asha);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USERS.asha));
      }
    } catch (e) {
      console.warn("Failed to load auth user from localStorage", e);
    }
  }, []);

  const login = (newUser: AshaUser) => {
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.warn("Failed to save auth user", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear auth user", e);
    }
  };

  const loginAsDemo = (role: "asha" | "facilitator" = "asha") => {
    const demo = DEMO_USERS[role];
    login(demo);
    return demo;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
