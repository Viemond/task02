import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import React from "react";

export default function Paginator({ data, scrollX }) {
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dothWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 35, 8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dothWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 8,
    borderRadius: 5,
    backgroundColor: "#061023",
    marginHorizontal: 3,
  },
});
