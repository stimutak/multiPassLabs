import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  activeModal: string | null;
}

const initialState: UIState = {
  theme: 'light',
  isMobileMenuOpen: false,
  isSearchOpen: false,
  activeModal: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    }
  }
});

export const {
  setTheme,
  toggleTheme,
  setMobileMenuOpen,
  toggleMobileMenu,
  setSearchOpen,
  toggleSearch,
  setActiveModal,
  closeModal
} = uiSlice.actions;
export default uiSlice.reducer;