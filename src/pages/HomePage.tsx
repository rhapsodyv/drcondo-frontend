import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'

import { applyTheme, useThemeStore, type ThemeName } from '@/store/useThemeStore'

import { Button } from '@/components/ui/button'
import { JollyCalendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox, JollyCheckboxGroup } from '@/components/ui/checkbox'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
} from '@/components/ui/disclosure'
import { Label } from '@/components/ui/field'
import {
  Menu,
  MenuHeader,
  MenuKeyboard,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
  MenuItem,
} from '@/components/ui/menu'
import { Popover, PopoverDialog, PopoverTrigger } from '@/components/ui/popover'
import { Radio, JollyRadioGroup } from '@/components/ui/radio-group'
import { JollySelect, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/tabs'
import { Input, JollyTextField, TextArea, TextField } from '@/components/ui/textfield'
import { Toggle, ToggleButtonGroup } from '@/components/ui/toggle'

/* ── helpers ──────────────────────────────────────────────────────── */

function Section({ title, description, children }: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-1 border-b pb-3">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function SubSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      {children}
    </div>
  )
}

type StatusKind = 'error' | 'success' | 'warning' | 'info'

const statusCls: Record<StatusKind, string> = {
  error:   'bg-error-bg border border-error-border text-error-text',
  success: 'bg-success-bg border border-success-border text-success-text',
  warning: 'bg-warning-bg border border-warning-border text-warning-text',
  info:    'bg-info-bg border border-info-border text-info-text',
}

function Badge({ status, children }: { status: StatusKind; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusCls[status]}`}>
      {children}
    </span>
  )
}

function Alert({ status, title, children }: { status: StatusKind; title: string; children: ReactNode }) {
  return (
    <div className={`rounded-lg p-4 ${statusCls[status]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-sm opacity-80 mt-0.5">{children}</p>
    </div>
  )
}

function SolidColorButton({ label, solid, solidHover, fg }: {
  label: string; solid: string; solidHover: string; fg: string
}) {
  return (
    <Button
      style={{ '--c-solid': solid, '--c-hover': solidHover, '--c-fg': fg } as CSSProperties}
      className="[background-color:var(--c-solid)] [color:var(--c-fg)] data-[hovered]:[background-color:var(--c-hover)] data-[pressed]:[background-color:var(--c-hover)] border-0"
    >
      {label}
    </Button>
  )
}

function SoftColorButton({ label, bg, bgHover, border, text }: {
  label: string; bg: string; bgHover: string; border: string; text: string
}) {
  return (
    <Button
      style={{ '--c-bg': bg, '--c-hover': bgHover, '--c-border': border, '--c-text': text } as CSSProperties}
      className="[background-color:var(--c-bg)] [color:var(--c-text)] [border:1px_solid_var(--c-border)] data-[hovered]:[background-color:var(--c-hover)] data-[pressed]:[background-color:var(--c-hover)]"
    >
      {label}
    </Button>
  )
}

const BUTTON_COLORS = [
  { label: 'Brand',   solid: 'var(--brand-solid)',   solidHover: 'var(--brand-solid-hover)',   fg: 'var(--brand-foreground)',   bg: 'var(--brand-a3)',    bgHover: 'var(--brand-a4)',       border: 'var(--brand-a7)',       text: 'var(--brand-a11)' },
  { label: 'Success', solid: 'var(--success-solid)',  solidHover: 'var(--success-solid-hover)', fg: 'var(--success-foreground)', bg: 'var(--success-bg)',  bgHover: 'var(--success-bg-hover)', border: 'var(--success-border)', text: 'var(--success-text)' },
  { label: 'Warning', solid: 'var(--warning-solid)',  solidHover: 'var(--warning-solid-hover)', fg: 'var(--warning-foreground)', bg: 'var(--warning-bg)',  bgHover: 'var(--warning-bg-hover)', border: 'var(--warning-border)', text: 'var(--warning-text)' },
  { label: 'Error',   solid: 'var(--error-solid)',    solidHover: 'var(--error-solid-hover)',   fg: 'var(--error-foreground)',   bg: 'var(--error-bg)',    bgHover: 'var(--error-bg-hover)',   border: 'var(--error-border)',   text: 'var(--error-text)' },
  { label: 'Info',    solid: 'var(--info-solid)',     solidHover: 'var(--info-solid-hover)',    fg: 'var(--info-foreground)',    bg: 'var(--info-bg)',     bgHover: 'var(--info-bg-hover)',    border: 'var(--info-border)',    text: 'var(--info-text)' },
]

/* ── seletor de tema ──────────────────────────────────────────────── */

const THEMES: { id: ThemeName; label: string; swatch: string }[] = [
  { id: 'brown',  label: 'Brown',  swatch: '#ad7f58' },
  { id: 'violet', label: 'Violet', swatch: '#6e56cf' },
  { id: 'ocean',  label: 'Ocean',  swatch: '#0065a0' },
]

function ThemeSelector() {
  const { theme, mode, setTheme, toggleMode } = useThemeStore()

  useEffect(() => {
    applyTheme(theme, mode)
  }, [theme, mode])

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b bg-surface px-6 py-2.5 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Tema</span>
        <div className="flex gap-1">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={[
                'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                theme === t.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-ui text-muted-foreground hover:bg-surface-ui-hover hover:text-foreground',
              ].join(' ')}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
                style={{ background: t.swatch }}
              />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={toggleMode}
        className="flex items-center gap-2 rounded-full bg-surface-ui px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-ui-hover hover:text-foreground"
        aria-label="Alternar modo claro/escuro"
      >
        {mode === 'light' ? (
          <><span>🌙</span> Dark</>
        ) : (
          <><span>☀️</span> Light</>
        )}
      </button>
    </div>
  )
}

const COLOR_SCALES = [
  { name: 'brown',      label: 'Brown · Marca (tema padrão)' },
  { name: 'violet',     label: 'Violet · Marca (tema violet)' },
  { name: 'azure',      label: 'Azure · Marca (tema ocean)' },
  { name: 'tangerine',  label: 'Tangerine · Secundário (tema ocean)' },
  { name: 'sand',       label: 'Sand · Neutro quente' },
  { name: 'slate',      label: 'Slate · Neutro frio' },
  { name: 'red',        label: 'Red · Erro' },
  { name: 'green',      label: 'Green · Sucesso' },
  { name: 'amber',      label: 'Amber · Aviso' },
  { name: 'blue',       label: 'Blue · Informação' },
]

/* ── página ───────────────────────────────────────────────────────── */

export default function HomePage() {
  // Aplicar tema salvo ao montar (sem esperar interação)
  const { theme, mode } = useThemeStore()
  useEffect(() => { applyTheme(theme, mode) }, [theme, mode])

  const [notif, setNotif] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoSave, setAutoSave] = useState(false)

  return (
    <>
    <ThemeSelector />
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-20">

      {/* Header */}
      <div className="space-y-3 pb-6 border-b">
        <h1 className="text-5xl font-bold tracking-tight">Design System</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Preview completo de tokens, escalas de cor, tipografia e componentes.
        </p>
      </div>

      {/* ── 1 · Paleta de Cores ──────────────────────────────────── */}
      <Section title="Paleta de Cores" description="10 escalas Radix Colors — sólidos (1–12), alpha (a1–a12) e surface por cor.">
        <div className="space-y-5">
          {COLOR_SCALES.map(({ name, label }) => (
            <div key={name} className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">{label}</p>

              {/* Sólidos */}
              <div className="flex gap-0.5 h-9">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((step) => (
                  <div
                    key={step}
                    className="relative flex-1 first:rounded-l last:rounded-r"
                    style={{ background: `var(--${name}-${step})` }}
                    title={`--${name}-${step}`}
                  >
                    <span className="absolute inset-x-0 bottom-0.5 text-center select-none pointer-events-none"
                      style={{ fontSize: 8, color: step < 7 ? '#00000055' : '#ffffff77' }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Alpha — mostrados sobre o fundo da página (comportamento real de uso) */}
              <div className="flex gap-0.5 h-5">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((step) => (
                  <div
                    key={step}
                    className="flex-1 first:rounded-l last:rounded-r"
                    style={{ background: `var(--${name}-a${step})` }}
                    title={`--${name}-a${step}`}
                  />
                ))}
              </div>

              {/* Surface */}
              <div
                className="h-5 rounded border border-dashed border-border"
                style={{ background: `var(--${name}-surface)` }}
                title={`--${name}-surface`}
              />
            </div>
          ))}
        </div>

        {/* Black / White alpha */}
        <div className="mt-6 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Black alpha · overlay universal</p>
          <div className="flex gap-0.5 h-7">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((step) => (
              <div key={step} className="flex-1 first:rounded-l last:rounded-r bg-foreground"
                style={{ opacity: step * 0.08 }} title={`--black-a${step}`} />
            ))}
          </div>
          <div className="flex gap-0.5 h-7 bg-foreground rounded">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((step) => (
              <div key={step} className="flex-1 first:rounded-l last:rounded-r bg-background"
                style={{ opacity: step * 0.08 }} title={`--white-a${step}`} />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">White alpha · sobre fundo escuro</p>
        </div>
      </Section>

      {/* ── 2 · Tipografia ───────────────────────────────────────── */}
      <Section title="Tipografia" description="Plus Jakarta Sans — escala de tamanhos e pesos.">
        <Card>
          <CardContent className="p-6 space-y-4">
            {[
              { cls: 'text-5xl font-bold',     label: '5xl · 48px', sample: 'Aa' },
              { cls: 'text-4xl font-bold',     label: '4xl · 36px', sample: 'Título principal' },
              { cls: 'text-3xl font-semibold', label: '3xl · 30px', sample: 'Título de seção' },
              { cls: 'text-2xl font-semibold', label: '2xl · 24px', sample: 'Título de card' },
              { cls: 'text-xl font-medium',    label: 'xl · 20px',  sample: 'Subtítulo' },
              { cls: 'text-lg font-medium',    label: 'lg · 18px',  sample: 'Lead / destaque' },
              { cls: 'text-base font-normal',  label: 'base · 16px',sample: 'Texto de corpo padrão para leitura confortável.' },
              { cls: 'text-sm font-normal',    label: 'sm · 14px',  sample: 'Labels, descrições e texto secundário.' },
              { cls: 'text-xs font-normal',    label: 'xs · 12px',  sample: 'Caption, badges e metadados.' },
            ].map(({ cls, label, sample }) => (
              <div key={label} className="flex items-baseline gap-4">
                <span className="text-xs text-muted-foreground w-28 shrink-0 tabular-nums">{label}</span>
                <span className={`${cls} leading-none`}>{sample}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </Section>

      {/* ── 3 · Botões ───────────────────────────────────────────── */}
      <Section title="Botões" description="Variantes, tamanhos e estados.">
        <Card>
          <CardContent className="p-6 space-y-6">
            <SubSection label="Variantes">
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </SubSection>
            <SubSection label="Tamanhos">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="add">＋</Button>
              </div>
            </SubSection>
            <SubSection label="Desabilitado">
              <div className="flex flex-wrap gap-3">
                <Button isDisabled>Default</Button>
                <Button variant="secondary" isDisabled>Secondary</Button>
                <Button variant="outline" isDisabled>Outline</Button>
                <Button variant="destructive" isDisabled>Destructive</Button>
              </div>
            </SubSection>
            <SubSection label="Cores — sólido (muda com o tema na Brand)">
              <div className="flex flex-wrap gap-3">
                {BUTTON_COLORS.map((c) => (
                  <SolidColorButton key={c.label} {...c} />
                ))}
              </div>
            </SubSection>
            <SubSection label="Cores — soft / tintado">
              <div className="flex flex-wrap gap-3">
                {BUTTON_COLORS.map((c) => (
                  <SoftColorButton key={c.label} {...c} />
                ))}
              </div>
            </SubSection>
          </CardContent>
        </Card>
      </Section>

      {/* ── 4 · Switch ───────────────────────────────────────────── */}
      <Section title="Switch" description="Controle de alternância para configurações binárias.">
        <Card>
          <CardContent className="p-6 space-y-6">
            <SubSection label="Estados">
              <div className="flex flex-col gap-4">
                <Switch isSelected={notif} onChange={setNotif}>
                  Notificações por email
                </Switch>
                <Switch isSelected={darkMode} onChange={setDarkMode}>
                  Modo escuro
                </Switch>
                <Switch isSelected={autoSave} onChange={setAutoSave}>
                  Salvar automaticamente
                </Switch>
                <Switch isSelected isDisabled>
                  Acesso de administrador (fixo)
                </Switch>
                <Switch isDisabled>
                  Integração externa (indisponível)
                </Switch>
              </div>
            </SubSection>
          </CardContent>
        </Card>
      </Section>

      {/* ── 5 · Checkbox ─────────────────────────────────────────── */}
      <Section title="Checkbox" description="Seleção de múltiplas opções.">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 space-y-3">
              <SubSection label="Individual">
                <div className="flex flex-col gap-3">
                  <Checkbox defaultSelected>Aceito os termos de uso</Checkbox>
                  <Checkbox>Receber novidades por email</Checkbox>
                  <Checkbox isIndeterminate>Selecionar tudo (parcial)</Checkbox>
                  <Checkbox isDisabled>Opção indisponível</Checkbox>
                  <Checkbox isInvalid>Campo obrigatório</Checkbox>
                </div>
              </SubSection>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <JollyCheckboxGroup
                label="Convênios aceitos"
                description="Selecione os planos que o consultório atende."
                defaultValue={['unimed', 'amil']}
              >
                <Checkbox value="unimed">Unimed</Checkbox>
                <Checkbox value="amil">Amil</Checkbox>
                <Checkbox value="sulamerica">SulAmérica</Checkbox>
                <Checkbox value="bradesco">Bradesco Saúde</Checkbox>
                <Checkbox value="particular">Particular</Checkbox>
              </JollyCheckboxGroup>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── 6 · Radio Group ──────────────────────────────────────── */}
      <Section title="Radio Group" description="Seleção de uma opção entre várias.">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <JollyRadioGroup label="Tipo de consulta" defaultValue="presencial">
                <Radio value="presencial">Presencial</Radio>
                <Radio value="telemedicina">Telemedicina</Radio>
                <Radio value="retorno">Retorno</Radio>
              </JollyRadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <JollyRadioGroup
                label="Periodicidade"
                orientation="horizontal"
                defaultValue="mensal"
              >
                <Radio value="semanal">Semanal</Radio>
                <Radio value="mensal">Mensal</Radio>
                <Radio value="anual">Anual</Radio>
              </JollyRadioGroup>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── 7 · Toggle Group & Button Group ──────────────────────── */}
      <Section title="Toggle Group & Button Group" description="Seleção exclusiva e grupo de ações relacionadas.">
        <Card>
          <CardContent className="p-6 space-y-6">
            <SubSection label="Toggle Group — seleção exclusiva">
              <div className="flex flex-col gap-4">
                <ToggleButtonGroup selectionMode="single" defaultSelectedKeys={['lista']}>
                  <Toggle id="lista" variant="outline">☰ Lista</Toggle>
                  <Toggle id="grade" variant="outline">⊞ Grade</Toggle>
                  <Toggle id="mapa" variant="outline">◎ Mapa</Toggle>
                </ToggleButtonGroup>
                <ToggleButtonGroup selectionMode="multiple" defaultSelectedKeys={['negrito', 'italico']}>
                  <Toggle id="negrito" variant="outline" className="font-bold">B</Toggle>
                  <Toggle id="italico" variant="outline" className="italic">I</Toggle>
                  <Toggle id="sublinhado" variant="outline" className="underline">U</Toggle>
                  <Toggle id="riscado" variant="outline" className="line-through">S</Toggle>
                </ToggleButtonGroup>
              </div>
            </SubSection>
            <SubSection label="Button Group — ações relacionadas">
              <div className="flex">
                <Button
                  variant="outline"
                  className="rounded-r-none border-r-0"
                >
                  ← Anterior
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none"
                >
                  Hoje
                </Button>
                <Button
                  variant="outline"
                  className="rounded-l-none border-l-0"
                >
                  Próximo →
                </Button>
              </div>
            </SubSection>
          </CardContent>
        </Card>
      </Section>

      {/* ── 8 · Tabs ─────────────────────────────────────────────── */}
      <Section title="Tabs" description="Navegação entre conteúdos relacionados.">
        <Card>
          <CardContent className="p-6">
            <Tabs defaultSelectedKey="consultas">
              <TabList aria-label="Seções">
                <Tab id="consultas">Consultas</Tab>
                <Tab id="pacientes">Pacientes</Tab>
                <Tab id="relatorios">Relatórios</Tab>
                <Tab id="config" isDisabled>Configurações</Tab>
              </TabList>
              <TabPanel id="consultas">
                <div className="rounded-lg border p-4 mt-2 space-y-2">
                  <p className="font-medium">Consultas de hoje</p>
                  <p className="text-sm text-muted-foreground">12 agendamentos — 3 confirmados, 8 pendentes, 1 cancelado.</p>
                  <div className="flex gap-2 pt-1">
                    <Badge status="success">3 Confirmados</Badge>
                    <Badge status="warning">8 Pendentes</Badge>
                    <Badge status="error">1 Cancelado</Badge>
                  </div>
                </div>
              </TabPanel>
              <TabPanel id="pacientes">
                <div className="rounded-lg border p-4 mt-2">
                  <p className="font-medium">Base de pacientes</p>
                  <p className="text-sm text-muted-foreground mt-1">243 pacientes cadastrados. 4 novos este mês.</p>
                </div>
              </TabPanel>
              <TabPanel id="relatorios">
                <div className="rounded-lg border p-4 mt-2">
                  <p className="font-medium">Relatórios disponíveis</p>
                  <p className="text-sm text-muted-foreground mt-1">Mensal, trimestral e anual. Exportação em PDF e CSV.</p>
                </div>
              </TabPanel>
            </Tabs>
          </CardContent>
        </Card>
      </Section>

      {/* ── 9 · Accordion ────────────────────────────────────────── */}
      <Section title="Accordion" description="Seções expansíveis para organizar conteúdo denso.">
        <Card>
          <CardContent className="p-2">
            <DisclosureGroup defaultExpandedKeys={['faq-1']}>
              <Disclosure id="faq-1">
                <DisclosureHeader>Como agendar uma consulta?</DisclosureHeader>
                <DisclosurePanel>
                  Acesse o módulo de agendamentos, selecione o médico e o horário disponível.
                  Você receberá uma confirmação por email automaticamente.
                </DisclosurePanel>
              </Disclosure>
              <Disclosure id="faq-2">
                <DisclosureHeader>Quais convênios são aceitos?</DisclosureHeader>
                <DisclosurePanel>
                  Unimed, Amil, SulAmérica, Bradesco Saúde e consultas particulares.
                  Para outros planos, entre em contato com a recepção.
                </DisclosurePanel>
              </Disclosure>
              <Disclosure id="faq-3">
                <DisclosureHeader>Como cancelar ou remarcar?</DisclosureHeader>
                <DisclosurePanel>
                  Cancelamentos devem ser feitos com ao menos 24h de antecedência pelo sistema
                  ou pelo telefone da clínica.
                </DisclosurePanel>
              </Disclosure>
              <Disclosure id="faq-4">
                <DisclosureHeader>O sistema funciona em dispositivos móveis?</DisclosureHeader>
                <DisclosurePanel>
                  Sim. O sistema é totalmente responsivo e funciona em smartphones e tablets
                  nos principais navegadores.
                </DisclosurePanel>
              </Disclosure>
            </DisclosureGroup>
          </CardContent>
        </Card>
      </Section>

      {/* ── 10 · Select ──────────────────────────────────────────── */}
      <Section title="Select" description="Dropdown de seleção com suporte a teclado.">
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <JollySelect label="Especialidade">
                <SelectItem id="clinico">Clínico Geral</SelectItem>
                <SelectItem id="cardio">Cardiologia</SelectItem>
                <SelectItem id="ortho">Ortopedia</SelectItem>
                <SelectItem id="neuro">Neurologia</SelectItem>
                <SelectItem id="dermato">Dermatologia</SelectItem>
              </JollySelect>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <JollySelect label="Turno" defaultSelectedKey="manha">
                <SelectItem id="manha">Manhã</SelectItem>
                <SelectItem id="tarde">Tarde</SelectItem>
                <SelectItem id="noite">Noite</SelectItem>
              </JollySelect>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <JollySelect label="Sala" isDisabled>
                <SelectItem id="1">Sala 1</SelectItem>
                <SelectItem id="2">Sala 2</SelectItem>
              </JollySelect>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── 11 · Formulário completo ─────────────────────────────── */}
      <Section title="Formulários" description="Campos de texto, validação e composição de form.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Novo Agendamento</CardTitle>
              <CardDescription>Preencha os dados da consulta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextField className="flex flex-col gap-2">
                <Label>Nome do paciente</Label>
                <Input placeholder="Ana Lima" />
              </TextField>
              <JollyTextField
                label="Email"
                type="email"
                description="Para envio do lembrete de consulta."
              />
              <JollySelect label="Convênio">
                <SelectItem id="unimed">Unimed</SelectItem>
                <SelectItem id="amil">Amil</SelectItem>
                <SelectItem id="sulamerica">SulAmérica</SelectItem>
                <SelectItem id="particular">Particular</SelectItem>
              </JollySelect>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar</Button>
            </CardFooter>
          </Card>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <JollyTextField
                  label="Campo inválido"
                  defaultValue="valor incorreto"
                  isInvalid
                  errorMessage="Este campo é obrigatório."
                />
                <JollyTextField
                  label="Campo desabilitado"
                  defaultValue="Somente leitura"
                  isDisabled
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <TextField className="flex flex-col gap-2">
                  <Label>Observações</Label>
                  <TextArea placeholder="Anotações sobre o paciente..." rows={4} />
                </TextField>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* ── 12 · Cards ───────────────────────────────────────────── */}
      <Section title="Cards" description="Superfícies elevadas para agrupar informações.">
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Consultas hoje</p>
              <p className="text-3xl font-bold mt-1">12</p>
              <p className="text-xs text-success-text mt-1 font-medium">↑ 3 a mais que ontem</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Pacientes novos</p>
              <p className="text-3xl font-bold mt-1">4</p>
              <p className="text-xs text-muted-foreground mt-1">neste mês</p>
            </CardContent>
          </Card>
          <Card className="border-brand-border bg-brand-subtle">
            <CardContent className="p-6">
              <p className="text-sm text-brand-text font-medium">Próxima consulta</p>
              <p className="text-xl font-semibold mt-1" style={{ color: 'var(--brand-text-strong)' }}>14h30</p>
              <p className="text-xs text-brand-text mt-1">Maria Oliveira · Sala 2</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── 13 · Status ──────────────────────────────────────────── */}
      <Section title="Status" description="Badges e alertas para feedback contextual.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <SubSection label="Badges">
              <div className="flex flex-wrap gap-2">
                <Badge status="success">Confirmado</Badge>
                <Badge status="error">Cancelado</Badge>
                <Badge status="warning">Pendente</Badge>
                <Badge status="info">Em análise</Badge>
              </div>
            </SubSection>
          </div>
          <div className="space-y-2">
            <SubSection label="Alertas">
              <div className="space-y-2">
                <Alert status="success" title="Salvo com sucesso">As alterações foram aplicadas.</Alert>
                <Alert status="error" title="Erro ao salvar">Verifique os campos obrigatórios.</Alert>
                <Alert status="warning" title="Atenção">Esta ação não pode ser desfeita.</Alert>
                <Alert status="info" title="Dica">Você pode exportar os dados em CSV.</Alert>
              </div>
            </SubSection>
          </div>
        </div>
      </Section>

      {/* ── 14 · Surface tokens ──────────────────────���───────────── */}
      <Section title="Surface & Alpha" description="Tokens translúcidos por cor — para painéis tintados, toasts e glassmorphism.">
        <div className="space-y-6">
          <SubSection label="Surface tokens — fundo translúcido por cor (backdrop-filter recomendado)">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'brown',     label: 'Brown surface',     text: 'var(--brand-text)',  border: 'var(--brand-border)' },
                { name: 'violet',    label: 'Violet surface',    text: 'var(--violet-11)',   border: 'var(--violet-7)' },
                { name: 'azure',     label: 'Azure surface',     text: 'var(--azure-11)',    border: 'var(--azure-7)' },
                { name: 'tangerine', label: 'Tangerine surface', text: 'var(--tangerine-11)',border: 'var(--tangerine-7)' },
                { name: 'red',       label: 'Error surface',     text: 'var(--error-text)',  border: 'var(--error-border)' },
                { name: 'green',     label: 'Success surface',   text: 'var(--success-text)',border: 'var(--success-border)' },
                { name: 'amber',     label: 'Warning surface',   text: 'var(--warning-text)',border: 'var(--warning-border)' },
                { name: 'blue',      label: 'Info surface',      text: 'var(--info-text)',   border: 'var(--info-border)' },
              ].map(({ name, label, text, border }) => (
                <div key={name}
                  className="rounded-lg p-4 text-sm font-medium"
                  style={{ background: `var(--${name}-surface)`, color: text, border: `1px solid ${border}` }}>
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs opacity-70 mt-0.5 font-normal">--{name}-surface</p>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection label="Soft badges — brand-a3 + brand-a11 (muda com o tema)">
            <div className="flex flex-wrap gap-2">
              {['Confirmado', 'Pendente', 'Cancelado', 'Em análise', 'Ativo', 'Rascunho'].map(txt => (
                <span key={txt}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ background: 'var(--brand-a3)', color: 'var(--brand-a11)', border: '1px solid var(--brand-a7)' }}>
                  {txt}
                </span>
              ))}
            </div>
          </SubSection>

          <SubSection label="Overlay alpha — black-a e white-a sobre superfícies">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg p-4 space-y-1 border border-border">
                <p className="text-xs text-muted-foreground mb-2">black-a (sobre claro)</p>
                <div className="flex h-8 rounded overflow-hidden">
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => (
                    <div key={s} className="flex-1" style={{ background: `var(--black-a${s})` }} title={`--black-a${s}`} />
                  ))}
                </div>
              </div>
              <div className="rounded-lg p-4 space-y-1 bg-foreground border border-border">
                <p className="text-xs text-background mb-2 opacity-60">white-a (sobre escuro)</p>
                <div className="flex h-8 rounded overflow-hidden">
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(s => (
                    <div key={s} className="flex-1" style={{ background: `var(--white-a${s})` }} title={`--white-a${s}`} />
                  ))}
                </div>
              </div>
            </div>
          </SubSection>
        </div>
      </Section>

      {/* ── 15 · Menu ─────────────────────────────────────────────��� */}
      <Section title="Menu" description="Menus contextuais com separadores, atalhos e item destrutivo.">
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-3">
            <MenuTrigger>
              <Button variant="outline">Ações ▾</Button>
              <MenuPopover>
                <Menu>
                  <MenuHeader>Paciente</MenuHeader>
                  <MenuItem id="edit">Editar cadastro</MenuItem>
                  <MenuItem id="history">Ver histórico</MenuItem>
                  <MenuItem id="schedule">Agendar consulta</MenuItem>
                  <MenuSeparator />
                  <MenuItem
                    id="delete"
                    className="text-destructive data-[focused]:bg-error-bg data-[focused]:text-error-text"
                  >
                    Excluir paciente
                  </MenuItem>
                </Menu>
              </MenuPopover>
            </MenuTrigger>

            <MenuTrigger>
              <Button>Exportar ▾</Button>
              <MenuPopover>
                <Menu>
                  <MenuHeader>Formato</MenuHeader>
                  <MenuItem id="csv">
                    Exportar CSV
                    <MenuKeyboard>⌘E</MenuKeyboard>
                  </MenuItem>
                  <MenuItem id="pdf">
                    Exportar PDF
                    <MenuKeyboard>⌘P</MenuKeyboard>
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem id="print">Imprimir</MenuItem>
                </Menu>
              </MenuPopover>
            </MenuTrigger>

            <MenuTrigger>
              <Button variant="secondary">Mais opções ▾</Button>
              <MenuPopover>
                <Menu>
                  <MenuItem id="duplicate">Duplicar</MenuItem>
                  <MenuItem id="archive">Arquivar</MenuItem>
                  <MenuItem id="share">Compartilhar</MenuItem>
                </Menu>
              </MenuPopover>
            </MenuTrigger>
          </CardContent>
        </Card>
      </Section>

      {/* ── 15 · Dialog ──────────────────────────────────────────── */}
      <Section title="Dialog" description="Modal de confirmação e formulário em overlay.">
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-3">
            {/* Confirmação simples */}
            <DialogTrigger>
              <Button variant="outline">Excluir paciente</Button>
              <DialogOverlay>
                <DialogContent role="alertdialog">
                  {({ close }) => (
                    <>
                      <DialogHeader>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-2">
                          Esta ação é permanente. O paciente e todo o seu histórico serão removidos
                          do sistema e não poderão ser recuperados.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-6">
                        <Button variant="outline" onPress={close}>Cancelar</Button>
                        <Button variant="destructive" onPress={close}>Excluir</Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </DialogOverlay>
            </DialogTrigger>

            {/* Formulário */}
            <DialogTrigger>
              <Button>Novo agendamento</Button>
              <DialogOverlay>
                <DialogContent>
                  {({ close }) => (
                    <>
                      <DialogHeader>
                        <DialogTitle>Novo Agendamento</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground mt-1">
                          Preencha os dados para criar o agendamento.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <TextField className="flex flex-col gap-2">
                          <Label>Paciente</Label>
                          <Input placeholder="Nome do paciente" />
                        </TextField>
                        <JollySelect label="Especialidade">
                          <SelectItem id="clinico">Clínico Geral</SelectItem>
                          <SelectItem id="cardio">Cardiologia</SelectItem>
                        </JollySelect>
                      </div>
                      <DialogFooter className="mt-6">
                        <Button variant="outline" onPress={close}>Cancelar</Button>
                        <Button onPress={close}>Confirmar</Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </DialogOverlay>
            </DialogTrigger>
          </CardContent>
        </Card>
      </Section>

      {/* ── 16 · Popover ─────────────────────────────────────────── */}
      <Section title="Popover" description="Painel flutuante ancorado em um elemento.">
        <Card>
          <CardContent className="p-6 flex flex-wrap gap-3">
            <PopoverTrigger>
              <Button variant="outline">ⓘ Informações</Button>
              <Popover>
                <PopoverDialog className="w-64">
                  <p className="font-semibold text-sm">Sobre o paciente</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Última consulta: 15/03/2026<br />
                    Próximo retorno: 28/04/2026<br />
                    Convênio: Unimed
                  </p>
                </PopoverDialog>
              </Popover>
            </PopoverTrigger>

            <PopoverTrigger>
              <Button>Filtros ▾</Button>
              <Popover>
                <PopoverDialog className="w-56 space-y-3">
                  <p className="font-semibold text-sm">Filtrar por</p>
                  <div className="flex flex-col gap-2">
                    <Checkbox defaultSelected>Confirmados</Checkbox>
                    <Checkbox defaultSelected>Pendentes</Checkbox>
                    <Checkbox>Cancelados</Checkbox>
                  </div>
                  <Button size="sm" className="w-full mt-1">Aplicar</Button>
                </PopoverDialog>
              </Popover>
            </PopoverTrigger>
          </CardContent>
        </Card>
      </Section>

      {/* ── 17 · Tabela ──────────────────────────────────────────── */}
      <Section title="Tabela" description="Listagem de dados com badges de status.">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-surface-subtle text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Paciente</th>
                  <th className="px-4 py-3 text-left font-medium">Convênio</th>
                  <th className="px-4 py-3 text-left font-medium">Data</th>
                  <th className="px-4 py-3 text-left font-medium">Horário</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'Ana Lima',       plan: 'Unimed',      date: '28/04', time: '14h30', status: 'success' as StatusKind, label: 'Confirmado' },
                  { name: 'Carlos Mendes',  plan: 'Amil',        date: '29/04', time: '09h00', status: 'warning' as StatusKind, label: 'Pendente'   },
                  { name: 'Juliana Souza',  plan: 'Particular',  date: '30/04', time: '11h15', status: 'success' as StatusKind, label: 'Confirmado' },
                  { name: 'Roberto Alves',  plan: 'SulAmérica',  date: '02/05', time: '15h00', status: 'error'   as StatusKind, label: 'Cancelado'  },
                  { name: 'Fernanda Costa', plan: 'Unimed',      date: '05/05', time: '08h45', status: 'info'    as StatusKind, label: 'Em análise' },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-surface-subtle transition-colors">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.plan}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{row.date}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{row.time}</td>
                    <td className="px-4 py-3">
                      <Badge status={row.status}>{row.label}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* ── 18 · Calendar ────────────────────────────────────────── */}
      <Section title="Calendar" description="Seleção de data com navegação mensal.">
        <div className="flex flex-wrap gap-6">
          <Card>
            <CardContent className="p-4">
              <JollyCalendar aria-label="Selecionar data" />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ── 19 · Sombras ─────────────────────────────────────────── */}
      <Section title="Sombras" description="Escala de elevação — 6 níveis.">
        <div className="flex flex-wrap gap-8">
          {[
            { cls: 'shadow-xs',  label: 'xs' },
            { cls: 'shadow-sm',  label: 'sm' },
            { cls: 'shadow-md',  label: 'md' },
            { cls: 'shadow-lg',  label: 'lg' },
            { cls: 'shadow-xl',  label: 'xl' },
            { cls: 'shadow-2xl', label: '2xl' },
          ].map(({ cls, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className={`w-16 h-16 rounded-lg bg-surface ${cls}`} />
              <span className="text-xs text-muted-foreground font-medium">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 20 · Raios ───────────────────────────────────────────── */}
      <Section title="Raios de Borda" description="Escala completa de border-radius.">
        <div className="flex flex-wrap items-end gap-6">
          {[
            { cls: 'rounded-sm',   label: 'sm · 4px',   size: 'w-10 h-10' },
            { cls: 'rounded-md',   label: 'md · 6px',   size: 'w-12 h-12' },
            { cls: 'rounded-lg',   label: 'lg · 8px',   size: 'w-14 h-14' },
            { cls: 'rounded-xl',   label: 'xl · 12px',  size: 'w-16 h-16' },
            { cls: 'rounded-2xl',  label: '2xl · 16px', size: 'w-20 h-20' },
            { cls: 'rounded-3xl',  label: '3xl · 24px', size: 'w-24 h-24' },
            { cls: 'rounded-full', label: 'full',        size: 'w-16 h-16' },
          ].map(({ cls, label, size }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`${size} ${cls} bg-brand-subtle border border-brand-border`} />
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </Section>

    </div>
    </>
  )
}
