import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { IndexPath, SelectItem } from '@ui-kitten/components';
import * as yup from 'yup';

import { Category } from '../../@types';
import { fetchCategories } from '../../services/category';
import useCategoryStore from '../../store/useCategoryStore';
import usePaymentsStore from '../../store/usePaymentsStore';

import { Header } from '../../components';
import { StyledButton, StyledContainer, StyledContent, StyledInput, StyledSelect } from './styles';
import AwesomeAlert from 'react-native-awesome-alerts';

function Register(): React.JSX.Element {
    const navigation = useNavigation();
    const { categories } = useCategoryStore();
    const { payments, setPayments } = usePaymentsStore();

    const [showAlert, setShowAlert] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(new IndexPath(-1));

    const displayValue = categories[selectedIndex.row]?.label;

    const schema = yup.object().shape({
        name: yup.string().required(),
        price: yup.string().required(),
        category: yup
            .object({
                id: yup.string().required(),
                value: yup.number().required(),
                label: yup.string().required()
            })
            .required()
    });

    const {
        control,
        handleSubmit,
        formState: { isValid }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const formatterPrice = (price: string) => {
        const firstDotIndex = price.indexOf('.');

        if (firstDotIndex === -1 || firstDotIndex === price.length - 1) {
            return price;
        }

        return price
            .replace(/\./g, (match, index) => (index > firstDotIndex ? '' : match))
            .replaceAll(',', '');
    };

    const handleNavigation = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onSubmit = (data: { name: string; price: string; category: Category }) => {
        const payload = {
            name: data.name,
            date: new Date(),
            price: Number(data.price),
            category: data.category.label,
            id: new Date().getTime().toString()
        };

        setPayments([payload, ...payments]);
        setShowAlert(true);
    };

    return (
        <>
            <Header title='Novo pagamento' />
            <AwesomeAlert
                show={showAlert}
                showConfirmButton
                confirmText='OK'
                confirmButtonStyle={{
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                confirmButtonColor='blue'
                title='Pagamento cadastrado'
                message='Seu pagamento foi cadastrado e está disponível para visualização na sua lista pagamentos.'
                onConfirmPressed={() => {
                    handleNavigation();
                    setShowAlert(false);
                }}
            />
            <StyledContainer>
                <StyledContent>
                    <Controller
                        name='category'
                        control={control}
                        render={({ field: { onChange } }) => (
                            <StyledSelect
                                value={displayValue}
                                label='Categoria de gasto'
                                placeholder='Selecione uma categoria'
                                onSelect={(index: any) => {
                                    setSelectedIndex(index);
                                    onChange(categories[index.row]);
                                }}
                            >
                                {categories.map(categorie => (
                                    <SelectItem key={categorie.value} title={categorie.label} />
                                ))}
                            </StyledSelect>
                        )}
                    />
                    <Controller
                        name='name'
                        control={control}
                        render={({ field: { onChange } }) => (
                            <StyledInput
                                label='Nome do estabelecimento'
                                onChangeText={value => onChange(value)}
                                placeholder='Digite o nome do estabelecimento'
                            />
                        )}
                    />
                    <Controller
                        name='price'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <StyledInput
                                value={value}
                                label='Valor'
                                keyboardType='number-pad'
                                placeholder='Digite o valor'
                                onChangeText={value => onChange(formatterPrice(value))}
                            />
                        )}
                    />
                </StyledContent>
                <StyledButton disabled={!isValid} onPress={handleSubmit(onSubmit)}>
                    Cadastrar
                </StyledButton>
            </StyledContainer>
        </>
    );
}

export default Register;
