'use client';

import { useRef, useState } from 'react';
import { SendIcon } from '../Icons';

export const MessageInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = 150;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };
  return (
    <form className="flex h-auto items-center gap-3 p-3 rounded-2xl bg-cyan-800">
      <textarea
        ref={textareaRef}
        className="resize-none w-full max-h-[150px] h-12 p-2 text-white bg-transparent border-none outline-none placeholder-gray-300  overflow-y-auto custom-scroll"
        placeholder="Type here"
        value={value}
        onChange={e => setValue(e.target.value)}
        onInput={handleInput}
      />
      <button className="cursor-pointer self-end">
        <SendIcon />
      </button>
    </form>
  );
};
