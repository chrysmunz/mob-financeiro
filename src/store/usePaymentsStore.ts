import { create } from 'zustand';
import AsyncStorage from '@react-native-community/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import { Payment } from '../@types';

interface State {
    payments: Array<Payment>;
}

interface Actions {
    setPayments: (payments: Array<Payment>) => void;
}

const initialState: State = {
    payments: []
};

const usePaymentsStore = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                ...initialState,
                setPayments: payments => set({ payments })
            }),
            {
                name: 'financeiro:paymentsStore',
                storage: createJSONStorage(() => AsyncStorage)
            }
        )
    )
);

export default usePaymentsStore;
