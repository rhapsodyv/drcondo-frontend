const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* ── JollyUI / shadcn compat ───────────────────────────── */
        border:     "var(--border)",
        input:      "var(--input)",
        ring:       "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT:    "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT:    "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT:    "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT:    "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT:    "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT:    "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT:    "var(--card)",
          foreground: "var(--card-foreground)",
        },

        /* ── Design system — superfícies ───────────────────────── */
        surface: {
          DEFAULT:   "var(--bg-surface)",
          app:       "var(--bg-app)",
          subtle:    "var(--bg-subtle)",
          ui:        "var(--bg-ui)",
          "ui-hover":   "var(--bg-ui-hover)",
          "ui-active":  "var(--bg-ui-active)",
          raised:    "var(--bg-surface-raised)",
          overlay:   "var(--bg-overlay)",
        },

        /* ── Design system — marca ─────────────────────────────── */
        brand: {
          DEFAULT:    "var(--brand-solid)",
          hover:      "var(--brand-solid-hover)",
          subtle:     "var(--brand-subtle)",
          ui:         "var(--brand-ui)",
          border:     "var(--brand-border)",
          text:       "var(--brand-text)",
          foreground: "var(--brand-foreground)",
        },

        /* ── Design system — status ────────────────────────────── */
        error: {
          DEFAULT:    "var(--error-solid)",
          bg:         "var(--error-bg)",
          border:     "var(--error-border)",
          text:       "var(--error-text)",
          foreground: "var(--error-foreground)",
        },
        success: {
          DEFAULT:    "var(--success-solid)",
          bg:         "var(--success-bg)",
          border:     "var(--success-border)",
          text:       "var(--success-text)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT:    "var(--warning-solid)",
          bg:         "var(--warning-bg)",
          border:     "var(--warning-border)",
          text:       "var(--warning-text)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT:    "var(--info-solid)",
          bg:         "var(--info-bg)",
          border:     "var(--info-border)",
          text:       "var(--info-text)",
          foreground: "var(--info-foreground)",
        },
      },

      /* ── Raio ──────────────────────────────────────────────── */
      borderRadius: {
        none:    "var(--radius-none)",
        sm:      "var(--radius-sm)",    /*  4px */
        DEFAULT: "var(--radius-md)",    /*  6px */
        md:      "var(--radius-md)",    /*  6px */
        lg:      "var(--radius-lg)",    /*  8px — padrão dos componentes */
        xl:      "var(--radius-xl)",    /* 12px */
        "2xl":   "var(--radius-2xl)",   /* 16px */
        "3xl":   "var(--radius-3xl)",   /* 24px */
        full:    "var(--radius-full)",
      },

      /* ── Sombras ───────────────────────────────────────────── */
      boxShadow: {
        xs:      "var(--shadow-xs)",
        sm:      "var(--shadow-sm)",
        DEFAULT: "var(--shadow-sm)",
        md:      "var(--shadow-md)",
        lg:      "var(--shadow-lg)",
        xl:      "var(--shadow-xl)",
        "2xl":   "var(--shadow-2xl)",
        inner:   "var(--shadow-inner)",
        none:    "none",
      },

      /* ── Tipografia ────────────────────────────────────────── */
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },

      /* ── Animação / easing ─────────────────────────────────── */
      transitionTimingFunction: {
        spring:  "var(--ease-spring)",
        bounce:  "var(--ease-bounce)",
        elastic: "var(--ease-elastic)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
