import styled, { css } from 'styled-components/native';
import { Icon, Layout, Text } from '@ui-kitten/components';
import { RFValue } from 'react-native-responsive-fontsize';

export const StyledContainer = styled(Layout)`
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: ${RFValue(50)}px;
    padding-bottom: ${RFValue(10)}px;
`;

export const StyledIcon = styled(Icon)`
    width: ${RFValue(18)}px;
    height: ${RFValue(18)}px;
`;

export const StyledLeftButton = styled.TouchableOpacity`
    left: 0;
    position: absolute;
    padding: 0 ${RFValue(8)}px ${RFValue(10)}px ${RFValue(8)}px;
`;

export const StyledText = styled(Text)`
    ${({ theme }) => css`
        font-size: ${theme.typography.size.large}px;
        font-weight: ${theme.typography.weight.bold};
    `}
`;
