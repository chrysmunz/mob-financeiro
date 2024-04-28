import React, { useCallback, useState } from 'react';
import { IconElement } from '@ui-kitten/components';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Payment } from '@types';
import { theme } from '../../theme';
import EmptyList from '../../assets/images/empy-list.svg';
import usePaymentsStore from '../../store/usePaymentsStore';

import { Header } from '../../components';
import {
    StyledButton,
    StyledContainer,
    StyledIcon,
    StyledEmptyList,
    StyledList,
    StyledListItem,
    StyledText,
    StyledRightItem,
    StyledInput
} from './styles';

type NavigationProps = StackNavigationProp<any>;

function Home(): React.JSX.Element {
    const navigation = useNavigation<NavigationProps>();
    const { payments, setPayments } = usePaymentsStore();

    const [search, setSearch] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selected, setSelected] = useState<Payment | null>(null);

    const filter = payments.filter(payment =>
        payment.name.toUpperCase().includes(search.toUpperCase())
    );

    const handleAlert = (item: Payment) => {
        setSelected(item);
        setShowAlert(true);
    };

    const handleRemove = () => {
        const newArray = payments.filter(payment => payment.id !== selected?.id);
        setPayments(newArray);
        setShowAlert(false);
        setSelected(null);
    };

    const handleNavigation = useCallback(() => {
        navigation.navigate('Register');
    }, [navigation]);

    const renderItemIcon = (name: string): IconElement => (
        <StyledIcon name={name} fill={theme.color.gray} size={14} />
    );

    const renderRightItem = (item: Payment) => (
        <StyledRightItem>
            <StyledText size={theme.typography.size.regular} weight={theme.typography.weight.bold}>
                R$ {item.price.toFixed(2)}
            </StyledText>
        </StyledRightItem>
    );

    const renderItem = ({ item }: { item: any | Payment }): React.ReactElement => (
        <StyledListItem
            title={item.name}
            description={item.category}
            accessoryRight={renderRightItem(item)}
            onLongPress={() => handleAlert(item)}
            accessoryLeft={renderItemIcon('pricetags-outline')}
        />
    );

    return (
        <>
            <Header disableBack title='Pagamentos' />
            <AwesomeAlert
                show={showAlert}
                showCancelButton
                showConfirmButton
                cancelText='NÃO'
                confirmText='SIM'
                confirmButtonStyle={{
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                cancelButtonStyle={{
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                confirmButtonColor='blue'
                title='Remover pagamento'
                message='Deseja remover esse pagamento?'
                onCancelPressed={() => setShowAlert(false)}
                onConfirmPressed={handleRemove}
            />
            <StyledContainer>
                {payments.length > 0 ? (
                    <>
                        <StyledInput
                            value={search}
                            placeholder='Buscar pelo estabelecimento'
                            accessoryRight={renderItemIcon('search-outline')}
                            onChangeText={value => setSearch(value)}
                        />
                        <StyledList data={filter} renderItem={renderItem} />
                    </>
                ) : (
                    <StyledEmptyList>
                        <EmptyList />
                        <StyledText
                            size={theme.typography.size.medium}
                            weight={theme.typography.weight.bold}
                        >
                            Nenhum pagamento cadastrado. Clique no + para cadastrar um novo
                            pagamento.
                        </StyledText>
                    </StyledEmptyList>
                )}
            </StyledContainer>
            <StyledButton onPress={handleNavigation}>
                <StyledIcon name='plus-outline' fill={theme.color.white} size={28} />
            </StyledButton>
        </>
    );
}

export default Home;
