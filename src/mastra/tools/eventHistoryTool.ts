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
      return {
        events: historyData.data.Events || [],
        births: historyData.data.Births || [],
        date: historyData.date || new Date().toISOString().split("T")[0],
      };
    } catch (error) {
      console.error("Error fetching history data", error);
      throw error;
    }
  },
});
