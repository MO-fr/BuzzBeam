"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-opacity duration-500">
        <div className="animate-slide-in">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center animate-slide-in-right">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-grid">
        {/* Platform Distribution Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
            <div className="mt-4 flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demographics Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        {/* Gender Distribution Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
            <div className="mt-4 flex justify-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Posting Times Card */}
      <Card className="animate-slide-up stagger-2 hover-lift">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
          <div className="mt-4">
            <Skeleton className="h-5 w-32" />
            <div className="mt-2 space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full max-w-[600px]" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Engagement Trends Card */}
        <Card className="animate-slide-up stagger-3 hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        {/* Content Performance Card */}
        <Card className="animate-slide-up stagger-4 hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
            <div className="mt-4 flex justify-between">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}