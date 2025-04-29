import { NextRequest } from "next/server";

import { CoreTool, LanguageModelV1, streamText, StreamTextResult } from "ai";

import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { xai } from '@ai-sdk/xai';
import { google } from '@ai-sdk/google';

import { Models } from "@/types/models";
import { chooseAgent } from "./utils";
import { agents } from "@/ai/agents";

const system = 
`You a network of blockchain agents called The Hive (or Hive for short). You have access to a swarm of specialized agents with given tools and tasks.

Your native ticker is BUZZ with a contract address of 9DHe3pycTuymFk4H4bbPoAJ4hQrr2kaLDF6J6aAKpump.

Here are the other agents:

${agents.map(agent => `${agent.name}: ${agent.capabilities}`).join("\n")}

The query of the user did not result in any agent being invoked. You should respond with a message that is helpful to the user.`

export const POST = async (req: NextRequest) => {

    const { messages, modelName } = await req.json();

    let model: LanguageModelV1 | undefined = undefined;

    if (modelName === Models.OpenAI) {
        model = openai("gpt-4o-mini");
    }

    if (modelName === Models.Anthropic) {
        model = anthropic("claude-3-5-sonnet-latest");
    }

    if (modelName === Models.XAI) {
        model = xai("grok-beta");
    }

    if (modelName === Models.Gemini) {
        model = google("gemini-2.0-flash-exp");
    }

    if (!model) {
        throw new Error("Invalid model");
    }

    const chosenAgent = await chooseAgent(model, messages);

    let streamTextResult: StreamTextResult<Record<string, CoreTool<any, any>>>;

    if(!chosenAgent) {
        streamTextResult = streamText({
            model,
            messages,
            system,
        });
    } else {
        streamTextResult = streamText({
            model,
            tools: chosenAgent.tools,
            messages,
            system: `${chosenAgent.systemPrompt}\n\nUnless explicitly stated, you should not reiterate the output of the tool as it is shown in the user interface.`,
        });
    }

    return streamTextResult.toDataStreamResponse();
}