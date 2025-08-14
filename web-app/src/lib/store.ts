import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

interface UIState {
  language: 'en' | 'ar';
  direction: 'ltr' | 'rtl';
  searchOpen: boolean;
  searchQuery: string;
  searchResults: {
    team: any[];
    services: any[];
  };
  // ✅ ADD the missing formStates property
  formStates: {
    subscriptionStatus: 'idle' | 'loading' | 'success' | 'error' | null;
    subscriptionMessage: string;
  };
}

const initialState: UIState = {
  language: 'en',
  direction: 'ltr',
  searchOpen: false,
  searchQuery: '',
  searchResults: { team: [], services: [] },
  // ✅ INITIALIZE formStates with default values
  formStates: {
    subscriptionStatus: null,
    subscriptionMessage: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === 'en' ? 'ar' : 'en';
      state.direction = state.language === 'ar' ? 'rtl' : 'ltr';
    },
    setLanguage: (state, action: PayloadAction<'en' | 'ar'>) => {
      state.language = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<{ team: any[]; services: any[] }>) => {
      state.searchResults = action.payload;
    },
    // ✅ ADD actions for form states
    setSubscriptionStatus: (state, action: PayloadAction<'idle' | 'loading' | 'success' | 'error' | null>) => {
      state.formStates.subscriptionStatus = action.payload;
    },
    setSubscriptionMessage: (state, action: PayloadAction<string>) => {
      state.formStates.subscriptionMessage = action.payload;
    },
  },
});

export const { 
  toggleLanguage, 
  setLanguage, 
  setSearchOpen, 
  setSearchQuery, 
  setSearchResults,
  setSubscriptionStatus,
  setSubscriptionMessage
} = uiSlice.actions;

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) =>
  useSelector<RootState, TSelected>(selector);
