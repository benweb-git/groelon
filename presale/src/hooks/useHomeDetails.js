import { useContext } from 'react';
import { HomeDetailsContext } from '../context/HomeContext';

export const useHomeDetails = () => {
  const context = useContext(HomeDetailsContext);
  if (context === undefined) {
    throw new Error('useHomeDetails must be used within a HomeDetailsContext.Provider');
  }
  return context;
};