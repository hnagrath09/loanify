import { AppStateContext } from '../state';
import { useContext } from 'react';

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppProvider');
  }
  return context;
}
