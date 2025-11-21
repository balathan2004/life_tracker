import { format } from "date-fns";

export interface ResponseConfig {
  message: string;
}

export interface AuthResponseConfig extends ResponseConfig {
  credentials: UserDataInterface | null;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserDataInterface {
  display_name: string;
  uid: string;
  created_at: number;
  email: string
}



export type foods = "breakfast" | "lunch" | "dinner" | "snacks";

export interface dailyLogInterface {
  date: string; // e.g. "2025-05-22"
  wakeUpTime: number;
  sleepTime: number;

  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
  };

  workout?: string;
  bodyMeasurements?: {
    height: string;
    weight: string;
  };

  screenTimeMinutes: number;
  somethingProductive: string;
  isBathTaken: boolean;
  travel: string;
  notes: string;
  mood: "great" | "good" | "okay" | "low" | "bad";
}

export interface LogsResponseConfig extends ResponseConfig {
  data: dailyLogInterface[];
}

export interface SingleLogResponseConfig extends ResponseConfig {
  data: dailyLogInterface | null;
}


export const initDailyLog = () => {
  const data: dailyLogInterface = {
    date: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }).slice(0, 10),
    wakeUpTime: 0,
    sleepTime: 0,
    meals: {
      breakfast: "",
      lunch: "",
      snacks: "",
      dinner: "",
    },
    workout: "",
    bodyMeasurements: {
      height: "",
      weight: "",
    },
    screenTimeMinutes: 0,
    somethingProductive: "",
    isBathTaken: false,
    travel: "",
    notes: "",
    mood: "okay",
  };
  return data;
};

export interface QuoteResponse extends ResponseConfig {
  quote: {
    quoteId: string;
    quote: string;
    author: string;
    userId: string;
    createdAt: number;
    username: string;
  }[];
}


export interface FirebaseDailyLog {
  data: string;
  encrypted: boolean
}




export const formatDailyLogForUI = (data: dailyLogInterface) => {
  return {
    Date: data.date,
    "WakeUp Time": data.wakeUpTime === 0 ? "-" : `${format(data.wakeUpTime, "hh:mm a")}`,
    "Sleep Time": data.sleepTime === 0 ? "-" : format(data.sleepTime, "hh:mm a"),
    Meals: {
      Breakfast: data?.meals?.breakfast || "Not Added",
      Lunch: data?.meals?.lunch || "Not Added",
      Snacks: data?.meals?.snacks || "Not Added",
      Dinner: data?.meals?.dinner || "Not Added",
    },
    Workout: data.workout || "None",
    "Body Measurements": {
      Height: data?.bodyMeasurements?.height ? `${data.bodyMeasurements.height}` : "Not Added",
      Weight: data?.bodyMeasurements?.weight ? `${data.bodyMeasurements.weight}` : "Not Added",
    },
    "Screen Time": `${data.screenTimeMinutes} min`,
    "Productive Thing": data.somethingProductive || "-",
    "Bath Taken": data.isBathTaken ? "Yes" : "No",
    Travel: data.travel || "Not Added",
    Notes: data.notes || "Not Added",
    Mood: data.mood,
  };
};