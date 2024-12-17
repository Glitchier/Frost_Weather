import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {	
  	extend: {
		screens:{
			'tablet': '934px',			
		},
  		fontFamily: {
  			Montserrat: 'Montserrat',
			Nunito:"Nunito",
  		},
  		colors: {
  			glassBgColor: 'rgba(var(--glassBgColor))',
  			glassBorderColor: 'rgba(var(--glassBorderColor))',
			blobColor1:"rgba(var(--bgBlobColor1))",
			blobColor2:"rgba(var(--bgBlobColor2))",
			blobColor3:"rgba(var(--bgBlobColor3))",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',			
			AQI_Green:"#00E400",
			AQI_Yellow:"#FFFF00",
			AQI_Orange:"#FF7E00",
			AQI_Red:"#FF0000",
			AQI_Purple:"#7925C7",
			AQI_Maron:"#7E0023",
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			blob: 'blob 7s ease-in-out infinite'
  		},
  		keyframes: {
  			blob: {
  				'0%': {
  					transform: 'translate(0px,0px) scale(1)'
  				},
  				'33%': {
  					transform: 'translate(50px,-80px) scale(1.05)'
  				},
  				'66%': {
  					transform: 'translate(-50px,-80px) scale(0.98)'
  				},
  				'100%': {
  					transform: 'translate(0px,0px) scale(1)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
