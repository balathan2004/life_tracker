import React, { ComponentType, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

type Props = {
  data: {
    title: string;
    Component: ComponentType<any>;
  }[];
  commonFooter?: ComponentType<any>;
  selectedPage?: number;
};

const CustomTabView = ({ data, commonFooter, selectedPage }: Props) => {
  const [activeIndex, setActiveIndex] = useState(selectedPage || 0);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
    });
  }, [activeIndex]);

  return (
    <FlatList
      data={[
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            padding: 10,
          }}
        >
          {data.map((item, index) => (
            <TabButton
              onPress={() => setActiveIndex(index)}
              key={index}
              isActive={activeIndex == index}
              label={item.title}
            />
          ))}
        </ScrollView>,
        <FlatList
          style={{ flexGrow: 0 }}
          ref={flatListRef}
          onMomentumScrollEnd={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x; // horizontal scroll position
            const viewSize = event.nativeEvent.layoutMeasurement.width; // width of the visible area
            const currentIndex = Math.floor(contentOffsetX / viewSize);
            setActiveIndex(currentIndex);
          }}
          onScrollToIndexFailed={(info) => {
            console.log("FAILED:", info);

            // Wait for item to render, then retry
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            }, 100);
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          horizontal
          data={data}
          renderItem={({ item }) => <item.Component />}
        />,
      ]}
      renderItem={({ item, index }) => (
        <React.Fragment key={index}>{item}</React.Fragment>
      )}
      ListFooterComponent={commonFooter && commonFooter}
    />
  );
};

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function TabButton({ isActive, label, onPress }: TabButtonProps) {
 
  const {colors}=useTheme()
 
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 8,
        minWidth: 100,
        marginRight: 24,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          textAlign: "center",
          borderColor: colors.primary,
          paddingBottom: 8,
          borderBottomWidth: isActive ? 2 : 0,
        }}
        variant="labelLarge"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomTabView;
