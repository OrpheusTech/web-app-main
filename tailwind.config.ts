
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			backgroundSize: {
				'200%': '200% 100%',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'hero-title-fade': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				'phrase-cycle': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px) translateX(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) translateX(0)'
					}
				},
				'button-glow': {
					'0%, 100%': {
						boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)'
					},
					'50%': {
						boxShadow: '0 8px 30px rgba(34, 197, 94, 0.4)'
					}
				},
				'pill-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'nav-underline': {
					'0%': {
						width: '0',
						opacity: '0'
					},
					'100%': {
						width: '75%',
						opacity: '1'
					}
				},
				'mobile-slide': {
					'0%': {
						transform: 'translateY(-15px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'phrase-pop-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px) scale(0.8) rotateX(20deg)',
						filter: 'blur(10px)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'translateY(-5px) scale(1.05) rotateX(-5deg)',
						filter: 'blur(2px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0px) scale(1) rotateX(0deg)',
						filter: 'blur(0px)'
					}
				},
				'phrase-glow': {
					'0%, 100%': {
						textShadow: '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2), 0 4px 20px rgba(0, 0, 0, 0.9)'
					},
					'50%': {
						textShadow: '0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4), 0 4px 20px rgba(0, 0, 0, 0.9)'
					}
				},
				'dot-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)'
					},
					'50%': {
						transform: 'scale(1.2)',
						boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)'
					}
				},
				'phrase-spring-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px) scale(0.9)',
						filter: 'blur(8px)'
					},
					'60%': {
						opacity: '0.8',
						transform: 'translateY(-8px) scale(1.02)',
						filter: 'blur(2px)'
					},
					'80%': {
						opacity: '0.95',
						transform: 'translateY(2px) scale(0.98)',
						filter: 'blur(1px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0px) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'char-bounce-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px) scale(0.8)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'translateY(-5px) scale(1.1)'
					},
					'70%': {
						opacity: '0.95',
						transform: 'translateY(2px) scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0px) scale(1)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.6',
						transform: 'scale(1.05)'
					}
				},
				'shimmer-sweep': {
					'0%': {
						backgroundPosition: '-200% center',
						opacity: '0'
					},
					'30%': {
						opacity: '1'
					},
					'70%': {
						opacity: '1'
					},
					'100%': {
						backgroundPosition: '200% center',
						opacity: '0'
					}
				},
				'orb-float': {
					'0%, 100%': {
						transform: 'translateY(0px) scale(1)'
					},
					'33%': {
						transform: 'translateY(-10px) scale(1.02)'
					},
					'66%': {
						transform: 'translateY(5px) scale(0.98)'
					}
				},
				'dot-spring': {
					'0%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.3)'
					},
					'70%': {
						transform: 'scale(1.1)'
					},
					'100%': {
						transform: 'scale(1.25)'
					}
				},
				bounceXCentered: {
					'0%, 100%': { transform: 'translateX(-50%) translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
					'50%': { transform: 'translateX(-50%) translateY(0)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'text': 'shimmer 6s ease-in-out infinite',
				'hero-title-fade': 'hero-title-fade 1s ease-out',
				'phrase-cycle': 'phrase-cycle 0.7s ease-in-out',
				'button-glow': 'button-glow 2s ease-in-out infinite',
				'pill-float': 'pill-float 3s ease-in-out infinite',
				'nav-underline': 'nav-underline 0.3s ease-out',
				'mobile-slide': 'mobile-slide 0.3s ease-out',
				'phrase-pop-in': 'phrase-pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'phrase-glow': 'phrase-glow 3s ease-in-out infinite',
				'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
				'phrase-spring-in': 'phrase-spring-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'char-bounce-in': 'char-bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'shimmer-sweep': 'shimmer-sweep 2.5s ease-in-out infinite',
				'orb-float': 'orb-float 6s ease-in-out infinite',
				'dot-spring': 'dot-spring 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'bounce-centered': 'bounceXCentered 1s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
