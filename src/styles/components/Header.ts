import { styled } from ".."

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  '> button': {
    padding: 10,
    height: '3rem',
    width: '3rem',
    fontSize: '1.5rem',
    lineHeight: 0,
    cursor: 'pointer',
    backgroundColor: '$gray800',
    color: '$white',
    border: 0,
    borderRadius: 6,
    position: 'relative',

    span: {
      position: 'absolute',
      fontSize: '0.875rem',
      top: -6,
      borderRadius: '50%',
      border: '2px solid $gray900',
      backgroundColor: '$green300',
      padding: 6,
      lineHeight: 0.7,
      textAlign: 'center',
      fontWeight: 700,
    },
  },
})
