import { Colors } from '@/shared/config/constants';
import { useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';

export type LoaderProps = {
  style?: StyleProp<ViewStyle>;
  width?: number;
  radius?: number;
  color?: string;
  backgroundColor?: string;
};

const DEFAULT_RADIUS = 15;
const DEFAULT_WIDTH = 3;

export const Loader = (props: LoaderProps) => {
  const progressRef = useRef<ProgressRef>(null);

  return (
    <View style={[styles.container, props.style]}>
      <CircularProgress
        ref={progressRef}
        value={100}
        radius={props.radius || DEFAULT_RADIUS}
        activeStrokeWidth={props.width || DEFAULT_WIDTH}
        inActiveStrokeWidth={props.width || DEFAULT_WIDTH}
        inActiveStrokeColor={props.backgroundColor || Colors.disabledColor}
        inActiveStrokeOpacity={0.1}
        progressValueStyle={styles.valueStyle}
        activeStrokeColor={props.color || Colors.accentColor}
        duration={1000}
        onAnimationComplete={() => {
          progressRef.current?.reAnimate();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  valueStyle: {
    display: 'none',
  },
});
