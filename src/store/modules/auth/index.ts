import router from '@/router/index'
import Cookies from 'js-cookie'
import { decodeJwt, JWTPayload } from 'jose'

type HashParams = {
  accessToken: string
  tokenType: string
  idToken: string
  state: string
}

type CookiesAuth = Omit<HashParams, 'state'>

type DecodedToken = {
  decodedAccessToken: JWTPayload | null;
  decodedIdToken: JWTPayload | null
}

type TokenCookie = {
  token: string
  cookie: string
}

export default {
  namespaced: true,

  state: (): any => ({
  }),

  actions: {
    async logout ({ dispatch }: any) {
      const result = await dispatch('makeLogoutUrl')
      dispatch('removeCookiesAuth')
      window.location.href = result
    },

    makeLogoutUrl (): string {
      const params = new URLSearchParams({
        id_token_hint: Cookies.get('id_token') as string,
        post_logout_redirect_uri: 'http://localhost:8081/login'
      })

      return `http://localhost:8080/realms/code-flix/protocol/openid-connect/logout?${params}`
    },

    makeSignInUrl (): string {
      const nonce: string = Math.random().toString(36)
      const state: string = Math.random().toString(36)

      Cookies.set('nonce', nonce)
      Cookies.set('state', state)

      const params = new URLSearchParams({
        client_id: 'code-flix-client',
        redirect_uri: 'http://localhost:8081/callback',
        response_type: 'token id_token code',
        scope: 'openid',
        nonce: nonce,
        state: state
      })

      return `http://localhost:8080/realms/code-flix/protocol/openid-connect/auth?${params}`
    },

    async redirectToKeycloak ({ dispatch }: any): Promise<void> {
      const result = await dispatch('makeSignInUrl')
      window.location.href = result
    },

    async validAccessToken ({ dispatch }: any, hash: string): Promise<void> {
      const { accessToken, idToken, state, tokenType } = await dispatch('getHashParams', hash)
      dispatch('redirectIdDoNotHaveTokens', { accessToken, idToken, state, tokenType })
      dispatch('redirectIfTokenDoNotHaveCookie', { cookie: 'state', token: state })

      try {
        const { decodedAccessToken, decodedIdToken } = await dispatch('decodedToken', { accessToken, idToken })

        dispatch('redirectIfTokenDoNotHaveCookie', { cookie: 'nonce', token: decodedAccessToken?.nonce })
        dispatch('redirectIfTokenDoNotHaveCookie', { cookie: 'state', token: decodedIdToken?.nonce })

        dispatch('addCookiesAuth', { accessToken, idToken, tokenType })
      } catch (e) {
        dispatch('removeCookiesAuth')
        dispatch('redirectToSignIn')
      }
    },

    getHashParams (_: any, hash: string): HashParams {
      const searchParams: URLSearchParams = new URLSearchParams(hash.replace('#', ''))
      const accessToken: string = searchParams.get('access_token') as string
      const tokenType: string = searchParams.get('token_type') as string
      const idToken: string = searchParams.get('id_token') as string
      const state: string = searchParams.get('state') as string

      return { accessToken, tokenType, idToken, state }
    },

    redirectIdDoNotHaveTokens ({ dispatch }: any, { accessToken, idToken, state, tokenType }: HashParams): void {
      if (!accessToken || !idToken || !state || !tokenType) {
        dispatch('redirectToSignIn')
      }
    },

    redirectToSignIn (): void {
      router.push({ name: 'sign-in' })
    },

    redirectIfTokenDoNotHaveCookie ({ dispatch }: any, { cookie, token }: TokenCookie): void {
      if (Cookies.get(cookie) as string !== token) {
        dispatch('removeCookiesAuth')
        dispatch('redirectToSignIn')
      }
    },

    removeCookiesAuth (): void {
      Cookies.remove('access_token')
      Cookies.remove('token_type')
      Cookies.remove('id_token')
    },

    addCookiesAuth (_: any, { accessToken, tokenType, idToken }: CookiesAuth): void {
      Cookies.set('access_token', accessToken)
      Cookies.set('token_type', tokenType)
      Cookies.set('id_token', idToken)
    },

    decodedToken (_: any, { accessToken, idToken }: CookiesAuth): DecodedToken {
      let decodedAccessToken: JWTPayload | null = null
      let decodedIdToken: JWTPayload | null = null

      try {
        decodedAccessToken = decodeJwt(accessToken)
        decodedIdToken = decodeJwt(idToken)

        return {
          decodedAccessToken,
          decodedIdToken
        }
      } catch (e) {
        throw new Error('Invalid decoded token')
      }
    }
  },

  mutations: {
  }
}
