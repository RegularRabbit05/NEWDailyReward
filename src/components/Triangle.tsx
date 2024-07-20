import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={122}
        height={-102}
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M0 101.258h122.396V0L0 101.258Z"
            clipRule="evenodd"
        />
    </svg>
)
export default SvgComponent
