"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="transition-opacity duration-500">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-4 w-96" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 animate-grid">
        {/* Notification Settings */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-72" />
                  </div>
                  <Skeleton className="h-6 w-11" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4">
                <Skeleton className="h-4 w-32" />
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-6 w-11" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-[100px]" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-72" />
                  </div>
                  <Skeleton className="h-6 w-11" />
                </div>
              ))}
              <Skeleton className="h-[1px] w-full" />
              <div className="space-y-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-9 w-[140px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}