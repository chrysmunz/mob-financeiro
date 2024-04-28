import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    Button,
    ButtonProps,
    Input,
    InputProps,
    Layout,
    Select,
    SelectProps
} from '@ui-kitten/components';

export const StyledButton = styled(Button)<ButtonProps>`
    width: 100%;
`;

export const StyledContainer = styled(Layout)`
    flex: 1;
    width: 100%;
    align-items: center;
    padding: ${RFValue(12)}px;
    justify-content: space-between;
`;

export const StyledContent = styled(Layout)`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const StyledInput = styled(Input)<InputProps>`
    width: 100%;
    margin-top: ${RFValue(12)}px;
`;

export const StyledSelect = styled(Select)<SelectProps>`
    width: 100%;
`;
