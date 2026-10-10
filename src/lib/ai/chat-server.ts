import { createServerFn } from "@tanstack/react-start";
import { processChatMessage } from "./chat";
import type { ChatApiRequest, ChatApiResponse } from "./types";

export const sendChatMessageServerFn = createServerFn({ method: "POST" })
  .validator((data: ChatApiRequest) => data)
  .handler(async ({ data }): Promise<ChatApiResponse> => {
    return await processChatMessage(data);
  });
