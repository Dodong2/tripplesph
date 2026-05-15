/* hooks */
import { useTypingMessage } from "../../hooks/chatbot-hooks/useTypingMessage";
import { useChatWindow } from "../../hooks/chatbot-hooks/useChatWindow";
/* data */
import { CHATBOT_DATA } from "../../data/chatbot";
import { useChatBot } from "../../hooks/chatbot-hooks/useChatBot";
/* icons */
import { ArrowLeft, ArrowRight, MessageCircle, RotateCcw, X } from "lucide-react";

function TypingBubble({ text, onDone }: { text: string; onDone: () => void }) {
  const { displayed } = useTypingMessage(text, onDone);
  return (
    <div className="flex items-start gap-2 max-w-[85%]">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#197996] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">
        R
      </div>
      <div className="bg-white border border-[#d0eef5] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-800 leading-relaxed shadow-sm whitespace-pre-line">
        {displayed}
        <span className="inline-block w-0.5 h-3.5 bg-[#197996] ml-0.5 animate-pulse align-middle" />
      </div>
    </div>
  );
}
 
// ── Static bot bubble ─────────────────────────────────────────────────────────
function BotBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 max-w-[85%]">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#197996] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">
        R
      </div>
      <div className="bg-white border border-[#d0eef5] rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm text-gray-800 leading-relaxed shadow-sm whitespace-pre-line">
        {text}
      </div>
    </div>
  );
}
 
// ── User bubble ───────────────────────────────────────────────────────────────
function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-gradient-to-br from-[#06b6d4] to-[#197996] rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-sm text-white leading-relaxed max-w-[85%] shadow-sm">
        {text}
      </div>
    </div>
  );
}
 
// ── Thinking dots ─────────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-start gap-2 max-w-[85%]">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#197996] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5">
        R
      </div>
      <div className="bg-white border border-[#d0eef5] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-[#197996] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
 
// ── Chat window ───────────────────────────────────────────────────────────────
function ChatWindow({ onClose }: { onClose: () => void }) {
  const {
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
    handleReset,
  } = useChatWindow();
 
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#197996] to-[#06b6d4] rounded-t-2xl flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
            R
          </div>
          <div>
            <p className="font-['Poppins'] font-semibold text-white text-sm leading-none">Ripple</p>
            <p className="font-['Inter'] text-white/70 text-xs mt-0.5">TRipplesPH Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="font-['Inter'] text-white/70 text-xs mr-2">Online</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer border-none"
            aria-label="Close chat"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
 
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f0f9fc]">
        {messages.map((msg) =>
          msg.from === "bot" ? (
            <BotBubble key={msg.id} text={msg.text} />
          ) : (
            <UserBubble key={msg.id} text={msg.text} />
          )
        )}
        {isThinking && <ThinkingDots />}
        {isTyping && <TypingBubble text={typingText} onDone={onTypingDone} />}
        <div ref={bottomRef} />
      </div>
 
      {/* Action buttons */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0 rounded-b-2xl">
        {phase === "categories" && (
          <div className="flex flex-col gap-2">
            <p className="font-['Inter'] text-xs text-gray-400 mb-1">Choose a topic:</p>
            {CHATBOT_DATA.map((cat) => {
              const Icon = cat.icon
              return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-xl border border-[#cceef5] bg-[#f0f9fc] hover:bg-[#d8f3fa] hover:border-[#197996] transition-all text-sm font-['Inter'] text-gray-700 cursor-pointer"
              >
                <span className="text-base flex-shrink-0"><Icon color={cat.iconsColor}/></span>
                <span className="flex-1">{cat.category}</span>
                <ArrowRight size={14} className="text-[#197996] flex-shrink-0" />
              </button>
            )})}
          </div>
        )}
 
        {phase === "options" && activeCategory && (
          <div className="flex flex-col gap-2">
            <p className="font-['Inter'] text-xs text-gray-400 mb-1">Select a question:</p>
            {activeCategory.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className="flex items-start gap-2 w-full text-left px-3 py-2 rounded-xl border border-[#cceef5] bg-[#f0f9fc] hover:bg-[#d8f3fa] hover:border-[#197996] transition-all text-sm font-['Inter'] text-gray-700 cursor-pointer"
              >
                <ArrowRight size={14} className="text-[#197996] mt-0.5 flex-shrink-0" />
                <span>{opt.label}</span>
              </button>
            ))}
            <button
              onClick={() => setPhase("categories")}
              className="flex items-center gap-1.5 w-full text-xs text-[#197996] hover:underline mt-1 cursor-pointer bg-transparent border-none font-['Inter']"
            >
              <ArrowLeft size={12} />
              Back to topics
            </button>
          </div>
        )}
 
        {phase === "answered" && (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => activeCategory && setPhase("options")}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl border border-[#cceef5] bg-[#f0f9fc] hover:bg-[#d8f3fa] hover:border-[#197996] transition-all text-sm font-['Inter'] text-gray-700 cursor-pointer"
            >
              <MessageCircle size={14} className="text-[#197996]" />
              Ask another question
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl border border-[#197996] bg-gradient-to-r from-[#197996] to-[#06b6d4] text-white text-sm font-['Inter'] hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RotateCcw size={14} />
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
 
// ── Main ChatBot component ────────────────────────────────────────────────────
export default function ChatBot() {
  const { open, hasUnread, handleOpen, handleClose } = useChatBot();
 
  return (
    <>
      {/* Overlay — mobile only */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[998] md:hidden"
          onClick={handleClose}
        />
      )}
 
      {/* Chat window */}
      {open && (
        <>
          {/* Mobile: centered modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[999] px-4 md:hidden pointer-events-none">
            <div className="w-full max-w-[380px] h-[560px] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden">
              <ChatWindow onClose={handleClose} />
            </div>
          </div>
 
          {/* Desktop: bottom-right panel */}
          <div className="hidden md:flex fixed bottom-[90px] right-6 z-[999] w-[360px] h-[520px] rounded-2xl shadow-2xl overflow-hidden flex-col">
            <ChatWindow onClose={handleClose} />
          </div>
        </>
      )}
 
      {/* Floating trigger button */}
      <button
        onClick={open ? handleClose : handleOpen}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 rounded-full shadow-lg cursor-pointer border-none flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{ background: "linear-gradient(135deg, #197996 0%, #06b6d4 100%)" }}
      >
        {/* Unread badge */}
        {hasUnread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        )}
 
        {open ? (
          <X size={22} className="text-white" strokeWidth={2.5} />
        ) : (
          <MessageCircle size={22} className="text-white" strokeWidth={2} />
        )}
      </button>
    </>
  );
}
