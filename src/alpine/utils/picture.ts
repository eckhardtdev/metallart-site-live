import { getAspectRatioFromString } from '@/utils/asset'
import { getAssetDimensionsFromFilename } from '@/utils/storyblok/asset'

const STORYBLOK_MAX_SIZE = 4000

type FocusPoint =
  | {
      x: string
      y: string
    }
  | undefined

const truncateSize = ({ width, height }, maxSize = STORYBLOK_MAX_SIZE) => {
  let resizeWidth = Math.min(Number(width), maxSize)
  let resizeHeight = Math.min(Number(height), maxSize)

  if (!Number.isNaN(resizeWidth) && resizeWidth > maxSize) {
    console.warn(
      `Width is greater than the maximum allowed size of ${maxSize}px`,
    )
    if (!isNaN(resizeHeight)) {
      resizeHeight = Math.round((resizeHeight / resizeWidth) * maxSize)
    }
    resizeWidth = maxSize
  }

  if (!Number.isNaN(resizeHeight) && resizeHeight > maxSize) {
    console.warn(
      `Height is greater than the maximum allowed size of ${maxSize}px`,
    )
    if (!Number.isNaN(resizeWidth)) {
      resizeWidth = Math.round((resizeWidth / resizeHeight) * maxSize)
    }
    resizeHeight = maxSize
  }

  const size = { width: resizeWidth, height: resizeHeight }

  return size
}

export function getImageSrc({
  image,
  width,
  height,
  aspectRatio,
  widths = [640, 768, 1024, 1366, 1600, 1920, 3840, 5000],
}: {
  image: any
  width?: number
  height?: number
  aspectRatio?: number | string
  widths?: number[]
}) {
  // TODO: Intercept storyblok fetch to calculate width/height for SVGs
  const metaWidth = image?.meta_data?.width
  const metaHeight = image?.meta_data?.height

  let { width: resizeWidth, height: resizeHeight } = truncateSize({
    width,
    height,
  })
  let resizeAspectRatio =
    !Number.isNaN(resizeWidth) && !Number.isNaN(resizeHeight)
      ? resizeWidth / resizeHeight
      : typeof aspectRatio === 'string'
        ? getAspectRatioFromString(aspectRatio) ?? Number(aspectRatio)
        : aspectRatio

  let sortedWidths = widths
    .filter((w) => w <= STORYBLOK_MAX_SIZE)
    .sort((a, b) => a - b)

  if (resizeAspectRatio && resizeAspectRatio < 1) {
    sortedWidths = sortedWidths.filter(
      (w) => w / (resizeAspectRatio ?? 1) <= STORYBLOK_MAX_SIZE,
    )
  }

  if (!sortedWidths || sortedWidths.length === 0) {
    throw new Error(
      `You must provide at least one width for the image. Max size is ${STORYBLOK_MAX_SIZE}px.`,
    )
  }

  // Resizing
  const smallestWidth = Math.ceil(sortedWidths[0])
  const biggestWidth = Math.min(
    Math.ceil(sortedWidths[sortedWidths.length - 1]),
    STORYBLOK_MAX_SIZE,
  )
  let smallestHeight = 0
  let biggestHeight = 0

  if (!Number.isNaN(resizeAspectRatio)) {
    smallestHeight = Math.round(smallestWidth / (resizeAspectRatio ?? 1))
    biggestHeight = Math.round(biggestWidth / (resizeAspectRatio ?? 1))
  }

  // Storyblok Image Service
  const storyblokParams = ['m']
  const storyblokFilters: string[] = []

  const sizeParams = `${biggestWidth}x${biggestHeight}`

  // Smart Cropping
  const { width: originalWidth, height: originalHeight } =
    getAssetDimensionsFromFilename(image.filename)
  let focus: FocusPoint = undefined
  if (image.focus) {
    storyblokFilters.push(`focal(${image?.focus})`)
    const focusPoints = image.focus.split(':').map((coords) => {
      const [x, y] = coords.split('x')
      return { x: parseInt(x), y: parseInt(y) }
    })
    const center = {
      x: Math.round(
        (focusPoints[1].x - focusPoints[0].x) / 2 + focusPoints[0].x,
      ),
      y: Math.round(
        (focusPoints[1].y - focusPoints[0].y) / 2 + focusPoints[0].y,
      ),
    }

    focus = {
      x: ((center.x / (originalWidth ?? 1)) * 100).toFixed(4) + '%',
      y: ((center.y / (originalHeight ?? 1)) * 100).toFixed(4) + '%',
    }
  }
  const filterParam = storyblokFilters.length
    ? `filters:${storyblokFilters.join(':')}`
    : ''

  const storyblokParamString = [
    ...storyblokParams,
    sizeParams,
    'smart',
    filterParam,
  ].join('/')
  const imageSrc = `${image.filename}/${storyblokParamString}`

  return imageSrc
}
