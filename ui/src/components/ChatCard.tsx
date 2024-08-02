import { Card, CardContent } from "@/components/ui/card";

interface ChatCardProps {
  msg: { content: string; username: string };
  index: number;
}

const ChatCard = ({ msg, index }: ChatCardProps) => {
  const time = new Date()
    .toLocaleTimeString()
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  return (
    <Card className="mt-3 p-3 max-w-full flex relative">
      <CardContent
        className={`py-3 px-4 bg-green-300 rounded-md shadow-md ${
          index % 2 === 0 ? "bg-blue-300" : "bg-green-300"
        }`}
        style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
      >
        <span className="absolute top-2 left-2 -mt-2 text-[9px] font-semibold text-gray-600">
          {time}
        </span>
        <span className="absolute top-2 right-2 -mt-3 text-[12px] font-semibold text-gray-800">
          {msg.username}
        </span>
        {msg.content}
      </CardContent>
    </Card>
  );
};

export default ChatCard;
