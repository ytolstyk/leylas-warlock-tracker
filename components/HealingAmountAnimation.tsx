import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Text } from "./Themed";

type Props = {
  label: string;
  direction?: "up" | "down";
};

export function HealingAmountAnimation({ label, direction }: Props) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 500,
            easing: Easing.bezier(0, 0.65, 0.57, 1.53),
          }),
        },
        {
          scale: withTiming(scale.value, {
            duration: 1500,
            easing: Easing.bezier(0, 0.65, 0.35, 1.19),
          }),
        },
      ],
    };
  });

  const animateIn = () => {
    const newValue = direction === "down" ? 100 : -100;
    translateY.value = newValue;
    scale.value = 4;
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
      <Text style={{ textShadowColor: "black", textShadowRadius: 3 }}>
        {label}
      </Text>
    </Animated.View>
  );
}
