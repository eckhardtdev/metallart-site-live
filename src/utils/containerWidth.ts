type ContainerWidtOptions = {
  side?: 'left' | 'right'
  defaultWidth?: string
}

export const containerWidth = (
  width: string,
  options?: ContainerWidtOptions,
) => {
  const { side, defaultWidth = 'content' } = options ?? {
    defaultWidth: 'content',
    breakpoint: 'md',
  }

  switch (width ?? defaultWidth) {
    case 'content':
      return side
        ? side === 'left'
          ? 'area-content md:area-content-left'
          : 'area-content md:area-content-right'
        : 'area-content'
    case 'wide':
      return side
        ? side === 'left'
          ? 'area-wide md:area-wide-left'
          : 'area-wide md:area-wide-right'
        : 'area-wide'
    case 'full':
      return side
        ? side === 'left'
          ? 'area-full md:area-full-left'
          : 'area-full md:area-full-right'
        : 'area-full'
    default:
      return ''
  }
}
