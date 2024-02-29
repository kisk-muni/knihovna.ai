"use client";
import Container from "@/components/ui/container";
/* eslint-disable react/no-unescaped-entities */
import BackgroundGradient from "@/components/ui/background-gradient";
import useDiagnosisForm from "@/lib/hooks/use-diagnosis-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

export default function Step({
  params: { step: stringifiedStep },
}: {
  params: { step: string };
}) {
  const router = useRouter();
  const [theme, step] = stringifiedStep.split("-").map((s) => parseInt(s, 10));
  const { started, questions, setAnswers, answers } = useDiagnosisForm();
  const currentTheme = questions[theme];
  const currentQuestion = currentTheme.questions[step];

  const click = (value: boolean) => {
    setAnswers({ ...answers, [`${theme}${step}`]: value });
    router.push(
      step + 1 < currentTheme.questions.length
        ? `/diagnostika/${theme}-${step + 1}`
        : theme + 1 < questions.length
        ? `/diagnostika/${theme + 1}-0`
        : "/diagnostika/vysledky"
    );
  };

  const navigate = (direction: "back" | "forward") => {
    router.push(
      direction === "back"
        ? step - 1 >= 0
          ? `/diagnostika/${theme}-${step - 1}`
          : theme - 1 >= 0
          ? `/diagnostika/${theme - 1}-${
              questions[theme - 1].questions.length - 1
            }`
          : "/diagnostika"
        : step + 1 < currentTheme.questions.length
        ? `/diagnostika/${theme}-${step + 1}`
        : theme + 1 < questions.length
        ? `/diagnostika/${theme + 1}-0`
        : "/diagnostika/vysledky"
    );
  };

  return (
    <main className="flex flex-col">
      <BackgroundGradient.Radial />
      <section className="bg-white pt-12 lg:pt-20 pb-0">
        <Container className="flex items-center space-x-8">
          <div>
            <Button variant="pagination" onClick={() => navigate("back")}>
              Předešlá otázka
            </Button>
          </div>
          <div className="flex text-text flex-col gap-x-6">
            <div className="mb-6 text-text/60 text-lg font-medium">
              {currentTheme.title} ({step + 1}/{currentTheme.questions.length})
            </div>
            <h2 className="mb-6 text-4xl">
              {typeof currentQuestion === "string" ? currentQuestion : ""}
            </h2>
            <div className="flex space-x-6 mb-4">
              <Button
                className="items-center w-40 py-8"
                onClick={() => click(false)}
              >
                Ne
              </Button>
              <Button
                className="items-center w-40 py-8"
                onClick={() => click(true)}
              >
                Ano
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
