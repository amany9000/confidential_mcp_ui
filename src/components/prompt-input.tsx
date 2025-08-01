"use client";

import {
  AudioWaveformIcon,
  ChevronDown,
  CornerRightUp,
  Pause,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "ui/button";
import { notImplementedToast } from "ui/shared-toast";
import { UseChatHelpers } from "@ai-sdk/react";
import { SelectModel } from "./select-model";
import { appStore } from "@/app/store";
import { useShallow } from "zustand/shallow";
import { ChatMention, ChatMessageAnnotation, ChatModel } from "app-types/chat";
import dynamic from "next/dynamic";
import { ToolModeDropdown } from "./tool-mode-dropdown";

import { ToolSelectDropdown } from "./tool-select-dropdown";
import { useTranslations } from "next-intl";
import { Editor } from "@tiptap/react";
import { WorkflowSummary } from "app-types/workflow";

interface PromptInputProps {
  placeholder?: string;
  setInput: (value: string) => void;
  input: string;
  onStop: () => void;
  append: UseChatHelpers["append"];
  toolDisabled?: boolean;
  isLoading?: boolean;
  model?: ChatModel;
  setModel?: (model: ChatModel) => void;
}

const ChatMentionInput = dynamic(() => import("./chat-mention-input"), {
  ssr: false,
  loading() {
    return <div className="h-[2rem] w-full animate-pulse"></div>;
  },
});

export default function PromptInput({
  placeholder,
  append,
  model,
  setModel,
  input,
  setInput,
  isLoading,
  toolDisabled,
}: PromptInputProps) {
  const t = useTranslations("Chat");

  const [_currentThreadId, _currentProjectId, globalModel, appStoreMutate] =
    appStore(
      useShallow((state) => [
        state.currentThreadId,
        state.currentProjectId,
        state.chatModel,
        state.mutate,
      ]),
    );

  const chatModel = useMemo(() => {
    return model ?? globalModel;
  }, [model, globalModel]);

  const editorRef = useRef<Editor | null>(null);

  const setChatModel = useCallback(
    (model: ChatModel) => {
      if (setModel) {
        setModel(model);
      } else {
        appStoreMutate({ chatModel: model });
      }
    },
    [setModel, appStoreMutate],
  );

  const [toolMentionItems, setToolMentionItems] = useState<ChatMention[]>([]);

  const onSelectWorkflow = useCallback((workflow: WorkflowSummary) => {
    const workflowMention: ChatMention = {
      type: "workflow",
      workflowId: workflow.id,
      icon: workflow.icon,
      name: workflow.name,
      description: workflow.description,
    };
    editorRef.current
      ?.chain()

      .insertContent({
        type: "mention",
        attrs: {
          label: `${workflow.name} `,
          id: JSON.stringify(workflowMention),
        },
      })
      .focus()
      .run();
  }, []);

  const submit = () => {
    if (isLoading) return;
    const userMessage = input?.trim() || "";
    if (userMessage.length === 0) return;
    const annotations: ChatMessageAnnotation[] = [];
    if (toolMentionItems.length > 0) {
      annotations.push({
        mentions: toolMentionItems,
      });
    }
    setToolMentionItems([]);
    setInput("");
    append!({
      role: "user",
      content: "",
      annotations,
      parts: [
        {
          type: "text",
          text: userMessage,
        },
      ],
    });
  };

  return (
    <div className="max-w-3xl mx-auto fade-in animate-in">
      <div className="z-10 mx-auto w-full max-w-3xl relative">
        <fieldset className="flex w-full min-w-0 max-w-full flex-col px-2">
          <div className="rounded-4xl backdrop-blur-sm transition-all duration-200 bg-muted/60 relative flex w-full flex-col cursor-text z-10 items-stretch focus-within:bg-muted hover:bg-muted p-3">
            <div className="flex flex-col gap-3.5 px-1">
              <div className="relative min-h-[2rem]">
                <ChatMentionInput
                  input={input}
                  onChange={setInput}
                  onChangeMention={setToolMentionItems}
                  onEnter={submit}
                  placeholder={placeholder ?? t("placeholder")}
                  ref={editorRef}
                />
              </div>
              <div className="flex w-full items-center gap-[1px]  z-30">
                {!toolDisabled && (
                  <>
                    <ToolModeDropdown />
                    <ToolSelectDropdown
                      align="start"
                      side="top"
                      onSelectWorkflow={onSelectWorkflow}
                      mentions={toolMentionItems}
                    />
                  </>
                )}
                <div className="flex-1" />

                <SelectModel onSelect={setChatModel} defaultModel={chatModel}>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="rounded-full data-[state=open]:bg-input! hover:bg-input! mr-1"
                  >
                    {chatModel?.model ?? (
                      <span className="text-muted-foreground">model</span>
                    )}
                    <ChevronDown className="size-3" />
                  </Button>
                </SelectModel>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
