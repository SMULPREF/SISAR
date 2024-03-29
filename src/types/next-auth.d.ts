import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		usuario: {
			id: string
			nome: string
			login: string
			email: string
			permissao: string
			cargo: string
		},
        access_token: string
	}
}