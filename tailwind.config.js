export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 温暖琥珀
        'warm': {
          50: '#FFF8F0',
          100: '#FFEAD5',
          200: '#FDD5A8',
          300: '#FBBF7A',
          400: '#FAA94D',
          500: '#F8931F',  // 主要品牌色
          600: '#E07D10',
          700: '#B8640C',
          800: '#8F4C08',
          900: '#663404',
          950: '#3D1F02',
        },
        // 辅助色 - 宁静蓝灰
        'calm': {
          50: '#F5F7FA',
          100: '#E4E9F0',
          200: '#C9D2E0',
          300: '#AEBACD',
          400: '#93A3BA',
          500: '#788CA7',  // 主要辅助色
          600: '#60718A',
          700: '#48566D',
          800: '#303C50',
          900: '#182233',
          950: '#0B111A',
        },
        // 点缀色 - 治愈薄荷
        'mint': {
          50: '#F0FBF9',
          100: '#D5F5EF',
          200: '#ABEADF',
          300: '#81DFCF',
          400: '#57D4BF',
          500: '#2DC9AF',  // 主要点缀色
          600: '#20A88E',
          700: '#17806D',
          800: '#0F594C',
          900: '#07312A',
          950: '#031916',
        },
        // 暖心色 - 柔粉
        'rose': {
          50: '#FFF5F6',
          100: '#FFE4E6',
          200: '#FEC9CD',
          300: '#FDAEB4',
          400: '#FC939B',
          500: '#FB7882',  // 柔粉色
          600: '#E85A65',
          700: '#CC404A',
          800: '#A62D36',
          900: '#801D24',
          950: '#4D0E13',
        },
        // 中性色 - 暖灰
        'neutral': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#0C0A09',
        }
      },
      // 背景渐变
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #FFF8F0 0%, #FFEAD5 100%)',
        'calm-gradient': 'linear-gradient(135deg, #F5F7FA 0%, #E4E9F0 100%)',
        'hero-gradient': 'linear-gradient(135deg, #FFF8F0 0%, #FDD5A8 50%, #F5F7FA 100%)',
        'card-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #FFF8F0 100%)',
      },
      // 阴影 - 柔和
      boxShadow: {
        'soft': '0 4px 20px rgba(248, 147, 31, 0.10)',
        'soft-lg': '0 8px 40px rgba(248, 147, 31, 0.12)',
        'soft-xl': '0 12px 60px rgba(248, 147, 31, 0.15)',
        'calm': '0 4px 20px rgba(120, 140, 167, 0.10)',
        'warm-card': '0 2px 16px rgba(248, 147, 31, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
      },
      // 圆角
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      // 字体
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}