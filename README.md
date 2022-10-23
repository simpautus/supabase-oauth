# Remix + Supabase OAuth problem demo

- [Remix Docs](https://remix.run/docs)
- [Supabase Docs](https://supabase.com/docs)

I'm experiencing an issue where Supabase [onAuthStateChange](https://supabase.com/docs/reference/javascript/auth-onauthstatechange) SIGNED_IN event sometimes fires and sometimes doesn't after a successful OAuth login. When it doesn't fire automatically it will once I visit another browser tab and come back to app. Then it reloads the page and the SIGNED_IN event is fired.

## Development

[Setup](https://supabase.com/docs/guides/auth/auth-github) Github authentication for your Supabase environment and put your Supabase credentials in .env

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.
