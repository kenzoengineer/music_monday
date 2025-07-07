const ORDER = ["Souren", "Kevin", "Ken", "Artom", "Andrew"];

const MostRecent = () => {
  const nextMonday = new Date();
  nextMonday.setHours(0, 0, 0, 0);

  // lets check if today is monday?
  const isMonday = nextMonday.getDay() === 1;
  if (!isMonday) {
    nextMonday.setDate(
      nextMonday.getDate() + ((8 - nextMonday.getDay()) % 7 || 7)
    );
  }
  const formattedMonday = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(nextMonday);

  // my "start date", souren judged June 9th.
  const startMonday = 1749441600000;
  const milliDiff = nextMonday.getTime() - startMonday;

  const daysDiff = Math.floor(milliDiff / (1000 * 60 * 60 * 24));
  const weeksDiff = daysDiff / 7;
  const nextJudgeIdx = weeksDiff % ORDER.length;

  return (
    <section className="flex max-md:flex-col gap-10 items-center mb-5">
      <div className="">
        <h2 className="text-md">Upcoming Music Monday</h2>
        <p className="text-2xl font-bold flex items-center">
          {formattedMonday} (#{weeksDiff + 21}){" "}
          {isMonday && (
            <span className="text-xs m-auto text-yellow-300">today!</span>
          )}
        </p>
      </div>
      <div className="">
        <h2 className="text-md">{isMonday ? "Today's" : "Upcoming"} Judge</h2>
        <div className="flex">
          {ORDER.map((x, i) => {
            return (
              <p
                className={`text-2xl mr-4 ${
                  i === nextJudgeIdx ? "font-bold" : "text-zinc-700"
                }`}
                key={i}
              >
                {x}
              </p>
            );
          })}
        </div>
      </div>
      <div className="m-auto"></div>
    </section>
  );
};

export default MostRecent;
