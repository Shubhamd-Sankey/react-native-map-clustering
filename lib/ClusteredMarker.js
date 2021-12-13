import React, { memo } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MarkerAnimated } from "react-native-maps";
import { returnMarkerStyle } from "./helpers";

const ClusteredMarker = ({
  geometry,
  properties,
  onPress,
  clusterColor,
  clusterTextColor,
  clusterFontFamily,
  tracksViewChanges,
}) => {
  const points = properties.point_count;
  const { width, height, fontSize, size } = returnMarkerStyle(points);

  return (
    <MarkerAnimated
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      // style={{ zIndex: points + 1 }}
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.container, { width, height }]}
      >
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: clusterColor,
              width: width,
              height: height,
              borderRadius: 360,
            },
          ]}
        />
        <View
          style={[
            styles.cluster,
            {
              backgroundColor: clusterColor,
              width: size,
              height: size,
              borderRadius: 360,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: clusterTextColor,
                fontSize,
                fontFamily: clusterFontFamily,
              },
            ]}
          >
            {points}
          </Text>
        </View>
      </TouchableOpacity>
    </MarkerAnimated>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    opacity: 0.5,
    zIndex: 0,
  },
  cluster: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontWeight: "bold",
  },
});

export default memo(ClusteredMarker);
