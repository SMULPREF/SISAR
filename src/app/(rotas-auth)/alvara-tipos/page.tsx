'use client'

import Content from '@/components/Content';
import { useEffect, useState } from 'react';
import { Button, Table } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as alvaraTipoService from '@/shared/services/alvara-tipo.services';
import { IPaginadoAlvaraTipo, IAlvaraTipo } from '@/shared/services/alvara-tipo.services';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function AlvaraTipos() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [alvaraTipos, setAlvaraTipos] = useState<IAlvaraTipo[]>([]);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(1);
  const [total, setTotal] = useState(1);

  const router = useRouter();

  useEffect(() => {
    alvaraTipoService.buscarTudo()
      .then((response: IPaginadoAlvaraTipo) => {
        setTotal(response.total);
        setPagina(response.pagina);
        setLimite(response.limite);
        setAlvaraTipos(response.data);
      });
  }, []);
  const permissoes = {
    'DEV': { label: 'Desenvolvedor', value: 'DEV', color: 'primary' },
    'SUP': { label: 'Superusuario', value: 'SUP', color: 'info' },
    'ADM': { label: 'Administrador', value: 'ADM', color: 'success' },
    'USR': { label: 'Usário', value: 'USR', color: 'warning' },
  }
  const cargos = {
    'ADM': { label: 'Administrativo', value: 'ADM', color: 'success' },
    'TEC': { label: 'Técnico', value: 'TEC', color: 'warning' },
  }
  return (
    <Content 
      titulo='Tipos de alvará'
      pagina='alvara-tipos'
      breadcrumbs={[{
        label: 'Tipos de alvará',
        href: 'alvara-tipos'
      }]}
    >
      <Table hoverRow>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Admissibilidade</th>
            <th>1ª Análise SMUL</th>
            <th>2ª Análise SMUL</th>
            <th>1ª Análise Múltiplas</th>
            <th>2ª Análise Múltiplas</th>
          </tr>
        </thead>
        <tbody>
          {alvaraTipos && alvaraTipos.map((alvaraTipo) => (
            <tr key={alvaraTipo.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/alvara-tipos/detalhes/${alvaraTipo.id}`)}>
              <td>{alvaraTipo.nome}</td>
              <td>{alvaraTipo.prazo_admissibilidade}</td>
              <td>{alvaraTipo.prazo_analise_smul1}</td>
              <td>{alvaraTipo.prazo_analise_smul2}</td>
              <td>{alvaraTipo.prazo_analise_multi1}</td>
              <td>{alvaraTipo.prazo_analise_multi2}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Fab color='primary' style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Add />
      </Fab>
    </Content>
  );
}