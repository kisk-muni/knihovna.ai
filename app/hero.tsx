import Button from "@/components/button";

export default function HomeHero() {
  return (
    <section className="">
      <div className="py-8 flex flex-col items-center px-4 mx-auto max-w-screen-lg text-center lg:py-16 z-10 relative">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-5xl dark:text-white  relative flex place-items-center before:absolute before:inset-1/2 before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:inset-1/2 after:-top-12 after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-orange-200 after:via-orange-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <span className="relative z-40">
            Mapujeme roli knihoven <br />
            pro budoucnost práce v éře AI.
          </span>
        </h1>
        <p className="relative z-40 mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Připojte se k našemu newsletteru a dostávejte novinky
          <br /> — o tom, jak může AI pomoci ve vaší kihovně
          <br /> — o nových technologiích, vzdělávacích programech
          <br /> — o dopadu AI na zaměsnanost v ČR a roli knihoven.
        </p>
        <form className="z-40 w-full max-w-lg mx-auto">
          <label
            htmlFor="default-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Email sign-up
          </label>
          <div className="flex gap-4 justify-center">
            <div className="grow relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                type="email"
                id="default-email"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Zadejte sem svůj email"
                required
              />
            </div>
            <Button>Odebírat novinky</Button>
          </div>
        </form>
      </div>
      <div className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  );
}
