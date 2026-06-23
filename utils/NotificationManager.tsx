import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
type Props = {};
const NotificationManager = (props: Props) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  async function scheduleDailyReminder(
    title: string,
    body: string,
    hour: number,
    minute: number,
  ) {
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        hour,
        minute,
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
      },
    });
  }

  async function init() {
    const { status } = await Notifications.getPermissionsAsync();
    const result = await Notifications.requestPermissionsAsync();
    console.log("Request:", result);

    if (status !== "granted") return;

    await scheduleDailyReminder("📝 Journal", "Write today's journal", 20, 0);

    await scheduleDailyReminder("😴 Sleep", "Time to sleep", 21, 5);

    await scheduleDailyReminder("🍽️ Lunch", "Log your lunch", 13, 0);
  }

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

export default NotificationManager;
