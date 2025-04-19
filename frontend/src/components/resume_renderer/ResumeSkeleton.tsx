import { Skeleton } from "@/components/ui/skeleton";

export function ResumeSkeleton() {
  return (
    <div className="space-y-6 mt-3">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-indigo-500 dark:border-indigo-400 space-y-4"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-1/3 rounded" />
            <Skeleton className="h-4 w-1/4 rounded" />
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-full rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
