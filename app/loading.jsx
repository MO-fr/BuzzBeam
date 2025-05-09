"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in transform-gpu">
      {/* Header Section */}
      <div className="transition-opacity duration-500">
        <Skeleton className="h-8 w-48 animate-pulse" />
        <Skeleton className="mt-2 h-4 w-96 animate-pulse" />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="hover-lift transform-gpu">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px] animate-pulse" />
              <Skeleton className="h-4 w-4 animate-pulse" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[120px] animate-pulse" />
              <Skeleton className="mt-2 h-3 w-[80px] animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="hover-lift transform-gpu">
            <CardHeader>
              <Skeleton className={`h-5 w-[180px] animate-pulse stagger-${i + 1}`} />
              <Skeleton className={`h-4 w-[250px] animate-pulse stagger-${i + 1}`} />
            </CardHeader>
            <CardContent>
              <Skeleton className={`h-[200px] w-full animate-pulse stagger-${i + 1}`} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}