import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-width: 24rem;
  min-height: 32rem;

  padding: 1.6rem 3.2rem 0.8rem;
  margin-bottom: 2.4rem;

  position: relative;
  z-index: 99;

  > span {
    margin-top: 1.8rem;

    > a {
      color: ${(props) => props.theme['--secondary-500']};
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px;
    padding: 1px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme['--primary-500']},
      ${(props) => props.theme['--secondary-500']}
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2.4rem;

  > h1 {
    margin-bottom: 2.4rem;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  width: 18rem;

  margin-bottom: 1.8rem;
`
