'use client'
 
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')

  useEffect(() => {
    if (!error) {
      router.replace('/auth/login')
    }
  }, [error, router])

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please try again later.'
      case 'AccessDenied':
        return 'Access denied. You may not have permission to sign in.'
      case 'Verification':
        return 'The verification failed. Please try signing in again.'
      default:
        return 'An error occurred during authentication. Please try again.'
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error ? getErrorMessage(error) : 'An unknown error occurred'}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => router.push('/auth/login')}>
              Return to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
