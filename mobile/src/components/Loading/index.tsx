import { View, ActivityIndicator } from 'react-native';

import { THEME } from '../../theme';

import { styles } from './styles';

interface Props {
  size: "small" | "large";
}

export function Loading({ size }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={THEME.COLORS.PRIMARY} />
    </View>
  );
}