import styled from 'styled-components'

import { MapPin } from '@phosphor-icons/react'

interface LocationTag {
  city: string
  state: string
}

export const LocationTag = ({ city, state }: LocationTag) => {
  // TODO: Find location
  return (
    <LocationTagContainer>
      <span>
        <MapPin size={22} weight="fill" />
        {city}, {state}
      </span>
    </LocationTagContainer>
  )
}

const LocationTagContainer = styled.div`
  padding: 0.625rem 0.5rem;
  border-radius: 8px;

  background: ${(props) => props.theme['--secondary-300']};
  color: ${(props) => props.theme['--secondary-500']};

  > span {
    display: flex;
    align-items: center;

    svg {
      color: ${(props) => props.theme['--secondary-500']};
      margin-right: 0.25rem;
    }
  }
`
