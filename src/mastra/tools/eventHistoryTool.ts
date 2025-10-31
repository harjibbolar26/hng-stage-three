import { createTool } from "@mastra/core";
import z from "zod";

export const eventHistoryTool = createTool({
  id: "get-event-history",
  description: "Get categorized today in history and famous birthday",
  outputSchema: z.object({
    events: z.array(
      z.object({
        year: z.string(),
        text: z.string(),
      })
    ),
    births: z.array(
      z.object({
        year: z.string(),
        text: z.string(),
      })
    ),
    date: z.string(),
  }),
  execute: async () => {
    try {
      const historyUrl = "https://history.muffinlabs.com/date";
      const historyResponse = await fetch(historyUrl);

      if (!historyResponse.ok) {
        throw new Error(
          `Failed to fetch history: ${historyResponse.statusText}`
        );
      }

    const historyData = await historyResponse.json();
    // if (historyData?.data?.Events && Array.isArray(historyData.data.Events)) {
    //   historyData.data.Events = historyData.data.Events.slice(0, 10);
    // }
      return {
        events: historyData.data.Events.slice(0, 10) || [],
        births: historyData.data.Births.slice(0, 10) || [],
        date: historyData.date || new Date().toISOString().split("T")[0],
      };
    } catch (error) {
      console.error("Error fetching history data", error);
      throw error;
    }
  },
});
