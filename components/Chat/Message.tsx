interface IMessage {
  text: string;
  isIncomingMessage: boolean;
}

export const Message = ({ text, isIncomingMessage }: IMessage) => {
  return (
    <div
      className={`${
        isIncomingMessage ? 'bg-amber-50' : 'bg-amber-100'
      } rounded-lg p-2 text-black`}
    >
      {text}
    </div>
  );
};
