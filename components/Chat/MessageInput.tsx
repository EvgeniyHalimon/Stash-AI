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
    <form className="flex h-auto items-center gap-3 rounded-2xl bg-cyan-800 p-3">
      <textarea
        ref={textareaRef}
        className="custom-scroll h-12 max-h-[150px] w-full resize-none overflow-y-auto border-none bg-transparent p-2 text-white placeholder-gray-300 outline-none"
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
