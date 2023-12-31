import { styled } from ".."

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: '100vw',
  marginLeft: 'auto',
  minHeight: 656
})

export const ProductContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  img: {
    objectFit: 'cover'
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300'
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})

export const NavigationWrapper = styled('div', {
  position: 'relative',
})

export const ArrowSVG = styled('svg', {
  width: '30px',
  height: '30px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  WebkitTransform: 'translateY(-50%)',
  fill: '#fff',
  cursor: 'pointer',

  "&.arrow--left": {
    left: "5px",
  },

  "&.arrow--right": {
    left: "auto",
    right: "5px",
  },

  "&.arrow--disabled": {
    fill: "rgba(255, 255, 255, 0.5)",
  }
})

