import { useEffect, useRef, useState } from 'react'
import { CHATBOT_GREETING } from '../../data/chatbot';
import type { Message, ChatOption, ChatCategory } from '../../types';

export const useChatWindow = () => {
   const [messages, setMessages] = useState<Message[]>([]);
    const [phase, setPhase] = useState<"greeting" | "categories" | "options" | "answered">("greeting");
    const [activeCategory, setActiveCategory] = useState<ChatCategory | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingText, setTypingText] = useState("");
    const [pendingPhase, setPendingPhase] = useState<typeof phase | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const msgId = useRef(0);
  
    const nextId = () => String(++msgId.current);
  
    // Auto-scroll
    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isThinking, isTyping]);
  
    // Start greeting on mount
    useEffect(() => {
      setIsThinking(true);
      const t = setTimeout(() => {
        setIsThinking(false);
        setTypingText(CHATBOT_GREETING);
        setIsTyping(true);
        setPendingPhase("categories");
      }, 800);
      return () => clearTimeout(t);
    }, []);
  
    function onTypingDone() {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: "bot", text: typingText },
      ]);
      setIsTyping(false);
      setTypingText("");
      if (pendingPhase) {
        setPhase(pendingPhase);
        setPendingPhase(null);
      }
    }
  
    function handleSelectCategory(cat: ChatCategory) {
      setPhase("idle" as typeof phase);
      const userMsg: Message = { id: nextId(), from: "user", text: cat.category };
      setMessages((prev) => [...prev, userMsg]);
      setActiveCategory(cat);
  
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setTypingText(`Sure! Here are some questions about "${cat.category}". Pick one:`);
        setIsTyping(true);
        setPendingPhase("options");
      }, 700);
    }
  
    function handleSelectOption(opt: ChatOption) {
      setPhase("idle" as typeof phase);
      const userMsg: Message = { id: nextId(), from: "user", text: opt.label };
      setMessages((prev) => [...prev, userMsg]);
  
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setTypingText(opt.answer);
        setIsTyping(true);
        setPendingPhase("answered");
      }, 900);
    }
  
    function handleReset() {
      setMessages([]);
      setActiveCategory(null);
      setPhase("greeting");
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        setTypingText(CHATBOT_GREETING);
        setIsTyping(true);
        setPendingPhase("categories");
      }, 600);
    }

    return {
        messages,
        phase, setPhase,
        activeCategory,
        isThinking,
        isTyping,
        typingText,
        bottomRef,
        onTypingDone,
        handleSelectCategory,
        handleSelectOption,
        handleReset
    }
}
