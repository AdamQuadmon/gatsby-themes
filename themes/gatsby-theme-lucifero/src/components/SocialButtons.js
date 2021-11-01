import React from 'react'
import { IconButton, Stack, Link } from '@chakra-ui/react'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'

const SocialButtons = ({ socials }) => {
  const { whatsapp, instagram, facebook } = socials
  // const buttonSize = { base: 'sm', md: 'xs' }
  // const buttonSize = { base: 'sm', md: 'xs' }
  const buttonSize = 'sm'
  return (
    <Stack direction={'row'} spacing={3}>
      <IconButton
        as={Link}
        href={`https://wa.me/${whatsapp}`}
        isExternal
        colorScheme="whatsapp"
        size={buttonSize}
        aria-label={'WhatsApp'}
        icon={<FaWhatsapp />}
      />

      <IconButton
        as={Link}
        href={`https://instagram.com/${instagram}`}
        isExternal
        colorScheme="red"
        size={buttonSize}
        aria-label={'Instagram'}
        icon={<FaInstagram />}
      />

      <IconButton
        as={Link}
        href={`https://facebook.com/${facebook}`}
        isExternal
        colorScheme="facebook"
        size={buttonSize}
        aria-label={'Facebook'}
        icon={<FaFacebook />}
      />
    </Stack>
  )
}

export default SocialButtons
