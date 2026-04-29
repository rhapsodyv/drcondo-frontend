import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JollyTextField } from '@/components/ui/textfield';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    login();
    navigate('/', { replace: true });
  }

  return (
    <div className="min-h-screen flex">
      {/* Brand panel — visível em telas grandes */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 text-white"
        style={{ background: 'linear-gradient(160deg, var(--brown-9) 0%, var(--brown-11) 100%)' }}
      >
        <Logo />

        <div>
          <h1 className="text-4xl font-bold leading-snug mb-4 tracking-tight">
            Gestão de condomínios simplificada
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Controle financeiro, comunicação com moradores e muito mais em um só lugar.
          </p>
        </div>

        <p className="text-white/40 text-sm">© {new Date().getFullYear()} drcondo</p>
      </div>

      {/* Painel do formulário */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <Card className="w-full max-w-sm shadow-xl border-border/60">
          <CardHeader className="pb-4">
            <div className="lg:hidden mb-4">
              <Logo dark />
            </div>
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>Entre com sua conta para continuar</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <JollyTextField
                label="E-mail"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={setEmail}
              />
              <JollyTextField
                label="Senha"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={setPassword}
              />

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full mt-1">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/img/logo.png"
        alt="drcondo logo"
        className="w-9 h-9 rounded-lg"
        style={dark ? { filter: 'none' } : { filter: 'brightness(1.15)' }}
      />
      <span className={`font-bold text-base tracking-tight ${dark ? 'text-foreground' : 'text-white'}`}>
        drcondo
      </span>
    </div>
  );
}
