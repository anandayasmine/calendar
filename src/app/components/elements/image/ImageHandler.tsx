"use client"
import React from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import RectangleImagePlaceholder from '@/images/placeholder/placeholder-image.png'
import SquareImagePlaceholder from '@/images/placeholder/placeholder-icon.png'
import { Skeleton } from '../loader'
import { Helpers } from '@/app/utils'
import { Config } from '@/app/constant'

export default function CustomImageHandler(props: {
  src?: any;
  width?: any;
  height?: any;
  className?: any;
  alt?: any;
  type?: any;
  disableLoader?: any
}) {



  const {
    src,
    width,
    height,
    className,
    alt,
    type,
    disableLoader,
  } = props

  const isIcon = type == 'icon'



  const sizeImage = !isIcon && 500 //=> if image is from url, this will be used as the width/height compression size

  const [imageSrc, setImageSrc] = React.useState(src)
  const [imagePlaceholderSrc, setImagePlaceholderSrc] = React.useState(SquareImagePlaceholder)
  const [showLoader, setShowLoader] = React.useState(true)
  const [isError, setIsError] = React.useState(false)
  const [refreshElement, setRefreshElement] = React.useState(0)

  const imageRef = React.useRef(null)
  const imagePlaceholderRef = React.useRef(null)



  const mainClassName = 'elements-image-handler'
  const refactorClassName = classnames(
    mainClassName,
    className,
    (type ? 'type-' + type : ''),
    (isError ? 'is-error' : ''),
  )

  const setToImagePlaceholder = () => {

    try {

      let selectedImagePlaceholder = isIcon ? SquareImagePlaceholder : RectangleImagePlaceholder

      if (src?.width && src?.height) {


        if (src?.width == src?.height) {

          selectedImagePlaceholder = SquareImagePlaceholder

        }
        else {

          selectedImagePlaceholder = RectangleImagePlaceholder

        }

      }

      setImagePlaceholderSrc(selectedImagePlaceholder)


    }
    catch (err) {


    }

  }


  React.useEffect(() => {

    try {

      if (((imageSrc != src) && src) || refreshElement < 3) {

        setImageSrc(src)

      }

    }
    catch (err) {


    }



  }, [src, refreshElement, imageSrc])


  React.useEffect(() => {

    try {

      if (imageRef?.current) {

        setShowLoader(false)

      }

    }
    catch (err) {


    }

  }, [])

  return (
    <div
      className={refactorClassName}
    >
      <div
        className={mainClassName + '-content'}
      >

        {
          !disableLoader &&
          <Skeleton
            type='image'
            className={mainClassName + '-skeleton ' + (showLoader ? '' : 'hide')}
          />
        }

        {
          isError ?
            <Image
              ref={imagePlaceholderRef}
              alt={alt || (Config.appName + ' Image')}
              src={imagePlaceholderSrc}
              width={width || imagePlaceholderSrc?.width || sizeImage}
              height={height || imagePlaceholderSrc?.height || sizeImage}

              className={mainClassName + '-image-placeholder'}

              onLoadingComplete={() => {
                setShowLoader(false)

              }}

              onError={(e) => {
                setShowLoader(false)

              }}

            />
            :
            <Image
              ref={imageRef}
              key={Config.appNameVar + '-report-image-' + refreshElement}
              alt={alt || (Config.appName + ' Image')}
              src={imageSrc}
              width={width || imageSrc?.width || sizeImage}
              height={height || imageSrc?.height || sizeImage}

              className={mainClassName + '-image'}

              onLoadingComplete={() => {

                setShowLoader(false)

              }}

              onError={(e) => {

                setShowLoader(false)
                setToImagePlaceholder()
                setIsError(true)

              }}

            />
        }



      </div>

    </div>
  )

}
