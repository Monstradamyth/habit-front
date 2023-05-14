import { HabitsList } from "@/entities/habit/view/HabitsList";
import {
  FILTER_OPTIONS,
  FilterModal,
} from "@/screens/home/components/FilterModal";
import { Header } from "@/screens/home/components/Header";
import { Offset, TOP_HEIGHT } from "@/shared/config/constants";
import { CommonLayout } from "@/shared/ui/layout/Layout";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { navigationNavigate } from "@/app/navigation/instance";
import { useQuery } from "react-query";
import { getHabits } from "@/shared/api/habit/get-habits";
import { HabitType } from "@/entities/habit/view/types";
import { Loader } from "@/shared/ui/loader/Loader";
import { ButtonWithGradient } from "@/shared/ui/button/ButtonWithGradient";

const { height } = Dimensions.get("window");
const statusBarHeight = Constants.statusBarHeight;

const useGetAllHabits = () => {
  const query = useQuery({
    queryFn: () => getHabits(),
    queryKey: ["habits"],
  });

  return query;
};

export const HomeScreen = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FILTER_OPTIONS>(
    FILTER_OPTIONS.ALL
  );

  const { isLoading, data, refetch, isError } = useGetAllHabits();

  useEffect(() => {
    // TODO Fix types
    if (data) {
      setHabits(data.habits);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setShowRetryButton(true);
    }
  }, [isError]);

  const filteredHabits = habits.filter((h) => {
    if (selectedFilter === FILTER_OPTIONS.ACTIVE) {
      return h.status;
    } else if (selectedFilter === FILTER_OPTIONS.INACTIVE) {
      return !h.status;
    } else {
      return true;
    }
  });

  return (
    <View style={styles.BigLayout}>
      <CommonLayout style={{ paddingBottom: 60 }}>
        <TouchableWithoutFeedback
          style={styles.Wrapper}
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View style={styles.View}>
            <Header onFilterPress={() => setOpenFilterModal(true)} />
            <View style={styles.ContentWrapper}>
              {isLoading ? (
                <Loader />
              ) : (
                <HabitsList
                  habits={filteredHabits}
                  refreshFunction={() => {
                    refetch();
                  }}
                  isRefreshing={isLoading}
                  onSelect={(habit) =>
                    navigationNavigate("Habit", {
                      screen: "EditHabit",
                      params: {
                        habitId: habit.id,
                      },
                    })
                  }
                />
              )}
              {showRetryButton && (
                <Button
                  style={styles.RetryButton}
                  mode="contained"
                  onPress={() => refetch()}
                >
                  Retry
                </Button>
              )}
            </View>
            <FilterModal
              isVisible={openFilterModal}
              onDismiss={() => setOpenFilterModal(false)}
              onSubmit={(val) => {
                setSelectedFilter(val);
                setOpenFilterModal(false);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </CommonLayout>
      <ButtonWithGradient
        text="Add Habit"
        onPress={() => navigationNavigate("Habit", { screen: "CreateHabit" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  BigLayout: {
    flex: 1,
  },
  Wrapper: {
    // flex: 1,
  },
  View: {
    flex: 1,
    justifyContent: "space-between",
    height: height - statusBarHeight - TOP_HEIGHT - 30,
  },
  ContentWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  RetryButton: {
    marginBottom: 40,
    marginHorizontal: Offset.paddingHorizontal,
  },
});
