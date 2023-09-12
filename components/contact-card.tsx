import classNames from "classnames";
import { Button } from "./button";
import Card from "./card";
import TypeformButton from "./typeform-button";

export default function ContactCard({
  title = "Chcete se s námi spojit?",
  className,
  showLeaveContact = true,
  formal = true,
}: {
  title?: string;
  className?: string;
  showLeaveContact?: boolean;
  formal?: boolean;
}) {
  return (
    <Card
      className={classNames(
        "mb-32 md:col-span-3 bg-primary text-center flex py-10 px-10 flex-col items-center justify-center",
        className
      )}
    >
      <div className="max-w-lg mb-6 flex flex-col items-center">
        <p className="w-86 mb-4 text-3xl font-bold text-white mt-0">{title}</p>
        <p className="text-sheet text-lg font-semibold m-0">
          Těšíme se na nové možnosti spolupráce. Neváhej{formal && "te"} se nám
          ozvat na adrese{" "}
          <span className="bg-primarydarker/40 px-1 py-0.5 rounded-md">
            kiskxai@gmail.com
          </span>
          {showLeaveContact &&
            ` nebo nám zanechej${formal ? "te" : ""} svůj kontakt`}
          .
        </p>
      </div>
      {showLeaveContact && (
        <div className="flex justify-center">
          <TypeformButton id="UzBhUVqf">
            <Button theme="white" size="base">
              Zanechat kontakt
            </Button>
          </TypeformButton>
        </div>
      )}
    </Card>
  );
}
