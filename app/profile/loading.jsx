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
        {/* Personal Information Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-56" />
              </div>
              <Skeleton className="h-9 w-[120px]" />
            </div>

            <Skeleton className="my-6 h-[1px] w-full" />

            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connected Accounts Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <Skeleton className="h-9 w-[100px]" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Preferences Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
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

        {/* Security Card */}
        <Card className="hover-lift">
          <CardHeader>
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="grid gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <Skeleton className="h-9 w-[140px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}