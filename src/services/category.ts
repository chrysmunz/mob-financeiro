import firestore from '@react-native-firebase/firestore';
import useCategoryStore from '../store/useCategoryStore';

// Initialize the Firebase database
export const DB = firestore();

export const fetchCategories = async () => {
    try {
        const { setCategories } = useCategoryStore.getState();

        const response = await DB.collection('Category').get();

        const categories = response.docs.map(doc => ({
            id: doc.id,
            value: doc.data()?.value,
            label: doc.data()?.label
        }));

        setCategories(categories);
    } catch (error) {
        console.log(error);
    }
};
