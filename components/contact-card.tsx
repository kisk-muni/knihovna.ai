import classNames from "classnames";
import { Button } from "./button";
import Card from "./card";
import TypeformButton from "./typeform-button";

export default function ContactCard({
  title = "Chcete se s námi spojit?",
  className,
}: {
  title?: string;
  className?: string;
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
          Těšíme se na nové možnosti spolupráce. Neváhejte se nám ozvat na
          adrese{" "}
          <span className="bg-primarydarker/40 px-1 py-0.5 rounded-md">
            kiskxai@gmail.com
          </span>{" "}
          nebo nám zanechejte svůj kontakt.
        </p>
      </div>
      <div className="flex justify-center">
        <TypeformButton id="UzBhUVqf">
          <Button theme="white" size="base">
            Zanechat kontakt
          </Button>
        </TypeformButton>
      </div>
    </Card>
  );
}
