import { MessageInput, Message } from '.';

const messages = [
  { text: 'Привет! Как дела?', isIncomingMessage: true },
  { text: 'Привет! Всё хорошо, спасибо. А у тебя?', isIncomingMessage: false },
  { text: 'Тоже отлично! Чем занимаешься?', isIncomingMessage: true },
  { text: 'Работаю над проектом, а ты?', isIncomingMessage: false },
  { text: 'Смотрю сериал, отдыхаю.', isIncomingMessage: true },
  { text: 'Звучит круто! Какой сериал?', isIncomingMessage: false },
  {
    text: 'The Office. Уже пересматриваю второй раз.',
    isIncomingMessage: true,
  },
  { text: 'Классика! Тоже люблю его.', isIncomingMessage: false },
  { text: 'Привет! Как дела?', isIncomingMessage: true },
  { text: 'Привет! Всё хорошо, спасибо. А у тебя?', isIncomingMessage: false },
  { text: 'Тоже отлично! Чем занимаешься?', isIncomingMessage: true },
  { text: 'Работаю над проектом, а ты?', isIncomingMessage: false },
  { text: 'Смотрю сериал, отдыхаю.', isIncomingMessage: true },
  { text: 'Звучит круто! Какой сериал?', isIncomingMessage: false },
  {
    text: 'The Office. Уже пересматриваю второй раз.',
    isIncomingMessage: true,
  },
  { text: 'Классика! Тоже люблю его.', isIncomingMessage: false },
  { text: 'Привет! Как дела?', isIncomingMessage: true },
  { text: 'Привет! Всё хорошо, спасибо. А у тебя?', isIncomingMessage: false },
  { text: 'Тоже отлично! Чем занимаешься?', isIncomingMessage: true },
  { text: 'Работаю над проектом, а ты?', isIncomingMessage: false },
  { text: 'Смотрю сериал, отдыхаю.', isIncomingMessage: true },
  { text: 'Звучит круто! Какой сериал?', isIncomingMessage: false },
  {
    text: 'The Office. Уже пересматриваю второй раз.',
    isIncomingMessage: true,
  },
  { text: 'Классика! Тоже люблю его.', isIncomingMessage: false },
  { text: 'Привет! Как дела?', isIncomingMessage: true },
  { text: 'Привет! Всё хорошо, спасибо. А у тебя?', isIncomingMessage: false },
  { text: 'Тоже отлично! Чем занимаешься?', isIncomingMessage: true },
  { text: 'Работаю над проектом, а ты?', isIncomingMessage: false },
  { text: 'Смотрю сериал, отдыхаю.', isIncomingMessage: true },
  { text: 'Звучит круто! Какой сериал?', isIncomingMessage: false },
  {
    text: 'The Office. Уже пересматриваю второй раз.',
    isIncomingMessage: true,
  },
  { text: 'Классика! Тоже люблю его.', isIncomingMessage: false },
  { text: 'Привет! Как дела?', isIncomingMessage: true },
  { text: 'Привет! Всё хорошо, спасибо. А у тебя?', isIncomingMessage: false },
  { text: 'Тоже отлично! Чем занимаешься?', isIncomingMessage: true },
  { text: 'Работаю над проектом, а ты?', isIncomingMessage: false },
  { text: 'Смотрю сериал, отдыхаю.', isIncomingMessage: true },
  { text: 'Звучит круто! Какой сериал?', isIncomingMessage: false },
  {
    text: 'The Office. Уже пересматриваю второй раз.',
    isIncomingMessage: true,
  },
  { text: 'Классика! Тоже люблю его.', isIncomingMessage: false },
];

export const Chat = () => {
  return (
    <div className="flex flex-col bg-slate-700 w-full gap-3 justify-between p-4">
      <div className="flex flex-col w gap-1.5 overflow-y-scroll custom-scroll">
        {messages.map(({ text, isIncomingMessage }) => (
          <Message
            key={text}
            text={text}
            isIncomingMessage={isIncomingMessage}
          />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
