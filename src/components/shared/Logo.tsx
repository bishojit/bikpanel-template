
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BikPanel Lite Logo"
      {...props} // Spread props here to allow width, height, className to be passed
    >
      <path d="M6 10H4C3.46957 10 2.96086 9.78929 2.58579 9.41421C2.21071 9.03914 2 8.53043 2 8V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H20C20.5304 2 21.0391 2.21071 21.4142 2.58579C21.7893 2.96086 22 3.46957 22 4V8C22 8.53043 21.7893 9.03914 21.4142 9.41421C21.0391 9.78929 20.5304 10 20 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 14H4C3.46957 14 2.96086 14.2107 2.58579 14.5858C2.21071 14.9609 2 15.4696 2 16V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V16C22 15.4696 21.7893 14.9609 21.4142 14.5858C21.0391 14.2107 20.5304 14 20 14H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 18H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 6L9 12H15L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
