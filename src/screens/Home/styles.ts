import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    Icon,
    IconProps,
    Input,
    InputProps,
    Layout,
    List,
    ListItem,
    ListItemProps,
    Text
} from '@ui-kitten/components';

type StyledIconProps = {
    size: number;
};

type StyledTextProps = {
    size: number;
    weight: string;
};

export const StyledButton = styled.TouchableOpacity`
    position: absolute;
    align-items: center;
    background-color: blue;
    justify-content: center;
    right: ${RFValue(10)}px;
    bottom: ${RFValue(10)}px;
    padding: ${RFValue(12)}px;
    border-radius: ${RFValue(100)}px;
`;

export const StyledContainer = styled(Layout)`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: ${RFValue(12)}px;
`;

export const StyledEmptyList = styled(Layout)`
    flex: 0.4;
    width: 80%;
    margin-bottom: 40%;
    align-items: center;
    justify-content: center;
`;

export const StyledIcon = styled(Icon)<IconProps & StyledIconProps>`
    ${({ size }) => css`
        width: ${RFValue(size)}px;
        height: ${RFValue(size)}px;
    `}
`;

export const StyledInput = styled(Input)<InputProps>`
    width: 100%;
    margin-bottom: ${RFValue(12)}px;
`;

export const StyledList = styled(List)`
    width: 100%;
`;

export const StyledListItem = styled(ListItem)<ListItemProps>`
    height: ${RFValue(45)}px;
    margin-bottom: ${RFValue(12)}px;
`;

export const StyledRightItem = styled.View`
    flex: 0.5;
    justify-content: flex-end;
`;

export const StyledText = styled(Text)<StyledTextProps>`
    ${({ size, weight }) => css`
        text-align: center;
        font-size: ${size}px;
        font-weight: ${weight};
    `}
`;
