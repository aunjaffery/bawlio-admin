import create from "zustand";

// note the "<MyStore>" next to create
export const useAppStore = create((set, get) => ({
  isSidebarOpen: false,
  sidebarLinks: Navlinks,
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
