import classnames from 'classnames'
import Link from 'next/link'

export default function LinkWrapper(props: { data?: any; id?: any; value?: any; theme?: any; className?: any; href?: any; target?: any; handleClick?: any; children?: any }) {

  const {
    data,
    theme,
    className,
    href,
    target,
    handleClick,
    children
  } = props

  const _href = href || data?.href || ''
  const _handleClick = handleClick || data?.handleClick
  const _target = target || data?.target || ''

  const isLinkOn = _href || _handleClick


  const _className =
    classnames(
      'element-link-wrapper',
      className,
      data?.theme,
      theme,
      (isLinkOn ? 'link-on' : '')
    )



  return (
    <>
      {
        children &&
        <div className={_className}>
          {
            isLinkOn
              ?
              <Link
                href={_href}
                target={_target}
                onClick={(e) => {

                  if (!_href && _handleClick) {

                    e?.preventDefault()

                    const value =
                      props?.data?.id ||
                      props?.data?.value ||
                      props?.id ||
                      props?.value ||
                      null

                    _handleClick(value)

                  }

                }}
              >
                {
                  children
                }
              </Link>
              :
              children
          }
        </div>
      }
    </>
  )

}