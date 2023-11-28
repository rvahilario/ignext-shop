import { styled } from '..'

export const ProductContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'stretch',
  height: 93,

  '& div:last-child': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 15,
    height: '100%',

    h3: {
      fontWeight: 'normal',
      fontSize: '$md',
    },

    button: {
      backgroundColor: 'transparent',
      border: 0,
      cursor: 'pointer',
      textAlign: 'left',
      color: '$green300',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
})

export const ImageContainer = styled('div', {
  height: '100%',
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,

  img: {
    objectFit: 'cover',
  },
})
