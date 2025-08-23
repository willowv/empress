import * as React from 'react'
import { SVGProps } from 'react'
const Person = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 400 400"
        {...props}
    >
        <style />
        <path
            id="svg_2"
            d="M202 19.25c-58.02 0-105.22 47.2-105.22 105.22S143.98 229.69 202 229.69s105.22-47.2 105.22-105.22S260.02 19.25 202 19.25z"
        />
        <path
            id="svg_3"
            d="M376.03 389.81v-67.39c0-17.23-6.82-32.62-19.72-44.5-11.07-10.2-26.1-17.36-43.46-20.72-28.56-5.52-69.55-9.06-109.64-9.48-45.01-.47-84.99 2.94-112.59 9.59-17.34 4.18-32.11 11.44-42.72 21.01-13.03 11.74-19.92 26.99-19.92 44.09v67.39l348.05.01z"
        />
    </svg>
)
export default Person
