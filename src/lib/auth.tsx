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
    id: "usr_asha_sunita",
    fullName: "श्रीमती सुनिता रामचंद्र पाटील (Sunita Patil)",
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
    id: "usr_fac_rekha",
    fullName: "श्रीमती रेखा आनंद कांबळे (Rekha Kamble)",
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
  asha2: {
    id: "usr_asha_priya",
    fullName: "श्रीमती प्रिया विलास जाधव (Priya Jadhav)",
    phone: "9890123456",
    role: "asha",
    district: "कोल्हापूर",
    taluka: "हातकणंगले",
    phc: "हुपरी प्राथमिक आरोग्य केंद्र",
    subCenter: "रेंदाळ उपकेंद्र",
    village: "रेंदाळ",
    ashaId: "ASHA-MH-KLP-0892",
    createdAt: new Date().toISOString(),
  },
  anm: {
    id: "usr_anm_anita",
    fullName: "श्रीमती अनिता दीपक देशमुख (Anita Deshmukh)",
    phone: "9850987654",
    role: "anm",
    district: "नाशिक",
    taluka: "निफाड",
    phc: "लासलगाव प्राथमिक आरोग्य केंद्र",
    subCenter: "लासलगाव उपकेंद्र",
    village: "लासलगाव",
    ashaId: "ANM-MH-NSK-0314",
    createdAt: new Date().toISOString(),
  },
};

interface AuthContextType {
  user: AshaUser | null;
  isLoading: boolean;
  login: (user: AshaUser) => void;
  logout: () => void;
  loginAsDemo: (role?: "asha" | "facilitator" | "asha2" | "anm") => AshaUser;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  loginAsDemo: () => DEMO_USERS.asha,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AshaUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.warn("Failed to load auth user from localStorage", e);
      setUser(null);
    } finally {
      setIsLoading(false);
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

  const loginAsDemo = (role: "asha" | "facilitator" | "asha2" | "anm" = "asha") => {
    const demo = DEMO_USERS[role] || DEMO_USERS.asha;
    login(demo);
    return demo;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
