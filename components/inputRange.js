import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, TextInput } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  useAnimatedProps,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const WIDTH = Dimensions.get("window").width - 40;
const KNOBSIZE = 20;
const MAXWIDTH = WIDTH - KNOBSIZE / 2 + 6;

const InputRange = ({ min, max, steps, title, onValueChange }) => {
  const [minValue, setMinValue] = useState(min.toString());
  const [maxValue, setMaxValue] = useState(max.toString());

  const xknob1 = useSharedValue(0);
  const scaleKnob1 = useSharedValue(1);
  const xknob2 = useSharedValue(MAXWIDTH);
  const scaleKnob2 = useSharedValue(1);

  const updateValues = () => {
    const newMinValue =
      Math.round((min + (xknob1.value / MAXWIDTH) * (max - min)) / steps) *
      steps;
    const newMaxValue =
      Math.round((min + (xknob2.value / MAXWIDTH) * (max - min)) / steps) *
      steps;
    setMinValue(`${isNaN(newMinValue) ? "Invalid" : newMinValue}`);
    setMaxValue(`${isNaN(newMaxValue) ? "Invalid" : newMaxValue}`);

    // console.log("New minimum value:", newMinValue);
    // console.log("New maximum value:", newMaxValue);

    onValueChange && onValueChange(newMinValue, newMaxValue);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(1)} crore`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(1)} lakh`;
    } else {
      return price;
    }
  };

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = xknob1.value;
    },
    onActive: (event, ctx) => {
      scaleKnob1.value = 1.3;
      const newX = ctx.startX + event.translationX;
      xknob1.value = Math.max(0, Math.min(newX, xknob2.value - KNOBSIZE)); // Ensure knob1 stays within bounds
    },
    onEnd: () => {
      scaleKnob1.value = 1;
      runOnJS(updateValues)();
    },
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = xknob2.value;
    },
    onActive: (event, ctx) => {
      scaleKnob2.value = 1.3;
      const newX = ctx.startX + event.translationX;
      xknob2.value = Math.max(
        xknob1.value + KNOBSIZE,
        Math.min(newX, MAXWIDTH)
      ); // Ensure knob2 stays within bounds
    },
    onEnd: () => {
      scaleKnob2.value = 1;
      runOnJS(updateValues)();
    },
  });

  const styleLine = useAnimatedStyle(() => {
    return {
      backgroundColor: "orange",
      height: 3,
      marginTop: -3,
      borderRadius: 3,
      width: xknob2.value - xknob1.value,
      transform: [
        {
          translateX: xknob1.value + KNOBSIZE / 2, // Adjust for knob size
        },
      ],
    };
  });

  const propsLabel1 = useAnimatedProps(() => {
    const value =
      Math.round((min + (xknob1.value / MAXWIDTH) * (max - min)) / steps) *
      steps;
    return {
      text: `${isNaN(value) ? "Invalid" : value}`,
    };
  });

  const propsLabel2 = useAnimatedProps(() => {
    const value =
      Math.round((min + (xknob2.value / MAXWIDTH) * (max - min)) / steps) *
      steps;
    return {
      text: `${isNaN(value) ? "Invalid" : value}`,
    };
  });

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rangeContainer}>
        <View style={styles.labelContainer}>
          {/* <AnimatedTextInput
            value={minValue}
            style={styles.label}
            editable={false}
          />
          <AnimatedTextInput
            value={maxValue}
            style={styles.label}
            editable={false}
          /> */}
        </View>
        <View style={styles.additionalView}>
          <Text>{formatPrice(parseInt(minValue))}</Text>
          <Text>{formatPrice(parseInt(maxValue))}</Text>
        </View>

        <View style={styles.track}>
          <Animated.View style={styleLine} />
        </View>
        <View>
          <PanGestureHandler onGestureEvent={gestureHandler1}>
            <Animated.View
              style={[
                styles.knob,
                useAnimatedStyle(() => ({
                  transform: [
                    { translateX: xknob1.value },
                    { scale: scaleKnob1.value },
                  ],
                })),
              ]}
            />
          </PanGestureHandler>
          <PanGestureHandler onGestureEvent={gestureHandler2}>
            <Animated.View
              style={[
                styles.knob,
                useAnimatedStyle(() => ({
                  transform: [
                    { translateX: xknob2.value },
                    { scale: scaleKnob2.value },
                  ],
                })),
              ]}
            />
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  additionalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: {
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 0,
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.5,
  },
  rangeContainer: {
    paddingHorizontal: 20,
    paddingTop: 2,
    paddingBottom: 12,
    backgroundColor: "white",
    borderColor: "white",
    borderBottomWidth: 1,
  },
  labelContainer: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    color: "#333",
    fontSize: 12,
  },
  track: {
    height: 1,
    backgroundColor: "#cccdf2",
    borderRadius: 3,
  },
  knob: {
    position: "absolute",
    height: KNOBSIZE,
    width: KNOBSIZE,
    borderRadius: KNOBSIZE / 2,
    borderColor: "#9c44dc",
    borderWidth: 2,
    backgroundColor: "#fff",
    marginTop: -KNOBSIZE + 8,
    marginLeft: -8,
  },
});

export default InputRange;
