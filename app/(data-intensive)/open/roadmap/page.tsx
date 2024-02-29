import { getThemes } from "@/app/actions";
import { cache } from "react";

const loadThemes = cache(async () => {
  return await getThemes();
});

export default async function RoadmapPage() {
  const data = await loadThemes();
  return (
    <>
      <div className="text-text">
        <div>
          {data.map((theme, t) => (
            <div key={t}>
              <h2>{theme.name}</h2>
              <div>
                {theme.epics.map((epic, e) => (
                  <div key={e} className="ml-6">
                    <h3>{epic.epic.name}</h3>
                    <div>
                      {epic.epic.todos.map((todoRelation, to) => {
                        const todo = todoRelation.todo;
                        return (
                          <div key={to} className="ml-6">
                            <h4>{todo.name}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
