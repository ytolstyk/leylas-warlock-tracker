import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { MagicMissile } from "../app/(tabs)/styles";
import { useEffect } from "react";

type Props = {
  colorIndex: number;
};

export function RocketAnimation({ colorIndex }: Props) {
  const translateY = useSharedValue(-50);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 1000,
            easing: Easing.bezier(0.37, 0.06, 0.96, 0.67),
          }),
        },
      ],
    };
  });

  const animateIn = () => {
    translateY.value = -1000;
  };

  useEffect(() => {
    animateIn();
  }, []);

  return (
    <Animated.View
      style={{
        top: 0,
        left: 0,
        position: "absolute",
        backgroundColor: "transparent",
        ...animatedStyles,
      }}
    >
      <MagicMissile size={60} name="shark" colorIndex={colorIndex} isFilled />
    </Animated.View>
  );
}
