import { FieldLoader, type LoaderTopic } from "./FieldLoader";

/** What a place page shows while its forecast, climate and records are read: the flight scene and what is being read, then the page's shape. */
function Bar({ className = "" }: { className?: string }) {
  return <div className={`bg-line rounded ${className}`} />;
}

export function PlaceSkeleton({ topic = "guide" }: { topic?: LoaderTopic }) {
  return (
    <div
      className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12"
      aria-busy="true"
    >
      <FieldLoader topic={topic} />
      <div className="animate-pulse" aria-hidden="true">
        <div className="mt-8 flex flex-wrap gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Bar key={i} className="h-9 w-28 rounded-full bg-line/70" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card px-4 py-3">
              <Bar className="h-2.5 w-14 bg-line/70" />
              <Bar className="mt-2.5 h-5 w-24" />
            </div>
          ))}
        </div>
        <Bar className="mt-8 h-24 w-full rounded-tile bg-line/50" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="card overflow-hidden">
              <Bar className="h-40 w-full rounded-none bg-line/60" />
              <div className="p-4">
                <Bar className="h-4 w-2/3" />
                <Bar className="mt-2.5 h-3 w-1/2 bg-line/70" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 card p-8">
          <Bar className="h-3 w-24" />
          <Bar className="mt-3 h-7 w-2/3" />
          <div className="mt-6 space-y-3">
            <Bar className="h-4 w-full bg-line/70" />
            <Bar className="h-4 w-5/6 bg-line/70" />
            <Bar className="h-4 w-4/6 bg-line/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
