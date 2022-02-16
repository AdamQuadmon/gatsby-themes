import React from 'react'
import { IconButton, Stack, Link } from '@chakra-ui/react'
// import { LinkExternal } from './Link'
import { FaHome, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'

const SocialButtons = ({ socials, children, size }) => {
  const { whatsapp, cell, instagram, facebook, web } = socials
  const tel = whatsapp || cell

  return (
    <Stack direction={'row'} spacing={3}>
      {children}
      {web && (
        <IconButton
          as={Link}
          isExternal
          size={size}
          href={web}
          colorScheme="orange"
          aria-label={'WWW'}
          icon={<FaHome />}
        />
      )}
      {tel && (
        <IconButton
          as={Link}
          isExternal
          size={size}
          href={`https://wa.me/${tel}`}
          colorScheme="whatsapp"
          aria-label={'WhatsApp'}
          icon={<FaWhatsapp />}
        />
      )}

      {instagram && (
        <IconButton
          as={Link}
          isExternal
          size={size}
          href={`https://instagram.com/${instagram}`}
          colorScheme="red"
          aria-label={'Instagram'}
          icon={<FaInstagram />}
        />
      )}

      {facebook && (
        <IconButton
          as={Link}
          isExternal
          size={size}
          href={`https://facebook.com/${facebook}`}
          colorScheme="facebook"
          aria-label={'Facebook'}
          icon={<FaFacebook />}
        />
      )}
    </Stack>
  )
}

export default SocialButtons

SocialButtons.defaultProps = {
  size: 'sm',
}
