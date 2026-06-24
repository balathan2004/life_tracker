import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";

type Props = {};

const notificationData = [
  {
    title: "📝 Journal",
    body: "Hope you had a great day! Write today's journal",
    hour: 19,
    minute: 0,
  },
  {
    title: "😴 Sleep",
    body: "Time to sleep",
    hour: 21,
    minute: 0,
  },
  {
    title: "Good Morning",
    body: "Hope you have a great day!",
    hour: 6,
    minute: 0,
  },
];

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

    notificationData.forEach(async (data) => {
      await scheduleDailyReminder(
        data.title,
        data.body,
        data.hour,
        data.minute,
      );
    });
  }

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

export default NotificationManager;
