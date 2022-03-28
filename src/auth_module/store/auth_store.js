import create from "zustand";
import jwtService from "../jwt_service";

// note the "<MyStore>" next to create
export const useAuthStore = create((set, get) => ({
  success: false,
  loading: false,
  error: null,
  user: null,
  setUserData: (args) => set({ user: args }),
  setLoading: (args) => set({ loading: args }),
  setLogin: () => set({ success: true }),
  loginAdmin: async (username, password) => {
    await jwtService.signInAdmin(username, password).then((user) => {
      set({ success: true });
      set({ user: user });
    });
  },
  logoutUser: () => {
    jwtService.logout();
    set({ user: null, success: false, error: null, loading: false });
  },
  isSidebarOpen: false,
  onSidebarOpen: () => set((state) => ({ isSidebarOpen: true })),
  onSidebarClose: () => {
    let list = get().sidebarLinks;
    list.map((x) => {
      if (x.open) {
        x.open = false;
      }
      return x;
    });
    set({ isSidebarOpen: false, sidebarLinks: [...list] });
  },
  onOpenSubMenu: (props) => {
    let list = get().sidebarLinks;
    let l = list.find((x) => x.id === props);
    if (l.open) {
      l.open = false;
    } else {
      l.open = true;
    }
    set({ sidebarLinks: [...list] });
  },
}));
