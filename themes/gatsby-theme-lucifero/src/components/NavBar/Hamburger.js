import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Hamburger = ({ mobileNav, ref }) => {
  const { t } = useTranslation()
  return (
    <IconButton
      className="hamburger"
      display={{ base: 'flex', md: 'none' }}
      aria-label={t('openMenu')}
      variant="ghost"
      icon={<AiOutlineMenu />}
      onClick={mobileNav.onOpen}
      ref={ref}
    />
  )
}

export default Hamburger
