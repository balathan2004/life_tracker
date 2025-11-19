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

export interface allDocResponseConfig extends ResponseConfig {
  docs: {
    [date: string]: dailyLogInterface;
  };
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


export const formatDailyLogForUi=(value:dailyLogInterface)=>{}