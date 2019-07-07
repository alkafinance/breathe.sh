declare module '*.svg' {
  import React from 'react'

  interface IconProps extends React.SVGProps<SVGSVGElement> {}

  class Icon extends React.Component<IconProps> {}

  export default Icon
}
