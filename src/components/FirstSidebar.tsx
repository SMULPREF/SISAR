import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Tooltip, GlobalStyles, List, ListItemButton, Sheet, IconButton, Button, Typography, Stack, Snackbar } from '@mui/joy';
import { Close, Logout, Menu, Person } from '@mui/icons-material';

import iconLogo from '@/assets/sis-icon.png';
import { MenuContext } from '@/shared/contexts/MenuContext';
import { getSession, signOut } from 'next-auth/react';
import { UsuarioToken } from '@/shared/interfaces/usuario-token';
import { useRouter } from 'next/navigation';

export default function FirstSidebar() {
  useEffect(() => {
    getSession().catch((error) => console.log(error)).then((session) => {
      if (session) setUsuario(session.usuario);
    });    
  }, []);
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioToken>();
  const [open, setOpen] = useState(false);
  const { sidebarStatus, toggleSidebar } = useContext(MenuContext);

  return (
    <Sheet
      className="FirstSidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s',
        zIndex: 100,
        height: '100dvh',
        width: 'var(--FirstSidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles styles={{ ':root': { '--FirstSidebar-width': '68px' }}} />
      <Snackbar
        variant="solid"
        color="primary"
        size="lg"
        invertedColors
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">Você está saindo.</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">Tem certeza de que deseja sair?</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => {
              signOut({ redirect: false });
              router.replace('/login');
              setOpen(false);
            }}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpen(false)}
            >
              Não
            </Button>
          </Stack>
        </div>
      </Snackbar>
      <List size="sm" sx={{ '--ListItem-radius': '6px', '--List-gap': '8px' }}>
        <ListItemButton 
          sx={{
            p: 1,
            borderRadius: 6,
            display: { xs: 'flex', lg: 'none' },
          }}
          onClick={() => toggleSidebar()}
        >
          {sidebarStatus ? <Menu sx={{ fontSize: 24 }} /> : <Close sx={{ fontSize: 24 }} />}
        </ListItemButton>
        <ListItemButton sx={{ p: 1, borderRadius: 6, mt: { lg: 0 }}} component="a" href="/">
          <Image src={iconLogo} height={24} alt="icon-logo" />
        </ListItemButton>
      </List>
      <Tooltip title='Sair' arrow placement="top">
        <IconButton color="danger" onClick={() => setOpen(true)}>
          <Logout />
        </IconButton>
      </Tooltip>
    </Sheet>
  );
}
