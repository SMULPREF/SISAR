'use client'

import Content from "@/components/Content";
import { useEffect, useState } from "react";
import * as alvaraTiposService from "@/shared/services/alvara-tipo.services";
import { IAlvaraTipo } from "@/shared/services/alvara-tipo.services";
import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Input, Option, Select, Stack } from "@mui/joy";
import { useRouter } from "next/navigation";

export default function AlvaraTipoDetalhes(props: any) {
    const { id } = props.params;
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [prazo_admissibilidade, setPrazo_admissibilidade] = useState(0);
    const [prazo_analise_smul1, setPrazo_analise_smul1] = useState(0);
    const [prazo_analise_smul2, setPrazo_analise_smul2] = useState(0);
    const [prazo_analise_multi1, setPrazo_analise_multi1] = useState(0);
    const [prazo_analise_multi2, setPrazo_analise_multi2] = useState(0);
    const [status, setStatus] = useState(true);


    useEffect(() => {
        if (id) {
            alvaraTiposService.buscarPorId(id)
                .then((response: IAlvaraTipo) => {
                    setNome(response.nome);
                });
        }
    }, [ id ]);

    const enviaDados = () => {
        if (id) {
            alvaraTiposService.atualizar(id, { nome, prazo_admissibilidade, prazo_analise_smul1, prazo_analise_smul2, prazo_analise_multi1, prazo_analise_multi2, status })
                .then(() => {
                    router.push('/alvara-tipos');
                });
        } else {
            alvaraTiposService.criar({ nome, prazo_admissibilidade, prazo_analise_smul1, prazo_analise_smul2, prazo_analise_multi1, prazo_analise_multi2, status })
                .then(() => {
                    router.push('/alvara-tipos');
                });
        }
    }
    return (
        <Content
            breadcrumbs={[
                { label: 'Tipos de alvará', href: '/alvara-tipos' },
                { label: 'Detalhes', href: '/alvara-tipos/detalhes/' + id && id },
            ]}
            titulo={id ? nome ? nome : 'Detalhes' : 'Novo'}
            pagina="alvara-tipos"
        >
            <Box
                sx={{
                    display: 'flex',
                    mx: 'auto',
                    width: '90%',
                    maxWidth: 800,
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card sx={{ width: '100%' }}>
                    <Stack spacing={2} >
                        <Stack>
                            <FormControl>
                                <FormLabel>Nome</FormLabel>
                                <Input 
                                    placeholder="Nome" 
                                    value={nome} 
                                    onChange={e => setNome(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>Prazo de admissibilidade</FormLabel>
                                <Input 
                                    placeholder="Prazo de admissibilidade" 
                                    value={prazo_admissibilidade}
                                    type="number"
                                    onChange={e => setPrazo_admissibilidade(parseInt(e.target.value))}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>1ª Análise SMUL</FormLabel>
                                <Input 
                                    placeholder="1ª Análise SMUL" 
                                    value={prazo_analise_smul1}
                                    type="number"
                                    onChange={e => setPrazo_analise_smul1(parseInt(e.target.value))}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>2ª Análise SMUL</FormLabel>
                                <Input 
                                    placeholder="2ª Análise SMUL" 
                                    value={prazo_analise_smul2}
                                    type="number"
                                    onChange={e => setPrazo_analise_smul2(parseInt(e.target.value))}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>1ª Análise Múltiplas</FormLabel>
                                <Input 
                                    placeholder="1ª Análise Múltiplas" 
                                    value={prazo_analise_multi1}
                                    type="number"
                                    onChange={e => setPrazo_analise_multi1(parseInt(e.target.value))}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>2ª Análise Múltiplas</FormLabel>
                                <Input 
                                    placeholder="2 Análise Múltiplas" 
                                    value={prazo_analise_multi2}
                                    type="number"
                                    onChange={e => setPrazo_analise_multi2(parseInt(e.target.value))}
                                />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Stack>
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <Select value={status} onChange={(_,v) => setStatus(v ? v : true)}>
                                    <Option value={true}>Ativo</Option>
                                    <Option value={false}>Inativo</Option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                            Cancelar
                        </Button>
                        <Button size="sm" variant="solid" onClick={enviaDados}>
                            Salvar
                        </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Box>
        </Content>
    );
}
