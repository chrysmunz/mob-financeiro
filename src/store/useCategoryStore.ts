import { create } from 'zustand';
import AsyncStorage from '@react-native-community/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { Category } from '../@types';

interface State {
    categories: Array<Category>;
}

interface Actions {
    setCategories: (categories: Array<Category>) => void;
}

const initialState: State = {
    categories: []
};

const useCategoryStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                ...initialState,
                setCategories: categories => set({ categories })
            }),
            {
                name: 'financeiro:categoryStore',
                storage: createJSONStorage(() => AsyncStorage)
            }
        )
    )
);

export default useCategoryStore;
