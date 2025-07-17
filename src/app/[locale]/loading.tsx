import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 min-h-screen">
      <div className="flex items-center justify-center h-16 mb-8">
        <Skeleton className="h-8 w-48" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-[30vh] w-full rounded-lg" />
        <Skeleton className="h-[30vh] w-full rounded-lg" />
      </div>
      
      <div className="mt-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
