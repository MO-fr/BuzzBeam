'use client'

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

export function ImagePreviewDialog({ open, onOpenChange, imageUrl, userName }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <div className="overflow-hidden rounded-lg relative aspect-square">
          <Image
            src={imageUrl}
            alt={`${userName}'s profile picture`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 512px"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
