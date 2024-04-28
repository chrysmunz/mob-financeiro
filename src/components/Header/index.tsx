import React, { memo, useCallback } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StyledContainer, StyledIcon, StyledLeftButton, StyledText } from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    disableBack?: boolean;
}

const Header: React.FC<Props> = ({ title, disableBack }: Props) => {
    const navigation = useNavigation();

    const handleNavigation = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <StyledContainer>
            {!disableBack && (
                <StyledLeftButton onPress={handleNavigation}>
                    <StyledIcon name='arrow-ios-back-outline' />
                </StyledLeftButton>
            )}
            <StyledText>{title}</StyledText>
        </StyledContainer>
    );
};

export default memo(Header);

Header.defaultProps = {
    disableBack: false
};
