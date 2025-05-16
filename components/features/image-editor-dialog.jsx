'use client'

import { useState, useRef, useEffect } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import imageCompression from 'browser-image-compression'
import 'react-image-crop/dist/ReactCrop.css'
import Image from "next/image"

const ASPECT_RATIO = 1
const MIN_DIMENSION = 200

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function ImageEditorDialog({ open, onOpenChange, imageFile, onSave }) {
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState()
  const [quality, setQuality] = useState([80])
  const imgRef = useRef(null)
    // Load image when file changes
  useEffect(() => {
    if (!imageFile) return
    const reader = new FileReader()
    reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''))
    reader.readAsDataURL(imageFile)
  }, [imageFile])

  function onImageLoad(e) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, ASPECT_RATIO))
  }

  async function handleSave() {
    if (!imgRef.current || !crop) return

    // Create canvas for cropping
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height

    canvas.width = MIN_DIMENSION
    canvas.height = MIN_DIMENSION

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      MIN_DIMENSION,
      MIN_DIMENSION
    )

    // Convert to Blob
    canvas.toBlob(async (blob) => {
      if (!blob) return

      // Compress the image
      const compressedFile = await imageCompression(blob, {
        maxSizeMB: 1,
        maxWidthOrHeight: MIN_DIMENSION,
        useWebWorker: true,
        quality: quality[0] / 100
      })

      // Convert compressed blob to data URL
      const reader = new FileReader()
      reader.readAsDataURL(compressedFile)
      reader.onloadend = () => {
        onSave(reader.result)
        onOpenChange(false)
      }
    }, 'image/jpeg')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {imgSrc && (
            <div className="overflow-hidden rounded-lg">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <Image
                  ref={imgRef}
                  alt="Profile picture"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-h-[600px] w-auto"
                  layout="responsive"
                  width={MIN_DIMENSION}
                  height={MIN_DIMENSION}
                />
              </ReactCrop>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Image Quality: {quality}%</label>
            <Slider
              value={quality}
              onValueChange={setQuality}
              min={20}
              max={100}
              step={1}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
